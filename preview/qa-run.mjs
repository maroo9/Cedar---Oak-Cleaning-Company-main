/**
 * Headless Chrome QA runner for Cedar & Oak site.
 * Uses Chrome DevTools Protocol (no npm deps).
 */
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = __dirname;
const URL = "http://127.0.0.1:5500/";
const CHROME =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9333 + Math.floor(Math.random() * 100);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });
}

class Cdp {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.ready = new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve);
      this.ws.addEventListener("error", reject);
    });
    this.ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id != null && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result);
      }
    });
  }

  async send(method, params = {}) {
    await this.ready;
    const id = ++this.id;
    const p = new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
    this.ws.send(JSON.stringify({ id, method, params }));
    return p;
  }

  close() {
    this.ws.close();
  }
}

async function waitForChrome(port, tries = 40) {
  for (let i = 0; i < tries; i++) {
    try {
      return await getJson(`http://127.0.0.1:${port}/json/version`);
    } catch {
      await sleep(250);
    }
  }
  throw new Error("Chrome CDP not ready");
}

async function screenshot(cdp, file) {
  const { data } = await cdp.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
  });
  const buf = Buffer.from(data, "base64");
  const full = path.join(OUT, file);
  await writeFile(full, buf);
  return full;
}

async function setViewport(cdp, width, height, dpr = 1) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: dpr,
    mobile: width < 500,
  });
}

async function evaluate(cdp, expression) {
  const r = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (r.exceptionDetails) {
    throw new Error(r.exceptionDetails.text || "eval failed");
  }
  return r.result.value;
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const userData = path.join(OUT, `.chrome-profile-${PORT}`);
  const chrome = spawn(
    CHROME,
    [
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${userData}`,
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "about:blank",
    ],
    { stdio: ["ignore", "pipe", "pipe"] }
  );

  let stderr = "";
  chrome.stderr.on("data", (d) => (stderr += d.toString()));

  try {
    await waitForChrome(PORT);
    const targets = await getJson(`http://127.0.0.1:${PORT}/json/list`);
    const pageTarget =
      targets.find((t) => t.type === "page") ||
      (await getJson(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(URL)}`));

    // Prefer creating a fresh target
    let wsUrl = pageTarget.webSocketDebuggerUrl;
    if (!wsUrl) {
      const created = await getJson(
        `http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(URL)}`
      );
      wsUrl = created.webSocketDebuggerUrl;
    }

    const cdp = new Cdp(wsUrl);
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Network.enable");

    const brokenRequests = [];
    // Track failed network via polling evaluate instead (simpler)

    // ---- Desktop 1280 ----
    await setViewport(cdp, 1280, 900, 1);
    await cdp.send("Page.navigate", { url: URL });
    await cdp.send("Page.loadEventFired").catch(() => {});
    await sleep(2500); // fonts + images

    // Wait for hero image
    await evaluate(
      cdp,
      `Promise.race([
        new Promise(r => {
          const img = document.querySelector('.hero__media img');
          if (!img) return r(false);
          if (img.complete) return r(true);
          img.onload = () => r(true);
          img.onerror = () => r(false);
        }),
        new Promise(r => setTimeout(() => r('timeout'), 8000))
      ])`
    );

    await screenshot(cdp, "01-hero-desktop-1280.png");

    // Scroll to services
    await evaluate(
      cdp,
      `document.getElementById('services')?.scrollIntoView({behavior:'instant', block:'start'});`
    );
    await sleep(600);
    await screenshot(cdp, "02-services-desktop-1280.png");

    // Desktop QA metrics
    const desktopQa = await evaluate(
      cdp,
      `(() => {
        const results = {};
        const ids = ['about','services','standard','areas','faq','estimate','special','plans','top'];
        results.anchors = {};
        for (const id of ids) {
          const el = document.getElementById(id);
          results.anchors[id] = el ? { exists: true, top: Math.round(el.getBoundingClientRect().top + window.scrollY) } : { exists: false };
        }
        const logos = {
          header: document.querySelector('.brand__logo'),
          hero: document.querySelector('.hero__logo'),
          footer: document.querySelector('.footer__logo'),
        };
        results.logos = {};
        for (const [k, img] of Object.entries(logos)) {
          if (!img) { results.logos[k] = { present: false }; continue; }
          const r = img.getBoundingClientRect();
          results.logos[k] = {
            present: true,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            complete: img.complete,
            visible: r.width > 0 && r.height > 0 && getComputedStyle(img).visibility !== 'hidden' && getComputedStyle(img).opacity !== '0',
            display: getComputedStyle(img).display,
            box: { w: Math.round(r.width), h: Math.round(r.height) },
            src: img.currentSrc || img.src,
          };
        }
        // images
        const imgs = [...document.images].map(img => {
          const r = img.getBoundingClientRect();
          return {
            src: (img.currentSrc || img.src).slice(0, 120),
            complete: img.complete,
            naturalWidth: img.naturalWidth,
            broken: img.complete && img.naturalWidth === 0,
            w: Math.round(r.width),
            h: Math.round(r.height),
          };
        });
        results.images = imgs;
        results.brokenImages = imgs.filter(i => i.broken);

        // overflow
        const docW = document.documentElement.scrollWidth;
        const clientW = document.documentElement.clientWidth;
        results.overflowX = docW > clientW + 1;
        results.scrollWidth = docW;
        results.clientWidth = clientW;

        // overlapping rough check: elements with negative margins or absolute that collide hard
        const suspects = [];
        document.querySelectorAll('header, .hero__content, .promo__card, .service-card, .estimate-form, footer').forEach(el => {
          const s = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          if (r.right > clientW + 2) suspects.push({ sel: el.className || el.tagName, right: Math.round(r.right) });
        });
        results.overflowSuspects = suspects;

        // form
        const form = document.querySelector('[data-estimate-form]');
        results.form = form ? {
          present: true,
          fields: [...form.querySelectorAll('input,select,textarea,button')].map(el => ({
            tag: el.tagName.toLowerCase(),
            type: el.type || null,
            name: el.name || el.id || null,
            required: !!el.required,
            disabled: !!el.disabled,
            visible: el.getBoundingClientRect().height > 0,
          })),
        } : { present: false };

        // nav links
        const navHrefs = [...document.querySelectorAll('.site-nav a')].map(a => a.getAttribute('href'));
        results.navHrefs = navHrefs;

        // header sticky / height
        const header = document.querySelector('[data-header]');
        results.header = header ? {
          position: getComputedStyle(header).position,
          height: Math.round(header.getBoundingClientRect().height),
        } : null;

        results.title = document.title;
        results.bodyOverflowX = getComputedStyle(document.body).overflowX;
        return results;
      })()`
    );

    // Test anchor navigation
    const navTests = {};
    for (const id of [
      "about",
      "services",
      "standard",
      "areas",
      "faq",
      "estimate",
      "special",
      "plans",
      "top",
    ]) {
      const before = await evaluate(cdp, `window.scrollY`);
      await evaluate(
        cdp,
        `document.querySelector('a[href="#${id}"]')?.click() || (location.hash = '#${id}');`
      );
      await sleep(700);
      const after = await evaluate(
        cdp,
        `({
          scrollY: Math.round(window.scrollY),
          hash: location.hash,
          targetTop: (() => {
            const el = document.getElementById('${id}');
            if (!el) return null;
            const header = document.querySelector('[data-header]');
            const hh = header ? header.getBoundingClientRect().height : 0;
            return Math.round(el.getBoundingClientRect().top);
          })(),
          inView: (() => {
            const el = document.getElementById('${id}');
            if (!el) return false;
            const r = el.getBoundingClientRect();
            const header = document.querySelector('[data-header]');
            const hh = header ? header.getBoundingClientRect().height : 0;
            // section top should be near below header (within ~120px) or at least in viewport
            return r.top < window.innerHeight && r.bottom > hh;
          })(),
        })`
      );
      navTests[id] = { before, ...after };
    }

    // Form usability: fill + submit
    await evaluate(
      cdp,
      `document.getElementById('estimate')?.scrollIntoView({behavior:'instant'});`
    );
    await sleep(400);
    const formTest = await evaluate(
      cdp,
      `(() => {
        const form = document.querySelector('[data-estimate-form]');
        if (!form) return { ok: false, reason: 'missing form' };
        const name = form.querySelector('#name');
        const phone = form.querySelector('#phone');
        const email = form.querySelector('#email');
        const service = form.querySelector('#service');
        const property = form.querySelector('#property');
        const message = form.querySelector('#message');
        name.value = 'QA Tester';
        phone.value = '317-555-0100';
        email.value = 'qa@example.com';
        service.value = 'Routine Home Cleaning';
        property.value = 'Home / Residence';
        message.value = 'Automated QA form fill test.';
        name.dispatchEvent(new Event('input', { bubbles: true }));
        // check validity
        const valid = form.checkValidity();
        const statusBefore = form.querySelector('[data-form-status]')?.textContent || '';
        form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        return new Promise(resolve => setTimeout(() => {
          const status = form.querySelector('[data-form-status]')?.textContent || '';
          resolve({
            ok: true,
            valid,
            statusBefore,
            statusAfter: status,
            canInteract: !name.disabled && name.offsetParent !== null,
          });
        }, 400));
      })()`
    );

    await screenshot(cdp, "03-estimate-form-desktop.png");

    // Footer logos check (scroll to bottom)
    await evaluate(cdp, `window.scrollTo(0, document.body.scrollHeight)`);
    await sleep(400);
    const footerLogoVisible = await evaluate(
      cdp,
      `(() => {
        const img = document.querySelector('.footer__logo');
        if (!img) return { present: false };
        const r = img.getBoundingClientRect();
        return {
          present: true,
          naturalWidth: img.naturalWidth,
          visibleInViewport: r.top < innerHeight && r.bottom > 0 && r.width > 0,
          box: { w: Math.round(r.width), h: Math.round(r.height) },
        };
      })()`
    );
    await screenshot(cdp, "04-footer-desktop.png");

    // ---- Tablet 768 ----
    await setViewport(cdp, 768, 1024, 1);
    await cdp.send("Page.navigate", { url: URL });
    await sleep(2200);
    const tabletQa = await evaluate(
      cdp,
      `(() => {
        const docW = document.documentElement.scrollWidth;
        const clientW = document.documentElement.clientWidth;
        const nav = document.querySelector('[data-nav]');
        const toggle = document.querySelector('[data-nav-toggle]');
        const headerLogo = document.querySelector('.brand__logo');
        const hr = headerLogo?.getBoundingClientRect();
        return {
          overflowX: docW > clientW + 1,
          scrollWidth: docW,
          clientWidth: clientW,
          navDisplay: nav ? getComputedStyle(nav).display : null,
          toggleDisplay: toggle ? getComputedStyle(toggle).display : null,
          toggleVisible: toggle ? toggle.getBoundingClientRect().width > 0 : false,
          headerLogo: headerLogo ? { w: Math.round(hr.width), h: Math.round(hr.height), nw: headerLogo.naturalWidth } : null,
          heroH1: (() => {
            const h = document.querySelector('#hero-heading');
            const r = h.getBoundingClientRect();
            return { overflowRight: r.right > clientW + 2, fontSize: getComputedStyle(h).fontSize };
          })(),
        };
      })()`
    );
    await screenshot(cdp, "05-hero-tablet-768.png");
    await evaluate(
      cdp,
      `document.getElementById('services')?.scrollIntoView({behavior:'instant'});`
    );
    await sleep(400);
    await screenshot(cdp, "06-services-tablet-768.png");

    // Open mobile nav if toggle visible
    if (tabletQa.toggleVisible) {
      await evaluate(cdp, `document.querySelector('[data-nav-toggle]')?.click()`);
      await sleep(400);
      await screenshot(cdp, "07-nav-open-tablet-768.png");
      await evaluate(cdp, `document.querySelector('[data-nav-toggle]')?.click()`);
      await sleep(200);
    }

    // ---- Mobile 390 ----
    await setViewport(cdp, 390, 844, 2);
    await cdp.send("Page.navigate", { url: URL });
    await sleep(2500);
    const mobileQa = await evaluate(
      cdp,
      `(() => {
        const docW = document.documentElement.scrollWidth;
        const clientW = document.documentElement.clientWidth;
        const nav = document.querySelector('[data-nav]');
        const toggle = document.querySelector('[data-nav-toggle]');
        const logos = ['brand__logo','hero__logo','footer__logo'].map(cls => {
          const img = document.querySelector('.' + cls);
          if (!img) return { cls, present: false };
          const r = img.getBoundingClientRect();
          return {
            cls,
            present: true,
            naturalWidth: img.naturalWidth,
            visible: r.width > 0 && r.height > 0,
            box: { w: Math.round(r.width), h: Math.round(r.height) },
          };
        });
        // check elements that stick out
        const sticking = [];
        document.querySelectorAll('section, header, footer, .container, .hero__content, .promo__card, .service-card, .btn, h1, h2').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.right > clientW + 3 || r.left < -3) {
            sticking.push({
              tag: el.tagName,
              cls: (el.className || '').toString().slice(0, 60),
              left: Math.round(r.left),
              right: Math.round(r.right),
            });
          }
        });
        const form = document.querySelector('[data-estimate-form]');
        const formRows = form ? [...form.querySelectorAll('.form-row.two')].map(row => {
          const r = row.getBoundingClientRect();
          const kids = [...row.children].map(c => Math.round(c.getBoundingClientRect().width));
          return { rowW: Math.round(r.width), kids, wraps: kids.some(w => w > r.width - 10) };
        }) : [];
        return {
          overflowX: docW > clientW + 1,
          scrollWidth: docW,
          clientWidth: clientW,
          navDisplay: nav ? getComputedStyle(nav).display : null,
          toggleVisible: toggle ? toggle.getBoundingClientRect().width > 0 : false,
          logos,
          sticking: sticking.slice(0, 20),
          formRows,
          heroActions: (() => {
            const a = document.querySelector('.hero__actions');
            if (!a) return null;
            const r = a.getBoundingClientRect();
            return { w: Math.round(r.width), overflow: r.right > clientW + 2 };
          })(),
        };
      })()`
    );
    await screenshot(cdp, "08-hero-mobile-390.png");

    // Open mobile menu
    await evaluate(cdp, `document.querySelector('[data-nav-toggle]')?.click()`);
    await sleep(500);
    const mobileNavOpen = await evaluate(
      cdp,
      `(() => {
        const nav = document.querySelector('[data-nav]');
        const toggle = document.querySelector('[data-nav-toggle]');
        return {
          ariaExpanded: toggle?.getAttribute('aria-expanded'),
          navVisible: nav ? getComputedStyle(nav).visibility !== 'hidden' && nav.getBoundingClientRect().height > 40 : false,
          navHeight: nav ? Math.round(nav.getBoundingClientRect().height) : 0,
          linkCount: nav ? nav.querySelectorAll('a').length : 0,
        };
      })()`
    );
    await screenshot(cdp, "09-nav-open-mobile-390.png");

    await evaluate(
      cdp,
      `document.getElementById('services')?.scrollIntoView({behavior:'instant'});`
    );
    await sleep(400);
    await screenshot(cdp, "10-services-mobile-390.png");

    // CSS/visual notes from desktop scroll of promo overlapping header etc.
    await setViewport(cdp, 1280, 900, 1);
    await cdp.send("Page.navigate", { url: URL });
    await sleep(1800);
    const visualBugs = await evaluate(
      cdp,
      `(() => {
        const notes = [];
        // hero brand line visibility over image
        const brand = document.querySelector('.hero__brand-line');
        if (brand) {
          const cs = getComputedStyle(brand);
          notes.push({ check: 'heroBrandColor', color: cs.color, opacity: cs.opacity });
        }
        // check contrast-ish: gold buttons
        const gold = document.querySelector('.btn--gold');
        if (gold) {
          const cs = getComputedStyle(gold);
          notes.push({ check: 'goldBtn', bg: cs.backgroundColor, color: cs.color });
        }
        // sticky header covering anchors - scroll-padding
        notes.push({ check: 'scrollPaddingTop', value: getComputedStyle(document.documentElement).scrollPaddingTop });
        // facebook placeholder links
        const fb = [...document.querySelectorAll('[data-facebook-link]')].map(a => a.href);
        notes.push({ check: 'facebookLinks', hrefs: fb, allPlaceholder: fb.every(h => h.includes('facebook.com/') && !h.match(/facebook\\.com\\/[^/?]+\\/?$/)) });
        // placeholder testimonials note
        const note = document.querySelector('.testimonials .note');
        notes.push({ check: 'placeholderTestimonials', text: note?.textContent?.trim() || null });
        // empty alt on hero logo
        const heroLogo = document.querySelector('.hero__logo');
        notes.push({ check: 'heroLogoAlt', alt: heroLogo?.getAttribute('alt') });
        return notes;
      })()`
    );

    // Header logo visibility at top
    await evaluate(cdp, `window.scrollTo(0,0)`);
    await sleep(200);
    const headerLogoTop = await evaluate(
      cdp,
      `(() => {
        const img = document.querySelector('.brand__logo');
        const r = img.getBoundingClientRect();
        return {
          naturalWidth: img.naturalWidth,
          visible: r.width > 0 && r.height > 0 && r.top >= 0 && r.top < 200,
          box: { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top) },
        };
      })()`
    );

    const report = {
      loaded: true,
      title: desktopQa.title,
      screenshots: [
        "01-hero-desktop-1280.png",
        "02-services-desktop-1280.png",
        "03-estimate-form-desktop.png",
        "04-footer-desktop.png",
        "05-hero-tablet-768.png",
        "06-services-tablet-768.png",
        tabletQa.toggleVisible ? "07-nav-open-tablet-768.png" : null,
        "08-hero-mobile-390.png",
        "09-nav-open-mobile-390.png",
        "10-services-mobile-390.png",
      ].filter(Boolean),
      logos: {
        desktopTop: desktopQa.logos,
        headerAtTop: headerLogoTop,
        footer: footerLogoVisible,
        mobile: mobileQa.logos,
      },
      images: {
        broken: desktopQa.brokenImages,
        all: desktopQa.images,
      },
      overflow: {
        desktop: {
          overflowX: desktopQa.overflowX,
          scrollWidth: desktopQa.scrollWidth,
          clientWidth: desktopQa.clientWidth,
          suspects: desktopQa.overflowSuspects,
        },
        tablet: tabletQa,
        mobile: mobileQa,
      },
      anchors: desktopQa.anchors,
      navTests,
      mobileNavOpen,
      form: desktopQa.form,
      formTest,
      visualBugs,
      header: desktopQa.header,
    };

    await writeFile(
      path.join(OUT, "qa-report.json"),
      JSON.stringify(report, null, 2)
    );
    console.log(JSON.stringify(report, null, 2));
    cdp.close();
  } finally {
    chrome.kill();
  }
}

main().catch((e) => {
  console.error("QA FAILED:", e);
  process.exit(1);
});
