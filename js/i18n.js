/* Cedar & Oak Cleaning Services — language switcher (EN / ES / FR / AR)
   Works by matching the page's English text to the table below, so the HTML
   doesn't need data-attributes. To change a translation, edit its row. */
(function () {
  "use strict";

  // [English, Español, Français, العربية]
  var T = [
    ["Skip to content", "Saltar al contenido", "Aller au contenu", "انتقل إلى المحتوى"],
    ["Menu", "Menú", "Menu", "القائمة"],
    ["Primary", "Principal", "Principale", "الرئيسية"],
    ["Cedar & Oak Cleaning Services home", "Cedar & Oak Cleaning Services, inicio", "Cedar & Oak Cleaning Services, accueil", "Cedar & Oak Cleaning Services، الصفحة الرئيسية"],
    ["Language", "Idioma", "Langue", "اللغة"],
    ["Home", "Inicio", "Accueil", "الرئيسية"],
    ["About", "Nosotros", "À propos", "من نحن"],
    ["Services", "Servicios", "Services", "الخدمات"],
    ["Reviews", "Opiniones", "Avis", "التقييمات"],
    ["Our Standard", "Nuestro estándar", "Notre standard", "معيارنا"],
    ["Service Areas", "Zonas de servicio", "Zones desservies", "مناطق الخدمة"],
    ["FAQ", "Preguntas", "FAQ", "الأسئلة الشائعة"],
    ["Browse Services", "Ver servicios", "Voir les services", "تصفح الخدمات"],
    ["Book Now", "Reservar ahora", "Réserver", "احجز الآن"],
    ["Book a Cleaning", "Reservar una limpieza", "Réserver un nettoyage", "احجز تنظيفًا"],
    ["Book Your Cleaning", "Reserva tu limpieza", "Réservez votre nettoyage", "احجز تنظيفك"],
    ["Clean Spaces. Healthier Living. More Time for What Matters.", "Espacios limpios. Vida más saludable. Más tiempo para lo que importa.", "Des espaces propres. Une vie plus saine. Plus de temps pour l’essentiel.", "مساحات نظيفة. حياة أكثر صحة. وقت أكثر لما يهمك."],
    ["Professional residential and commercial cleaning serving Hamilton County with reliable service, careful attention to detail, and thoughtfully selected safer cleaning products.", "Limpieza residencial y comercial profesional en el condado de Hamilton, con un servicio confiable, atención cuidadosa a los detalles y productos de limpieza más seguros, elegidos con criterio.", "Nettoyage résidentiel et commercial professionnel dans le comté de Hamilton, avec un service fiable, un grand souci du détail et des produits plus sûrs, soigneusement sélectionnés.", "خدمات تنظيف منزلية وتجارية احترافية في مقاطعة هاميلتون، بخدمة موثوقة وعناية دقيقة بالتفاصيل ومنتجات تنظيف أكثر أمانًا مختارة بعناية."],
    ["Browse the Services", "Ver los servicios", "Découvrir les services", "تصفح الخدمات"],
    ["Message Us", "Escríbenos", "Écrivez-nous", "راسلنا"],
    ["Proudly serving Carmel • Fishers • Westfield • Noblesville", "Con orgullo en Carmel • Fishers • Westfield • Noblesville", "Fiers de servir Carmel • Fishers • Westfield • Noblesville", "نخدم بفخر كارمل • فيشرز • ويستفيلد • نوبلزفيل"],

    ["About Cedar & Oak", "Sobre Cedar & Oak", "À propos de Cedar & Oak", "عن Cedar & Oak"],
    ["Cleaning With Care", "Limpieza con cuidado", "Un nettoyage soigné", "تنظيف بعناية"],
    ["A clean space should feel fresh, comfortable, healthy, and peaceful, whether it is your home, office, business, or workplace.", "Un espacio limpio debe sentirse fresco, cómodo, saludable y tranquilo, ya sea tu hogar, oficina, negocio o lugar de trabajo.", "Un espace propre doit être frais, confortable, sain et paisible, qu’il s’agisse de votre maison, de votre bureau, de votre commerce ou de votre lieu de travail.", "يجب أن تشعر في المكان النظيف بالانتعاش والراحة والصحة والهدوء، سواء كان منزلك أو مكتبك أو عملك أو مكان عملك."],
    ["At Cedar & Oak, we provide professional residential and commercial cleaning with careful attention to detail, reliable service, and thoughtfully selected safer cleaning products designed with families, pets, employees, and everyday living in mind.", "En Cedar & Oak ofrecemos limpieza residencial y comercial profesional, con atención cuidadosa a los detalles, servicio confiable y productos de limpieza más seguros, pensados para familias, mascotas, empleados y la vida diaria.", "Chez Cedar & Oak, nous offrons un nettoyage résidentiel et commercial professionnel, avec un grand souci du détail, un service fiable et des produits plus sûrs, choisis pour les familles, les animaux, les employés et la vie de tous les jours.", "في Cedar & Oak نقدم خدمات تنظيف منزلية وتجارية احترافية بعناية دقيقة بالتفاصيل وخدمة موثوقة ومنتجات تنظيف أكثر أمانًا مختارة بعناية، مصممة مع مراعاة الأسر والحيوانات الأليفة والموظفين والحياة اليومية."],
    ["Trust highlights", "Puntos de confianza", "Gages de confiance", "ضمانات الثقة"],
    ["Background Checked", "Verificación de antecedentes", "Antécédents vérifiés", "فحص الخلفية الجنائية"],
    ["Pet Friendly", "Apto para mascotas", "Adapté aux animaux", "ملائم للحيوانات الأليفة"],
    ["Natural Products", "Productos naturales", "Produits naturels", "منتجات طبيعية"],
    ["Insured & Bonded", "Asegurados y garantizados", "Assurés et cautionnés", "مؤمَّن ومكفول"],
    ["Bright, naturally lit living room with clean surfaces and soft neutrals", "Sala luminosa con luz natural, superficies limpias y tonos neutros suaves", "Salon lumineux, éclairé naturellement, aux surfaces propres et aux tons neutres doux", "غرفة جلوس مضيئة بالضوء الطبيعي بأسطح نظيفة وألوان محايدة هادئة"],

    ["What we offer", "Lo que ofrecemos", "Ce que nous offrons", "ما نقدمه"],
    ["Our Services", "Nuestros servicios", "Nos services", "خدماتنا"],
    ["Residential and commercial cleaning tailored to the way you live and work.", "Limpieza residencial y comercial adaptada a tu forma de vivir y trabajar.", "Un nettoyage résidentiel et commercial adapté à votre façon de vivre et de travailler.", "تنظيف منزلي وتجاري مصمم وفق طريقة حياتك وعملك."],
    ["Routine Home Cleaning", "Limpieza regular del hogar", "Ménage régulier à domicile", "تنظيف المنزل الدوري"],
    ["Reliable recurring cleaning to keep your home fresh, comfortable, and ready for everyday life.", "Limpieza periódica y confiable para mantener tu hogar fresco, cómodo y listo para el día a día.", "Un ménage régulier et fiable pour garder votre maison fraîche, confortable et prête pour le quotidien.", "تنظيف دوري موثوق يحافظ على منزلك منعشًا ومريحًا وجاهزًا للحياة اليومية."],
    ["Detailed Cleaning", "Limpieza detallada", "Nettoyage détaillé", "تنظيف تفصيلي"],
    ["Thorough cleaning focused on the details that make a noticeable difference.", "Limpieza minuciosa centrada en los detalles que marcan una diferencia notable.", "Un nettoyage minutieux axé sur les détails qui font vraiment la différence.", "تنظيف شامل يركز على التفاصيل التي تصنع فرقًا ملحوظًا."],
    ["Deep Cleaning", "Limpieza profunda", "Nettoyage en profondeur", "تنظيف عميق"],
    ["A more comprehensive clean for spaces that need extra attention.", "Una limpieza más completa para espacios que necesitan atención extra.", "Un nettoyage plus complet pour les espaces qui demandent une attention particulière.", "تنظيف أكثر شمولًا للمساحات التي تحتاج إلى عناية إضافية."],
    ["Kitchen & Bathroom Cleaning", "Limpieza de cocina y baños", "Nettoyage cuisine et salle de bain", "تنظيف المطبخ والحمام"],
    ["Detailed cleaning for the areas of your home that need it most.", "Limpieza detallada de las áreas de tu hogar que más lo necesitan.", "Un nettoyage détaillé des pièces de votre maison qui en ont le plus besoin.", "تنظيف تفصيلي للأماكن في منزلك التي تحتاجه أكثر."],
    ["Move-In & Move-Out Cleaning", "Limpieza de mudanza (entrada y salida)", "Nettoyage d’emménagement et de déménagement", "تنظيف الانتقال (دخول وخروج)"],
    ["Help make transitions smoother with a detailed clean before or after a move.", "Facilita la mudanza con una limpieza detallada antes o después de mudarte.", "Facilitez votre déménagement grâce à un nettoyage détaillé avant ou après.", "اجعل الانتقال أسهل بتنظيف تفصيلي قبل الانتقال أو بعده."],
    ["Office Cleaning", "Limpieza de oficinas", "Nettoyage de bureaux", "تنظيف المكاتب"],
    ["Professional cleaning for offices and professional workspaces.", "Limpieza profesional para oficinas y espacios de trabajo profesionales.", "Un nettoyage professionnel pour les bureaux et espaces de travail.", "تنظيف احترافي للمكاتب ومساحات العمل المهنية."],
    ["Business & Commercial Cleaning", "Limpieza comercial y de negocios", "Nettoyage commercial et d’entreprise", "تنظيف الشركات والمحلات التجارية"],
    ["Reliable cleaning solutions designed for businesses and commercial spaces.", "Soluciones de limpieza confiables para negocios y espacios comerciales.", "Des solutions de nettoyage fiables pour les entreprises et les locaux commerciaux.", "حلول تنظيف موثوقة مصممة للشركات والمساحات التجارية."],
    ["Organizations & Facilities", "Organizaciones e instalaciones", "Organisations et installations", "المؤسسات والمنشآت"],
    ["Cleaning support for organizations, facilities, and larger spaces.", "Apoyo de limpieza para organizaciones, instalaciones y espacios más grandes.", "Un soutien en nettoyage pour les organisations, les installations et les grands espaces.", "دعم تنظيف للمؤسسات والمنشآت والمساحات الأكبر."],
    ["Customized Cleaning Plans", "Planes de limpieza personalizados", "Plans de nettoyage personnalisés", "خطط تنظيف مخصصة"],
    ["Personalized cleaning plans based on your space, priorities, and needs.", "Planes de limpieza personalizados según tu espacio, prioridades y necesidades.", "Des plans de nettoyage personnalisés selon votre espace, vos priorités et vos besoins.", "خطط تنظيف مخصصة بحسب مساحتك وأولوياتك واحتياجاتك."],

    ["The difference", "La diferencia", "La différence", "ما يميزنا"],
    ["Why Choose Cedar & Oak?", "¿Por qué elegir Cedar & Oak?", "Pourquoi choisir Cedar & Oak ?", "لماذا تختار Cedar & Oak؟"],
    ["Safer, thoughtfully selected cleaning products", "Productos de limpieza más seguros, elegidos con criterio", "Des productos de nettoyage plus sûrs, soigneusement choisis", "منتجات تنظيف أكثر أمانًا ومختارة بعناية"],
    ["Trained and background-checked team members", "Equipo capacitado y con antecedentes verificados", "Une équipe formée et dont les antécédents sont vérifiés", "فريق مدرَّب وتم فحص خلفيته الجنائية"],
    ["Reliable and professional service", "Servicio confiable y profesional", "Un service fiable et professionnel", "خدمة موثوقة واحترافية"],
    ["Strong attention to detail", "Gran atención al detalle", "Un grand souci du détail", "اهتمام كبير بالتفاصيل"],
    ["Family, pet, and workplace-conscious cleaning", "Limpieza pensada para familias, mascotas y lugares de trabajo", "Un nettoyage attentif aux familles, aux animaux et aux lieux de travail", "تنظيف يراعي الأسرة والحيوانات الأليفة وأماكن العمل"],
    ["Personalized service instead of one-size-fits-all cleaning", "Servicio personalizado en lugar de limpieza genérica", "Un service personnalisé plutôt qu’un nettoyage standardisé", "خدمة مخصصة بدل تنظيف موحّد للجميع"],
    ["Residential and commercial cleaning solutions", "Soluciones de limpieza residencial y comercial", "Des solutions de nettoyage résidentiel et commercial", "حلول تنظيف منزلية وتجارية"],
    ["Locally owned and serving our community with care", "Negocio local que sirve a nuestra comunidad con cariño", "Entreprise locale au service de notre communauté", "شركة محلية تخدم مجتمعنا بعناية"],
    ["Trust badges", "Sellos de confianza", "Badges de confiance", "شارات الثقة"],

    ["Our promise", "Nuestra promesa", "Notre promesse", "وعدنا"],
    ["The Cedar & Oak Standard", "El estándar Cedar & Oak", "Le standard Cedar & Oak", "معيار Cedar & Oak"],
    ["Safety and peace of mind come first.", "La seguridad y la tranquilidad son lo primero.", "La sécurité et la tranquillité d’esprit passent avant tout.", "السلامة وراحة البال أولًا."],
    ["Eco-friendly, thoughtfully selected product options.", "Opciones de productos ecológicos, elegidos con criterio.", "Des produits écologiques, soigneusement sélectionnés.", "منتجات صديقة للبيئة ومختارة بعناية."],
    ["Reliable Scheduling", "Horarios confiables", "Planning fiable", "جدولة موثوقة"],
    ["Clear scheduling and dependable arrival.", "Horarios claros y llegada puntual.", "Un planning clair et une arrivée ponctuelle.", "جدولة واضحة ووصول في الموعد."],
    ["Detailed Checklist", "Lista de control detallada", "Liste de contrôle détaillée", "قائمة مهام مفصلة"],
    ["Consistent service, detail by detail.", "Servicio constante, detalle por detalle.", "Un service constant, détail après détail.", "خدمة متسقة، تفصيلة بعد تفصيلة."],
    ["Satisfaction Promise", "Promesa de satisfacción", "Promesse de satisfaction", "وعد الرضا"],
    ["Tell us promptly if something needs attention.", "Avísanos pronto si algo necesita atención.", "Dites-le-nous rapidement si quelque chose mérite attention.", "أخبرنا فورًا إذا كان هناك ما يحتاج إلى اهتمام."],
    ["Thoughtful care around pets and family spaces.", "Cuidado atento en espacios con mascotas y familia.", "Une attention particulière aux animaux et aux espaces familiaux.", "عناية مدروسة بالحيوانات الأليفة وأماكن الأسرة."],
    ["We Are Insured and Bonded", "Estamos asegurados y garantizados", "Nous sommes assurés et cautionnés", "نحن مؤمَّنون ومكفولون"],

    ["Simple steps", "Pasos sencillos", "Des étapes simples", "خطوات بسيطة"],
    ["How It Works", "Cómo funciona", "Comment ça marche", "كيف نعمل"],
    ["Request an Estimate", "Solicita un presupuesto", "Demandez un devis", "اطلب تقدير سعر"],
    ["Tell us about your home, business, or space and what you need cleaned.", "Cuéntanos sobre tu hogar, negocio o espacio y qué necesitas limpiar.", "Parlez-nous de votre maison, de votre entreprise ou de votre espace et de ce qu’il faut nettoyer.", "أخبرنا عن منزلك أو عملك أو مساحتك وما تحتاج إلى تنظيفه."],
    ["Personalized Assessment", "Evaluación personalizada", "Évaluation personnalisée", "تقييم مخصص"],
    ["For larger or more detailed jobs, we can briefly assess the space and understand your priorities.", "Para trabajos más grandes o detallados, podemos evaluar brevemente el espacio y entender tus prioridades.", "Pour les travaux plus importants ou plus détaillés, nous pouvons évaluer brièvement l’espace et comprendre vos priorités.", "للأعمال الأكبر أو الأكثر تفصيلًا، يمكننا تقييم المكان بإيجاز وفهم أولوياتك."],
    ["Enjoy a Cleaner Space", "Disfruta de un espacio más limpio", "Profitez d’un espace plus propre", "استمتع بمكان أنظف"],
    ["Get reliable, professional cleaning tailored to your needs.", "Recibe una limpieza confiable y profesional adaptada a tus necesidades.", "Profitez d’un nettoyage fiable et professionnel adapté à vos besoins.", "احصل على تنظيف موثوق واحترافي يناسب احتياجاتك."],

    ["Made for your space", "Hecho para tu espacio", "Conçu pour votre espace", "مصمم لمساحتك"],
    ["Custom Cleaning Plans", "Planes de limpieza a medida", "Plans de nettoyage sur mesure", "خطط تنظيف حسب الطلب"],
    ["We believe every home and workplace is different.", "Creemos que cada hogar y lugar de trabajo es diferente.", "Nous croyons que chaque maison et chaque lieu de travail est différent.", "نؤمن بأن كل منزل ومكان عمل مختلف."],
    ["Before larger or more detailed jobs, we can provide a brief assessment to understand the size of the space, the level of cleaning required, and your specific priorities. This allows us to provide clear, fair, and competitive pricing.", "Antes de trabajos más grandes o detallados, podemos hacer una breve evaluación para conocer el tamaño del espacio, el nivel de limpieza necesario y tus prioridades. Así ofrecemos precios claros, justos y competitivos.", "Avant les travaux plus importants ou plus détaillés, nous pouvons effectuer une brève évaluation pour comprendre la taille de l’espace, le niveau de nettoyage requis et vos priorités. Cela nous permet de proposer des tarifs clairs, justes et compétitifs.", "قبل الأعمال الأكبر أو الأكثر تفصيلًا، يمكننا إجراء تقييم موجز لفهم حجم المكان ومستوى التنظيف المطلوب وأولوياتك. وهذا يتيح لنا تقديم أسعار واضحة وعادلة وتنافسية."],
    ["Get My Personalized Estimate", "Quiero mi presupuesto personalizado", "Obtenir mon devis personnalisé", "احصل على تقديري المخصص"],
    ["Professional cleaner wiping a bright kitchen counter", "Profesional de limpieza limpiando una encimera de cocina luminosa", "Professionnel du nettoyage essuyant un plan de travail lumineux", "عامل تنظيف محترف يمسح سطح مطبخ مشرق"],

    ["Where we clean", "Dónde limpiamos", "Où nous intervenons", "أين ننظف"],
    ["Proudly Serving Hamilton County", "Con orgullo en el condado de Hamilton", "Fiers de servir le comté de Hamilton", "نخدم مقاطعة هاميلتون بفخر"],
    ["Locally owned and committed to serving our community with care—homes, offices, and businesses across Hamilton County, Indiana.", "Negocio local comprometido con servir a nuestra comunidad con cuidado: hogares, oficinas y negocios en todo el condado de Hamilton, Indiana.", "Entreprise locale engagée à servir notre communauté avec soin : maisons, bureaux et commerces dans tout le comté de Hamilton, Indiana.", "شركة محلية ملتزمة بخدمة مجتمعنا بعناية — منازل ومكاتب وشركات في جميع أنحاء مقاطعة هاميلتون، إنديانا."],
    ["Carmel", "Carmel", "Carmel", "كارمل"],
    ["Fishers", "Fishers", "Fishers", "فيشرز"],
    ["Westfield", "Westfield", "Westfield", "ويستفيلد"],
    ["Noblesville", "Noblesville", "Noblesville", "نوبلزفيل"],
    ["Surrounding Hamilton County communities", "Comunidades vecinas del condado de Hamilton", "Communes voisines du comté de Hamilton", "المجتمعات المحيطة في مقاطعة هاميلتون"],

    ["What Our Clients Say", "Lo que dicen nuestros clientes", "Ce que disent nos clients", "ماذا يقول عملاؤنا"],
    ["Ratings & Reviews", "Calificaciones y opiniones", "Notes et avis", "التقييمات والآراء"],
    ["See what our clients say about Cedar & Oak.", "Mira lo que dicen nuestros clientes sobre Cedar & Oak.", "Découvrez ce que disent nos clients sur Cedar & Oak.", "شاهد ما يقوله عملاؤنا عن Cedar & Oak."],
    ["Client reviews", "Opiniones de clientes", "Avis clients", "آراء العملاء"],
    ["5 out of 5 stars", "5 de 5 estrellas", "5 sur 5 étoiles", "5 من 5 نجوم"],
    ["Had a great clean?", "¿Tuviste una excelente limpieza?", "Vous avez apprécié votre nettoyage ?", "هل حظيت بتجربة تنظيف رائعة؟"],
    ["Tell others about your experience with Cedar & Oak.", "Comparte tu experiencia con Cedar & Oak.", "Partagez votre expérience avec Cedar & Oak.", "أخبر الآخرين عن تجربتك مع Cedar & Oak."],
    ["Leave a Review", "Dejar una opinión", "Laisser un avis", "اترك تقييمًا"],
    ["Placeholder testimonials — replace with real client reviews as they come in.", "Testimonios de ejemplo: reemplázalos con opiniones reales de clientes.", "Témoignages d’exemple — à remplacer par de vrais avis clients.", "شهادات تجريبية — استبدلها بتقييمات العملاء الحقيقية عند وصولها."],
    ["“Cedar & Oak left our home spotless and smelling fresh—without harsh chemical odors. Scheduling was easy and the team was so respectful of our pets.”", "“Cedar & Oak dejó nuestra casa impecable y con olor fresco, sin olores químicos fuertes. Fue fácil programar y el equipo fue muy respetuoso con nuestras mascotas.”", "« Cedar & Oak a laissé notre maison impeccable et fraîche, sans odeurs chimiques agressives. La prise de rendez-vous était facile et l’équipe a été très respectueuse envers nos animaux. »", "“تركت Cedar & Oak منزلنا نظيفًا تمامًا وبرائحة منعشة دون روائح كيميائية قوية. كانت الجدولة سهلة وكان الفريق محترمًا جدًا لحيواناتنا الأليفة.”"],
    ["— Sarah M., Carmel", "— Sarah M., Carmel", "— Sarah M., Carmel", "— سارة م.، كارمل"],
    ["“We switched our office cleaning to Cedar & Oak and immediately noticed the difference. Reliable, detailed, and truly professional.”", "“Cambiamos la limpieza de nuestra oficina a Cedar & Oak y notamos la diferencia de inmediato. Confiables, detallistas y muy profesionales.”", "« Nous avons confié le nettoyage de notre bureau à Cedar & Oak et la différence s’est vue tout de suite. Fiable, minutieux et vraiment professionnel. »", "“انتقلنا إلى Cedar & Oak لتنظيف مكتبنا ولاحظنا الفرق فورًا. موثوقون ودقيقون ومحترفون حقًا.”"],
    ["— James R., Fishers", "— James R., Fishers", "— James R., Fishers", "— جيمس ر.، فيشرز"],
    ["“Their move-out clean helped us get our deposit back. Clear communication and careful attention to every room.”", "“Su limpieza de salida nos ayudó a recuperar el depósito. Comunicación clara y mucho cuidado en cada habitación.”", "« Leur nettoyage de fin de bail nous a permis de récupérer notre caution. Communication claire et grand soin dans chaque pièce. »", "“ساعدنا تنظيفهم عند الانتقال على استرداد التأمين. تواصل واضح واهتمام دقيق بكل غرفة.”"],
    ["— Priya & Alex, Westfield", "— Priya & Alex, Westfield", "— Priya & Alex, Westfield", "— بريا وأليكس، ويستفيلد"],

    ["Get started", "Comienza", "Commencez", "ابدأ الآن"],
    ["Request Your Estimate", "Solicita tu presupuesto", "Demandez votre devis", "اطلب تقدير السعر"],
    ["Tell us what you need and we’ll follow up with a personalized estimate.", "Cuéntanos lo que necesitas y te responderemos con un presupuesto personalizado.", "Dites-nous ce dont vous avez besoin et nous vous répondrons avec un devis personnalisé.", "أخبرنا بما تحتاجه وسنتواصل معك بتقدير سعر مخصص."],
    ["Share a few details about your space and we’ll follow up promptly with the next steps.", "Comparte algunos detalles de tu espacio y te responderemos pronto con los siguientes pasos.", "Donnez-nous quelques détails sur votre espace et nous vous répondrons rapidement avec les prochaines étapes.", "شاركنا بعض التفاصيل عن مساحتك وسنتواصل معك سريعًا بالخطوات التالية."],
    ["No obligation quote", "Presupuesto sin compromiso", "Devis sans engagement", "تقدير سعر بدون التزام"],
    ["Residential & commercial", "Residencial y comercial", "Résidentiel et commercial", "منزلي وتجاري"],
    ["Call us", "Llámanos", "Appelez-nous", "اتصل بنا"],
    ["Email us", "Escríbenos por correo", "Envoyez-nous un e-mail", "راسلنا بالبريد"],
    ["Message us anytime on Facebook", "Escríbenos en Facebook cuando quieras", "Écrivez-nous sur Facebook à tout moment", "راسلنا على فيسبوك في أي وقت"],
    ["Message Us on Facebook", "Escríbenos en Facebook", "Écrivez-nous sur Facebook", "راسلنا على فيسبوك"],
    ["Name", "Nombre", "Nom", "الاسم"],
    ["Phone", "Teléfono", "Téléphone", "الهاتف"],
    ["Email", "Correo electrónico", "E-mail", "البريد الإلكتروني"],
    ["Address", "Dirección", "Adresse", "العنوان"],
    ["Service Type", "Tipo de servicio", "Type de service", "نوع الخدمة"],
    ["Select a service", "Selecciona un servicio", "Choisissez un service", "اختر خدمة"],
    ["Customized Cleaning Plan", "Plan de limpieza personalizado", "Plan de nettoyage personnalisé", "خطة تنظيف مخصصة"],
    ["Move-In / Move-Out Cleaning", "Limpieza de mudanza (entrada / salida)", "Nettoyage d’emménagement / déménagement", "تنظيف الانتقال (دخول / خروج)"],
    ["Property Type", "Tipo de propiedad", "Type de bien", "نوع العقار"],
    ["Select property type", "Selecciona el tipo de propiedad", "Choisissez le type de bien", "اختر نوع العقار"],
    ["Home / Residence", "Casa / Residencia", "Maison / Résidence", "منزل / سكن"],
    ["Apartment / Condo", "Apartamento / Condominio", "Appartement / Copropriété", "شقة / وحدة سكنية"],
    ["Office", "Oficina", "Bureau", "مكتب"],
    ["Business / Commercial", "Negocio / Comercial", "Entreprise / Commerce", "شركة / تجاري"],
    ["Organization / Facility", "Organización / Instalación", "Organisation / Installation", "مؤسسة / منشأة"],
    ["Preferred Date", "Fecha preferida", "Date souhaitée", "التاريخ المفضل"],
    ["Message / Cleaning Needs", "Mensaje / Necesidades de limpieza", "Message / Besoins de nettoyage", "الرسالة / احتياجات التنظيف"],
    ["Tell us about your space, priorities, pets, access notes…", "Cuéntanos sobre tu espacio, prioridades, mascotas, notas de acceso…", "Parlez-nous de votre espace, de vos priorités, de vos animaux, des consignes d’accès…", "أخبرنا عن مساحتك وأولوياتك وحيواناتك الأليفة وملاحظات الدخول…"],
    ["Request Estimate", "Solicitar presupuesto", "Demander un devis", "اطلب التقدير"],

    ["Answers", "Respuestas", "Réponses", "إجابات"],
    ["Frequently Asked Questions", "Preguntas frecuentes", "Questions fréquentes", "الأسئلة الشائعة"],
    ["What areas do you serve?", "¿Qué zonas atienden?", "Quelles zones desservez-vous ?", "ما المناطق التي تخدمونها؟"],
    ["We proudly serve Carmel, Fishers, Westfield, Noblesville, and surrounding Hamilton County communities.", "Servimos con orgullo Carmel, Fishers, Westfield, Noblesville y las comunidades vecinas del condado de Hamilton.", "Nous servons fièrement Carmel, Fishers, Westfield, Noblesville et les communes voisines du comté de Hamilton.", "نخدم بفخر كارمل وفيشرز وويستفيلد ونوبلزفيل والمجتمعات المحيطة في مقاطعة هاميلتون."],
    ["Do you offer recurring cleaning?", "¿Ofrecen limpieza periódica?", "Proposez-vous un nettoyage récurrent ?", "هل تقدمون تنظيفًا دوريًا؟"],
    ["Yes. Routine home and office cleaning can be scheduled weekly, bi-weekly, or on a custom recurring cadence that fits your needs.", "Sí. La limpieza regular de hogares y oficinas se puede programar cada semana, cada dos semanas o con la frecuencia que mejor te convenga.", "Oui. Le ménage régulier à domicile ou au bureau peut être planifié chaque semaine, toutes les deux semaines ou selon un rythme adapté à vos besoins.", "نعم. يمكن جدولة التنظيف الدوري للمنازل والمكاتب أسبوعيًا أو كل أسبوعين أو بوتيرة مخصصة تناسب احتياجاتك."],
    ["Do you clean offices and businesses?", "¿Limpian oficinas y negocios?", "Nettoyez-vous les bureaux et les commerces ?", "هل تنظفون المكاتب والشركات؟"],
    ["Absolutely. We provide office, business, commercial, and facility cleaning with reliable scheduling and professional standards.", "Por supuesto. Ofrecemos limpieza de oficinas, negocios, locales comerciales e instalaciones, con horarios confiables y estándares profesionales.", "Bien sûr. Nous assurons le nettoyage de bureaux, d’entreprises, de locaux commercial et d’installations, avec un planning fiable et des normes professionnelles.", "بالتأكيد. نقدم تنظيف المكاتب والشركات والمحلات التجارية والمنشآت بجدولة موثوقة ومعايير احترافية."],
    ["Do you offer move-in and move-out cleaning?", "¿Ofrecen limpieza de mudanza?", "Proposez-vous le nettoyage d’emménagement et de déménagement ?", "هل تقدمون تنظيف الانتقال؟"],
    ["Yes. Our move-in and move-out cleaning helps make transitions smoother with a detailed clean before or after a move.", "Sí. Nuestra limpieza de mudanza facilita el cambio con una limpieza detallada antes o después de mudarte.", "Oui. Notre nettoyage d’emménagement et de déménagement facilite la transition grâce à un nettoyage détaillé avant ou après le déménagement.", "نعم. يساعد تنظيف الانتقال لدينا على جعل الانتقال أسهل بتنظيف تفصيلي قبل الانتقال أو بعده."],
    ["Can I customize my cleaning service?", "¿Puedo personalizar mi servicio de limpieza?", "Puis-je personnaliser mon service de nettoyage ?", "هل يمكنني تخصيص خدمة التنظيف؟"],
    ["Yes. Every home and workplace is different—we create personalized plans based on your space, priorities, and needs.", "Sí. Cada hogar y lugar de trabajo es diferente: creamos planes personalizados según tu espacio, prioridades y necesidades.", "Oui. Chaque maison et chaque lieu de travail est différent : nous créons des plans personnalisés selon votre espace, vos priorités et vos besoins.", "نعم. كل منزل ومكان عمل مختلف — نُعدّ خططًا مخصصة بحسب مساحتك وأولوياتك واحتياجاتك."],
    ["Do you use pet-friendly products?", "¿Usan productos aptos para mascotas?", "Utilisez-vous des produits adaptés aux animaux ?", "هل تستخدمون منتجات ملائمة للحيوانات الأليفة؟"],
    ["We thoughtfully select safer, eco-friendly product options designed with families, pets, and everyday living in mind.", "Elegimos con criterio productos más seguros y ecológicos, pensados para familias, mascotas y la vida diaria.", "Nous choisissons avec soin des produits plus sûrs et écologiques, pensés pour les familles, les animaux et la vie quotidienne.", "نختار بعناية منتجات أكثر أمانًا وصديقة للبيئة، مصممة مع مراعاة الأسر والحيوانات الأليفة والحياة اليومية."],
    ["Are your team members background checked?", "¿Su equipo tiene antecedentes verificados?", "Les antécédents de vos équipes sont-ils vérifiés ?", "هل تم فحص الخلفية الجنائية لأعضاء فريقكم؟"],
    ["Yes. Our team members are trained and background-checked because safety and peace of mind come first.", "Sí. Nuestro equipo está capacitado y con antecedentes verificados, porque la seguridad y la tranquilidad son lo primero.", "Oui. Nos équipes sont formées et leurs antécédents sont vérifiés, car la sécurité et la tranquillité d’esprit passent avant tout.", "نعم. أعضاء فريقنا مدرَّبون وتم فحص خلفيتهم الجنائية لأن السلامة وراحة البال أولًا."],
    ["Are you insured and bonded?", "¿Están asegurados y garantizados?", "Êtes-vous assurés et cautionnés ?", "هل أنتم مؤمَّنون ومكفولون؟"],
    ["Yes. Cedar & Oak Cleaning Services is insured and bonded for your protection and peace of mind.", "Sí. Cedar & Oak Cleaning Services está asegurada y garantizada para tu protección y tranquilidad.", "Oui. Cedar & Oak Cleaning Services est assurée et cautionnée pour votre protection et votre tranquillité d’esprit.", "نعم. Cedar & Oak Cleaning Services مؤمَّنة ومكفولة لحمايتك وراحة بالك."],
    ["How do I request an estimate?", "¿Cómo solicito un presupuesto?", "Comment demander un devis ?", "كيف أطلب تقدير سعر؟"],
    ["Use the estimate form on this page or message us on Facebook. We’ll follow up promptly with next steps.", "Usa el formulario de esta página o escríbenos en Facebook. Te responderemos pronto con los siguientes pasos.", "Utilisez le formulaire de cette page ou écrivez-nous sur Facebook. Nous vous répondrons rapidement avec les prochaines étapes.", "استخدم نموذج التقدير في هذه الصفحة أو راسلنا على فيسبوك. سنتواصل معك سريعًا بالخطوات التالية."],

    ["Ready for a Cleaner Space?", "¿Listo para un espacio más limpio?", "Prêt pour un espace plus propre ?", "هل أنت مستعد لمكان أنظف؟"],
    ["Let Cedar & Oak take cleaning off your to-do list.", "Deja que Cedar & Oak saque la limpieza de tu lista de pendientes.", "Laissez Cedar & Oak retirer le ménage de votre liste de tâches.", "دع Cedar & Oak تزيل التنظيف من قائمة مهامك."],

    ["Social media", "Redes sociales", "Réseaux sociaux", "وسائل التواصل الاجتماعي"],
    ["Facebook", "Facebook", "Facebook", "فيسبوك"],
    ["Instagram", "Instagram", "Instagram", "إنستغرام"],
    ["Carmel • Fishers • Westfield • Noblesville • Hamilton County", "Carmel • Fishers • Westfield • Noblesville • Condado de Hamilton", "Carmel • Fishers • Westfield • Noblesville • Comté de Hamilton", "كارمل • فيشرز • ويستفيلد • نوبلزفيل • مقاطعة هاميلتون"],
    ["Residential Cleaning", "Limpieza residencial", "Nettoyage résidentiel", "التنظيف المنزلي"],
    ["Commercial Cleaning", "Limpieza comercial", "Nettoyage commercial", "التنظيف التجاري"],
    ["Move-In / Move-Out", "Mudanza (entrada / salida)", "Emménagement / déménagement", "الانتقال (دخول / خروج)"],
    ["Customized Cleaning", "Limpieza personalizada", "Nettoyage personnalisé", "تنظيف مخصص"],
    ["Get in Touch", "Contáctanos", "Nous contacter", "تواصل معنا"],
    ["Follow Us on Instagram", "Síguenos en Instagram", "Suivez-nous sur Instagram", "تابعنا على إنستغرام"],
    ["© 2026 Cedar & Oak Cleaning Services. All Rights Reserved.", "© 2026 Cedar & Oak Cleaning Services. Todos los derechos reservados.", "© 2026 Cedar & Oak Cleaning Services. Tous droits réservés.", "© 2026 Cedar & Oak Cleaning Services. جميع الحقوق محفوظة."],

    // Page titles + meta descriptions
    ["Cedar & Oak Cleaning Services | Hamilton County, Indiana", "Cedar & Oak Cleaning Services | Condado de Hamilton, Indiana", "Cedar & Oak Cleaning Services | Comté de Hamilton, Indiana", "Cedar & Oak Cleaning Services | مقاطعة هاميلتون، إنديانا"],
    ["Our Services | Cedar & Oak Cleaning Services", "Nuestros servicios | Cedar & Oak Cleaning Services", "Nos services | Cedar & Oak Cleaning Services", "خدماتنا | Cedar & Oak Cleaning Services"],
    ["Ratings & Reviews | Cedar & Oak Cleaning Services", "Calificaciones y opiniones | Cedar & Oak Cleaning Services", "Notes et avis | Cedar & Oak Cleaning Services", "التقييمات والآراء | Cedar & Oak Cleaning Services"],
    ["Book a Cleaning | Cedar & Oak Cleaning Services", "Reserva una limpieza | Cedar & Oak Cleaning Services", "Réserver un nettoyage | Cedar & Oak Cleaning Services", "احجز تنظيفًا | Cedar & Oak Cleaning Services"],
    ["Clean spaces. Healthier living. More time for what matters. Proudly serving Hamilton County, Indiana.", "Espacios limpios. Vida más saludable. Más tiempo para lo que importa. Sirviendo con orgullo al condado de Hamilton, Indiana.", "Des espaces propres. Une vie plus saine. Plus de temps pour l’essentiel. Fiers de servir le comté de Hamilton, Indiana.", "مساحات نظيفة. حياة أكثر صحة. وقت أكثر لما يهمك. نخدم بفخر مقاطعة هاميلتون، إنديانا."],
    ["Cedar & Oak Cleaning Services provides professional residential and commercial cleaning in Carmel, Fishers, Westfield, Noblesville, and Hamilton County, Indiana. Safer products, reliable service, insured & bonded.", "Cedar & Oak Cleaning Services ofrece limpieza residencial y comercial profesional en Carmel, Fishers, Westfield, Noblesville y el condado de Hamilton, Indiana. Productos más seguros, servicio confiable, asegurados y garantizados.", "Cedar & Oak Cleaning Services propose un nettoyage résidentiel et commercial professionnel à Carmel, Fishers, Westfield, Noblesville et dans le comté de Hamilton, Indiana. Produits plus sûrs, service fiable, assurés et cautionnés.", "تقدم Cedar & Oak Cleaning Services خدمات تنظيف منزلية وتجارية احترافية في كارمل وفيشرز وويستفيلد ونوبلزفيل ومقاطعة هاميلتون، إنديانا. منتجات أكثر أمانًا وخدمة موثوقة ومؤمَّنة ومكفولة."],
    ["Routine, deep, move-in/move-out, office and commercial cleaning from Cedar & Oak Cleaning Services in Hamilton County, Indiana.", "Limpieza regular, profunda, de mudanza, para oficinas y comercial de Cedar & Oak Cleaning Services en el condado de Hamilton, Indiana.", "Nettoyage régulier, en profondeur, d’emménagement/déménagement, de bureaux et commercial par Cedar & Oak Cleaning Services dans le comté de Hamilton, Indiana.", "تنظيف دوري وعميق وللانتقال وللمكاتب والشركات من Cedar & Oak Cleaning Services في مقاطعة هاميلتون، إنديانا."],
    ["Read what clients say about Cedar & Oak Cleaning Services in Hamilton County, Indiana.", "Lee lo que dicen los clientes sobre Cedar & Oak Cleaning Services en el condado de Hamilton, Indiana.", "Lisez ce que disent les clients sur Cedar & Oak Cleaning Services dans le comté de Hamilton, Indiana.", "اقرأ ما يقوله العملاء عن Cedar & Oak Cleaning Services في مقاطعة هاميلتون، إنديانا."],
    ["Request an estimate and book residential or commercial cleaning with Cedar & Oak Cleaning Services in Hamilton County, Indiana.", "Solicita un presupuesto y reserva limpieza residencial o comercial con Cedar & Oak Cleaning Services en el condado de Hamilton, Indiana.", "Demandez un devis et réservez un nettoyage résidentiel ou commercial avec Cedar & Oak Cleaning Services dans le comté de Hamilton, Indiana.", "اطلب تقدير سعر واحجز تنظيفًا منزليًا أو تجاريًا مع Cedar & Oak Cleaning Services في مقاطعة هاميلتون، إنديانا."]
  ];

  var LANGS = ["en", "es", "fr", "ar"];
  var map = {};
  T.forEach(function (row) { map[row[0]] = row; });

  function norm(s) { return s.replace(/\s+/g, " ").trim(); }
  function tr(en, lang) {
    var row = map[en];
    var i = LANGS.indexOf(lang);
    return row && i > 0 && row[i] ? row[i] : en;
  }

  var textNodes = [];   // {node, lead, trail, en}
  var attrNodes = [];   // {el, attr, en}
  var ATTRS = ["alt", "placeholder", "aria-label", "content"];

  function collect() {
    // keep submitted option values in English regardless of display language
    document.querySelectorAll("option").forEach(function (o) {
      if (!o.hasAttribute("value")) o.setAttribute("value", norm(o.textContent));
    });

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode && n.parentNode.nodeName;
        if (p === "SCRIPT" || p === "STYLE" || p === "NOSCRIPT") return NodeFilter.FILTER_REJECT;
        if (p === "BUTTON" && n.parentNode.hasAttribute("data-lang")) return NodeFilter.FILTER_REJECT;
        return n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var n;
    while ((n = walker.nextNode())) {
      var en = norm(n.nodeValue);
      if (map[en]) {
        textNodes.push({ node: n, lead: /^\s/.test(n.nodeValue) ? " " : "", trail: /\s$/.test(n.nodeValue) ? " " : "", en: en });
      }
    }
    document.querySelectorAll("[alt],[placeholder],[aria-label]").forEach(function (el) {
      ["alt", "placeholder", "aria-label"].forEach(function (a) {
        if (el.hasAttribute(a) && map[norm(el.getAttribute(a))]) {
          attrNodes.push({ el: el, attr: a, en: norm(el.getAttribute(a)) });
        }
      });
    });
    document.querySelectorAll('meta[name="description"], meta[property="og:description"]').forEach(function (desc) {
      if (desc && map[norm(desc.content)]) attrNodes.push({ el: desc, attr: "content", en: norm(desc.content) });
    });
    window.__titleEn = norm(document.title);
  }

  function apply(lang) {
    textNodes.forEach(function (t) { t.node.nodeValue = t.lead + tr(t.en, lang) + t.trail; });
    attrNodes.forEach(function (a) { a.el.setAttribute(a.attr, tr(a.en, lang)); });
    document.title = tr(window.__titleEn, lang);

    var html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
    try { localStorage.setItem("cedaroak-lang", lang); } catch (e) {}
  }

  function init() {
    collect();
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { apply(b.getAttribute("data-lang")); });
    });
    var saved = null;
    try { saved = localStorage.getItem("cedaroak-lang"); } catch (e) {}
    if (!saved) {
      var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
      saved = LANGS.indexOf(nav) > 0 ? nav : "en";
    }
    apply(LANGS.indexOf(saved) >= 0 ? saved : "en");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
