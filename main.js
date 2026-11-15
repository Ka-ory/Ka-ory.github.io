/* ==========================================================================
   Portfolio Kamil CINAR · interactions
   Tout fonctionne sans bibliothèque. GSAP + ScrollTrigger (CDN, version figée)
   ajoutent la parallaxe ; Three.js (scene.js) ajoute la 3D. Si l'un des deux
   ne se charge pas, le site reste complet.

   Sommaire : 1 données des fiches · 2 langue · 3 titres · 4 apparitions
   5 compteurs · 6 cartes · 7 curseur · 8 navigation · 9 scroll · 10 3D
   11 parallaxe · 12 filtres · 13 fiche projet · 14 visionneuse · 15 clavier
   16 copie de l'e-mail · 17 démarrage
   ========================================================================== */
(() => {
  'use strict';
  const d = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const mq = m => window.matchMedia && window.matchMedia(m).matches;
  const reduce = mq('(prefers-reduced-motion: reduce)');
  const fine = mq('(hover: hover) and (pointer: fine)');
  const params = new URLSearchParams(location.search);
  d.classList.add('js');
  clearTimeout(window.__pfSafety);

  const MAIL = 'kamil.cinarpro@gmail.com';
  const GSAP_URLS = [
    'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js'
  ];
  let scene3d = null;

  /* ==========================================================
     1. DONNÉES DES FICHES PROJETS (FR / EN)
     ========================================================== */
  const UI = {
    fr: { date: 'Date', context: 'Contexte', role: 'Rôle', stack: 'Stack', close: 'Fermer la fiche (Échap)', done: 'Terminé', wip: 'En cours',
          prev: 'Projet précédent', next: 'Projet suivant', code: 'Voir le code', site: 'Voir le site', before: 'Avant', after: 'Après', project: 'Projet',
          zoom: 'Agrandir l\'image', viewer: 'Image agrandie', vclose: 'Fermer l\'image', vprev: 'Image précédente', vnext: 'Image suivante',
          menuOpen: 'Ouvrir le menu', menuClose: 'Fermer le menu', copied: 'Adresse copiée.', copyFail: 'Copie impossible : l\'adresse est sélectionnée, copiez-la à la main.',
          shown: n => `${n} projet${n > 1 ? 's' : ''} affiché${n > 1 ? 's' : ''}` },
    en: { date: 'Date', context: 'Context', role: 'Role', stack: 'Stack', close: 'Close the sheet (Esc)', done: 'Completed', wip: 'In progress',
          prev: 'Previous project', next: 'Next project', code: 'View code', site: 'View site', before: 'Before', after: 'After', project: 'Project',
          zoom: 'Enlarge the image', viewer: 'Enlarged image', vclose: 'Close the image', vprev: 'Previous image', vnext: 'Next image',
          menuOpen: 'Open the menu', menuClose: 'Close the menu', copied: 'Address copied.', copyFail: 'Copy failed: the address is selected, copy it manually.',
          shown: n => `${n} project${n > 1 ? 's' : ''} shown` }
  };

  const PROJECTS = [
    {
      id: 'amg', image: 'images/amg-preview.jpg', status: 'done',
      links: [{ k: 'site', href: 'https://ka-ory.github.io/configurateur-amg/' }, { k: 'code', href: 'https://github.com/Ka-ory/configurateur-amg' }],
      fr: {
        title: 'Configurateur AMG 3D',
        sub: 'Une expérience 3D temps réel pour configurer une AMG dans un décor de forêt enneigée.',
        spec: { date: '2025', context: 'Projet personnel', role: 'Dév. 3D WebGL' },
        stack: ['Three.js', 'WebGL', 'JavaScript', 'HTML5', 'CSS3'],
        sections: [
          { t: 'Objectif', p: 'Proposer un configurateur automobile fluide directement dans le navigateur, avec un rendu 3D en temps réel et des commandes simples.' },
          { t: 'Ce que fait le configurateur', l: [
            'Choix du modèle (CLA 45 S ou CLS 63 S)',
            'Peinture de carrosserie, jantes forgées et teinte des vitres',
            'Cycle jour/nuit réglable avec le curseur « heure de la journée »',
            'Caméras dynamiques : avant, profil, arrière et rotation automatique',
            'Bouton « Start Engine »'
          ] }
        ]
      },
      en: {
        title: '3D AMG configurator',
        sub: 'A real-time 3D experience to configure an AMG in a snowy forest setting.',
        spec: { date: '2025', context: 'Personal project', role: '3D / WebGL dev' },
        stack: ['Three.js', 'WebGL', 'JavaScript', 'HTML5', 'CSS3'],
        sections: [
          { t: 'Goal', p: 'Offer a smooth car configurator right in the browser, with real-time 3D rendering and simple controls.' },
          { t: 'What the configurator does', l: [
            'Model selection (CLA 45 S or CLS 63 S)',
            'Body paint, forged wheels and glass tint',
            'Day/night cycle driven by the "time of day" slider',
            'Dynamic cameras: front, side, rear and automatic rotation',
            '"Start Engine" button'
          ] }
        ]
      }
    },
    {
      id: 'odoo', image: 'images/stage-entrepot.webp', status: 'done', grade: '17',
      links: [],
      gallery: [
        { src: 'images/stage-ecosysteme.webp', fr: 'Écosystème du SI : Odoo au centre, WooCommerce, connecteur, Google Workspace et Chronopost', en: 'IS ecosystem: Odoo at the core, WooCommerce, connector, Google Workspace and Chronopost' },
        { src: 'images/stage-qweb.webp', fr: 'Édition d\'un modèle de facture dans le code QWeb', en: 'Editing an invoice template in QWeb code' },
        { src: 'images/stage-facture.webp', fr: 'Modèle de facture finalisé (coordonnées du client floutées)', en: 'Final invoice template (customer details blurred)' },
        { src: 'images/stage-numerotation.webp', fr: 'Numérotation séparée entre pièces web et pièces manuelles', en: 'Separate numbering for web and manual documents' },
        { src: 'images/stage-franco.webp', fr: 'Colonne « note fournisseur / franco » ajoutée aux demandes de prix', en: '"Supplier note / free shipping" column added to RFQs' },
        { src: 'images/stage-inventaire.webp', fr: 'Module Inventaire : réceptions, transferts internes et livraisons', en: 'Inventory app: receipts, internal transfers and deliveries' },
        { src: 'images/stage-destockage.webp', fr: 'Rubrique « déstockage » mise en ligne sur le site', en: '"Clearance" section published on the website' },
        { src: 'images/stage-gantt.webp', fr: 'Planning du stage, du 7 avril au 5 juin 2026', en: 'Internship schedule, 7 April to 5 June 2026' }
      ],
      ba: {
        before: { src: 'images/stage-avant.webp', fr: 'Avant : factures ressaisies dans l\'ancien logiciel (MEG) et étiquettes de transport générées depuis WordPress, hors de l\'ERP.', en: 'Before: invoices re-typed in the old software (MEG) and shipping labels generated from WordPress, outside the ERP.' },
        after: { src: 'images/stage-apres.webp', fr: 'Cible : devis, factures et étiquettes centralisés dans Odoo. Le module Chronopost et la bascule de la facturation étaient planifiés juste après le stage.', en: 'Target: quotes, invoices and labels centralised in Odoo. The Chronopost module and the invoicing switch-over were planned right after the internship.' }
      },
      stats: [
        { n: 30000, fr: 'références au catalogue, gérées par une petite équipe', en: 'products in the catalogue, run by a small team' },
        { n: 30, pre: '≈', suf: ' min', fr: 'de ressaisie par devis ou facture avant la mission, quelques minutes après', en: 'of re-typing per quote or invoice before the mission, a few minutes after' },
        { n: 1830, fr: 'références rangées automatiquement par rack (R1 à R5)', en: 'products assigned to a rack automatically (R1 to R5)' },
        { n: 17, suf: '/20', fr: 'note du stage et de la soutenance', en: 'grade for the internship and its defence' }
      ],
      fr: {
        title: 'Déploiement d\'un ERP Odoo',
        sub: 'Stage de BUT 2 chez La Boutique du Pro, e-commerçant savoyard d\'équipements de protection et de vêtements de travail. Ma mission : rendre Odoo 19 réellement opérationnel et automatiser les processus commerciaux.',
        spec: { date: 'Avril – juin 2026', context: 'Stage BUT 2 · 8 semaines', role: 'Intégrateur ERP / SI' },
        extra: [{ k: 'Note', v: '17/20' }],
        stack: ['Odoo 19 Enterprise', 'Odoo Studio', 'QWeb / XML', 'Python', 'Playwright', 'WooCommerce', 'Google Sheets', 'Notion'],
        sections: [
          { t: 'Le contexte', p: 'L\'entreprise avait basculé sa gestion sur Odoo 19 Enterprise (hébergé sur Odoo.sh), relié à son site WooCommerce par un connecteur. Mais l\'outil restait sous-exploité : factures ressaisies dans un ancien logiciel, fiches produits créées à la main, étiquettes de transport générées hors de l\'ERP.' },
          { ba: true, t: 'Avant / après' },
          { t: 'Projet phare : devis et factures dans Odoo', l: [
            'Rapatriement de la chaîne devis → bon de commande → bon de livraison → facture depuis l\'ancien logiciel vers Odoo',
            'Deux modèles PDF en QWeb (pièces manuelles et pièces web), choisis automatiquement selon le journal comptable',
            'Numérotation étanche entre web et manuel : DEV/, BL/, FAC/MAN/, FAC/WP/',
            'Procédure de bascule rédigée pour le 1er juillet, début du nouvel exercice comptable'
          ] },
          { t: 'Personnalisation de l\'ERP', l: [
            'Affichage automatique du franco de port fournisseur sur les demandes de prix',
            'Notes internes exclues des PDF envoyés aux fournisseurs',
            'Alerte visuelle dès qu\'une quantité dépasse l\'unité, en commande comme en réception',
            'Vues retravaillées avec Odoo Studio, XML/Xpath et QWeb'
          ] },
          { t: 'Logistique et catalogue', l: [
            'Réception au code-barres avec l\'application Code-barres d\'Odoo',
            'Rangement guidé par rack grâce à des catégories par marque et des règles de rangement',
            'Imports massifs par marque préparés avec des formules Google Sheets, contrôlés par échantillonnage',
            'Script Python (Playwright) pour récupérer puis renommer en masse les visuels d\'un catalogue fournisseur'
          ] },
          { t: 'Site e-commerce et interopérabilité', l: [
            'Analyse de la remontée des statuts WooCommerce → Odoo et statut « Mandat administratif » pour les collectivités',
            'Étude du module Chronopost pour générer les étiquettes directement depuis Odoo',
            'Rubrique de déstockage mise en ligne, plan du site HTML et suivi de l\'indexation dans la Search Console'
          ] },
          { gallery: true, t: 'En images' },
          { t: 'Livrables remis', chips: ['Tutoriel Odoo Studio', 'Guide WooCommerce', 'Guide des modèles de devis et factures', 'Architecture WooCommerce · Odoo · Chronopost', 'Rapports comparatifs', 'Procédure de bascule'] },
          { t: 'Ce que j\'en retiens', q: 'Travailler sans cahier des charges figé, au contact direct du dirigeant : reformuler le besoin, livrer vite, faire valider, puis documenter. Mon tuteur a souligné mon autonomie et ma capacité à repérer et automatiser les tâches chronophages.' }
        ]
      },
      en: {
        title: 'Odoo ERP deployment',
        sub: 'BUT 2 internship at La Boutique du Pro, an online retailer of workwear and protective equipment in Savoie. My mission: make Odoo 19 truly operational and automate the sales processes.',
        spec: { date: 'Apr – Jun 2026', context: 'BUT 2 internship · 8 weeks', role: 'ERP / IS integrator' },
        extra: [{ k: 'Grade', v: '17/20' }],
        stack: ['Odoo 19 Enterprise', 'Odoo Studio', 'QWeb / XML', 'Python', 'Playwright', 'WooCommerce', 'Google Sheets', 'Notion'],
        sections: [
          { t: 'Context', p: 'The company had moved its management to Odoo 19 Enterprise (hosted on Odoo.sh), connected to its WooCommerce store. But the tool was under-used: invoices re-typed in old software, product sheets created by hand, shipping labels generated outside the ERP.' },
          { ba: true, t: 'Before / after' },
          { t: 'Key project: quotes and invoices in Odoo', l: [
            'Moving the quote → sales order → delivery order → invoice chain from the old software into Odoo',
            'Two QWeb PDF templates (manual and web documents), picked automatically by accounting journal',
            'Strictly separate numbering for web and manual documents: DEV/, BL/, FAC/MAN/, FAC/WP/',
            'Switch-over procedure written for 1 July, start of the new financial year'
          ] },
          { t: 'ERP customisation', l: [
            'Supplier free-shipping threshold shown automatically on requests for quotation',
            'Internal notes kept out of the PDFs sent to suppliers',
            'Visual alert as soon as a quantity exceeds one, on orders and receipts',
            'Views reworked with Odoo Studio, XML/Xpath and QWeb'
          ] },
          { t: 'Logistics and catalogue', l: [
            'Barcode receiving with Odoo\'s Barcode app',
            'Rack-guided put-away using brand categories and put-away rules',
            'Bulk imports per brand prepared with Google Sheets formulas and checked by sampling',
            'Python script (Playwright) to collect and bulk-rename a supplier catalogue\'s product images'
          ] },
          { t: 'E-commerce site and interoperability', l: [
            'Analysis of WooCommerce → Odoo order statuses and an "administrative mandate" status for public bodies',
            'Study of the Chronopost module to print labels straight from Odoo',
            'Clearance section published, HTML sitemap and indexing follow-up in Search Console'
          ] },
          { gallery: true, t: 'In pictures' },
          { t: 'Deliverables', chips: ['Odoo Studio tutorial', 'WooCommerce guide', 'Quote and invoice template guide', 'WooCommerce · Odoo · Chronopost architecture', 'Comparison reports', 'Switch-over procedure'] },
          { t: 'What I take away', q: 'Working without a fixed spec, right next to the decision-maker: rephrase the need, deliver fast, get it validated, then document. My supervisor highlighted my autonomy and my knack for spotting and automating time-consuming tasks.' }
        ]
      }
    },
    {
      id: 'kctech', image: 'images/kctech-hero.webp', status: 'wip',
      links: [{ k: 'site', href: 'https://kctech.fr' }],
      gallery: [
        { src: 'images/kctech-hero.webp', fr: 'Accueil : la promesse, et une facture qui suit son parcours en temps réel', en: 'Home: the promise, and an invoice moving through its journey' },
        { src: 'images/kctech-prestations.webp', fr: 'Les quatre prestations et le fil directeur qui se trace au scroll', en: 'The four services and the guiding line drawn on scroll' },
        { src: 'images/kctech-methode.webp', fr: 'La méthode en quatre étapes, du diagnostic au suivi', en: 'The four-step method, from diagnosis to follow-up' }
      ],
      fr: {
        title: 'KC Tech, mon entreprise',
        sub: 'La micro-entreprise que j\'ai lancée en septembre 2026 : intégration Odoo, facture électronique et développement web pour les TPE et PME de Savoie et Haute-Savoie.',
        spec: { date: 'Depuis septembre 2026', context: 'Entreprise individuelle', role: 'Fondateur' },
        stack: ['HTML5', 'CSS3', 'JavaScript', 'Données structurées', 'OVH'],
        sections: [
          { t: 'Pourquoi cette entreprise', p: 'La réforme de la facture électronique oblige toutes les TPE et PME à émettre des factures électroniques à partir du 1er septembre 2027. KC Tech les accompagne avec Odoo, en s\'appuyant sur ce que j\'ai mis en place pendant mon stage.' },
          { t: 'Les prestations', l: [
            'Mise en conformité facture électronique avec Odoo',
            'Déploiement d\'Odoo sur mesure',
            'Connexions et automatisations (WooCommerce, Python)',
            'Développement web : sites vitrines et applications sur mesure'
          ] },
          { t: 'Le site kctech.fr', l: [
            'Analyse du marché, de la concurrence et des obligations légales avant la conception',
            'Site statique rapide, hébergé chez OVH, sans cookie',
            'Compte à rebours jusqu\'à l\'échéance de 2027, facture animée, fil directeur et thème clair ou sombre',
            'Référencement local : données structurées, plan du site et FAQ'
          ] },
          { gallery: true, t: 'En images' }
        ]
      },
      en: {
        title: 'KC Tech, my company',
        sub: 'The micro-business I launched in September 2026: Odoo integration, e-invoicing and web development for small businesses in Savoie and Haute-Savoie.',
        spec: { date: 'Since September 2026', context: 'Sole proprietorship', role: 'Founder' },
        stack: ['HTML5', 'CSS3', 'JavaScript', 'Structured data', 'OVH'],
        sections: [
          { t: 'Why this company', p: 'France\'s e-invoicing reform requires every small business to issue electronic invoices from 1 September 2027. KC Tech helps them do it with Odoo, building on what I set up during my internship.' },
          { t: 'Services', l: [
            'E-invoicing compliance with Odoo',
            'Tailored Odoo deployment',
            'Integrations and automation (WooCommerce, Python)',
            'Web development: showcase sites and custom web apps'
          ] },
          { t: 'The kctech.fr website', l: [
            'Market, competition and legal analysis before design',
            'Fast static site hosted at OVH, no cookies',
            'Countdown to the 2027 deadline, animated invoice, guiding line, light and dark themes',
            'Local SEO: structured data, sitemap and FAQ'
          ] },
          { gallery: true, t: 'In pictures' }
        ]
      }
    },
    {
      id: 'namerakorp', gen: 'CRM', status: 'wip', links: [],
      fr: {
        title: 'NameraKorp',
        sub: 'Un site Power Pages relié à un CRM Dataverse pour un équipementier automobile fictif, mené en Scrum sur 3 sprints.',
        spec: { date: 'BUT 3', context: 'Projet de groupe (équipe de 3)', role: 'Création du site (sprint 1)' },
        stack: ['Power Pages', 'Dataverse', 'Dynamics 365', 'Scrum', 'Azure DevOps'],
        sections: [
          { t: 'Objectif', p: 'Construire un site vitrine connecté à un CRM (Dataverse / Dynamics 365), en travaillant comme une équipe agile avec un backlog suivi dans Azure DevOps.' },
          { t: 'Ma contribution (sprint 1)', l: [
            'Création du site Power Pages',
            'Site multilingue : français, anglais et italien',
            'Page d\'erreur 404 personnalisée'
          ] },
          { t: 'Méthode', p: 'Travail en Scrum sur 3 sprints, avec répartition des tâches et suivi de l\'avancement dans le backlog.' }
        ]
      },
      en: {
        title: 'NameraKorp',
        sub: 'A Power Pages site linked to a Dataverse CRM for a fictional car-parts maker, run in Scrum over 3 sprints.',
        spec: { date: 'BUT 3', context: 'Group project (team of 3)', role: 'Site creation (sprint 1)' },
        stack: ['Power Pages', 'Dataverse', 'Dynamics 365', 'Scrum', 'Azure DevOps'],
        sections: [
          { t: 'Goal', p: 'Build a showcase site connected to a CRM (Dataverse / Dynamics 365), working as an agile team with a backlog tracked in Azure DevOps.' },
          { t: 'My contribution (sprint 1)', l: [
            'Creating the Power Pages site',
            'Multilingual site: French, English and Italian',
            'Custom 404 error page'
          ] },
          { t: 'Method', p: 'Scrum over 3 sprints, with task distribution and progress tracked in the backlog.' }
        ]
      }
    },
    {
      id: 'loxam', image: 'images/loxam.webp', status: 'done',
      links: [{ k: 'code', href: 'https://github.com/KaoryPrime/Sae-de-fou-' }],
      fr: {
        title: 'Application de gestion (Loxam)',
        sub: 'Une application de bureau pour gérer la location de matériel et les stocks.',
        spec: { date: '2024', context: 'Projet de groupe', role: 'Backend C#' },
        stack: ['C#', '.NET (WPF)', 'MySQL'],
        sections: [
          { t: 'Objectif', p: 'Concevoir un ERP lourd pour une activité de location de matériel : suivi des locations et gestion des stocks.' },
          { t: 'Ma contribution', l: [
            'Développement du backend en C#',
            'Travail en équipe sur une application .NET (WPF) reliée à une base MySQL'
          ] }
        ]
      },
      en: {
        title: 'Management app (Loxam)',
        sub: 'A desktop application to manage equipment rental and stock.',
        spec: { date: '2024', context: 'Group project', role: 'C# backend' },
        stack: ['C#', '.NET (WPF)', 'MySQL'],
        sections: [
          { t: 'Goal', p: 'Design a desktop ERP for an equipment rental business: rental tracking and stock management.' },
          { t: 'My contribution', l: [
            'Backend development in C#',
            'Teamwork on a .NET (WPF) application connected to a MySQL database'
          ] }
        ]
      }
    },
    {
      id: 'fifa', image: 'images/fifa.webp', status: 'wip',
      links: [{ k: 'site', href: 'http://51.83.36.122:6677' }],
      fr: {
        title: 'Clone de site e-commerce (FIFA)',
        sub: 'Un clone de site e-commerce pour étudier l\'architecture web, la base de données et le responsive.',
        spec: { date: 'BUT 2', context: 'Universitaire (équipe de 5)', role: 'Fullstack' },
        stack: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'SQL'],
        sections: [
          { t: 'Objectif', p: 'Reproduire un site e-commerce existant pour comprendre comment s\'organisent une architecture web moderne, sa base de données et son affichage sur mobile.' },
          { t: 'Ma contribution', l: [
            'Conception de la base de données (MCD, MLD)',
            'Développement en HTML, CSS, JavaScript, PHP et SQL',
            'Travail en équipe de 5'
          ] }
        ]
      },
      en: {
        title: 'E-commerce site clone (FIFA)',
        sub: 'A clone of an e-commerce site to study web architecture, database design and responsive layout.',
        spec: { date: 'BUT 2', context: 'University (team of 5)', role: 'Fullstack' },
        stack: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'SQL'],
        sections: [
          { t: 'Goal', p: 'Reproduce an existing e-commerce site to understand how a modern web architecture, its database and its mobile layout fit together.' },
          { t: 'My contribution', l: [
            'Database design (conceptual and logical models)',
            'Development in HTML, CSS, JavaScript, PHP and SQL',
            'Teamwork in a team of 5'
          ] }
        ]
      }
    },
    {
      id: 'annuaire', gen: 'DJANGO', status: 'done', links: [],
      gallery: [
        { src: 'images/annuaire-vide.webp', fr: 'Page d\'accueil : l\'annuaire encore vide', en: 'Home page: the directory, still empty' },
        { src: 'images/annuaire-formulaire.webp', fr: 'Formulaire d\'inscription : nom, e-mail, promotion et métier', en: 'Sign-up form: name, e-mail, class year and job' },
        { src: 'images/annuaire-liste.webp', fr: 'Retour sur l\'annuaire avec le message de confirmation', en: 'Back on the directory with the confirmation message' }
      ],
      fr: {
        title: 'Annuaire des alumni (Django)',
        sub: 'Une petite application Django construite pas à pas pour comprendre comment fonctionne le framework : formulaire validé, base de données et tests.',
        spec: { date: '2026', context: 'Projet personnel', role: 'Développement complet' },
        stack: ['Python 3.11', 'Django 5.2', 'SQLite', 'HTML / CSS'],
        sections: [
          { t: 'Ce que fait l\'application', l: [
            'Affiche la liste des anciens élèves inscrits, avec un message tant que l\'annuaire est vide',
            'Formulaire d\'inscription : nom, e-mail, année de promotion et métier (facultatif)',
            'Refuse un e-mail déjà utilisé et une année de promotion absurde (par exemple 1800)',
            'Interface d\'administration Django pour consulter et modifier les inscrits'
          ] },
          { t: 'Comment ça marche', p: 'L\'adresse demandée passe par les routes, qui choisissent la vue. La vue lit ou enregistre les données grâce au modèle, puis les envoie à un template HTML. Pour l\'inscription, la vue affiche un formulaire vide, ou vérifie les données envoyées, les enregistre et redirige vers l\'annuaire avec un message de confirmation.' },
          { t: 'Les fichiers clés', chips: ['models.py', 'forms.py', 'views.py', 'urls.py', 'templates', 'tests.py'] },
          { t: 'Comment je l\'ai réalisé', l: [
            'Environnement virtuel, projet Django et application « annuaire » créés dans VS Code',
            'Modèle Alumni et migrations vers SQLite, vérifiés dans l\'administration',
            'Formulaire, vues, routes et templates, avec validation de l\'année de promotion',
            'Quatre tests automatiques (annuaire vide, inscription valide, année invalide, e-mail en double) : tous passent',
            'Aide d\'un assistant IA pour la documentation et une partie du code, puis tout relu et testé pour comprendre chaque fichier'
          ] },
          { gallery: true, t: 'En images' },
          { t: 'Pour aller plus loin', p: 'Transformer l\'annuaire en API avec Django REST Framework, passer de SQLite à PostgreSQL et afficher les données avec un front en Vue.js.' }
        ]
      },
      en: {
        title: 'Alumni directory (Django)',
        sub: 'A small Django app built step by step to understand how the framework works: validated form, database and tests.',
        spec: { date: '2026', context: 'Personal project', role: 'Full development' },
        stack: ['Python 3.11', 'Django 5.2', 'SQLite', 'HTML / CSS'],
        sections: [
          { t: 'What the app does', l: [
            'Lists registered alumni, with a message while the directory is empty',
            'Sign-up form: name, e-mail, class year and job (optional)',
            'Rejects an e-mail already in use and an absurd class year (for example 1800)',
            'Django admin to view and edit entries'
          ] },
          { t: 'How it works', p: 'The requested URL goes through the routes, which pick the view. The view reads or saves data through the model, then sends it to an HTML template. For sign-up, the view shows an empty form, or checks the submitted data, saves it and redirects to the directory with a confirmation message.' },
          { t: 'Key files', chips: ['models.py', 'forms.py', 'views.py', 'urls.py', 'templates', 'tests.py'] },
          { t: 'How I built it', l: [
            'Virtual environment, Django project and "annuaire" app created in VS Code',
            'Alumni model and migrations to SQLite, checked in the admin',
            'Form, views, routes and templates, with class-year validation',
            'Four automated tests (empty directory, valid sign-up, invalid year, duplicate e-mail): all pass',
            'Help from an AI assistant for documentation and part of the code, then everything reviewed and tested to understand each file'
          ] },
          { gallery: true, t: 'In pictures' },
          { t: 'Next steps', p: 'Turn the directory into an API with Django REST Framework, move from SQLite to PostgreSQL and display the data with a Vue.js front end.' }
        ]
      }
    },
    {
      id: 'portfolio', image: 'images/portfolio.webp', status: 'done',
      links: [{ k: 'code', href: 'https://github.com/Ka-ory/Ka-ory.github.io' }],
      fr: {
        title: 'Ce portfolio',
        sub: 'Un site vitrine bilingue avec une scène 3D pilotée par le scroll, sans framework ni étape de build.',
        spec: { date: '2025 · refonte 2026', context: 'Projet personnel', role: 'Frontend / UI' },
        stack: ['HTML5', 'CSS3', 'JavaScript', 'Three.js', 'GSAP'],
        sections: [
          { t: 'Objectif', p: 'Présenter mes projets et mon parcours avec un site rapide, lisible et facile à maintenir.' },
          { t: 'Ce que fait le site', l: [
            'Une seule scène WebGL derrière toute la page : des écrans, des bases de données et des nœuds d\'API se relient au fil du scroll',
            'Une formation 3D par section, sans bloquer le scroll natif',
            'Version statique automatique si l\'appareil est lent, si les animations sont réduites ou si un CDN ne répond pas',
            'Version française et anglaise, fiches projets détaillées, navigation au clavier'
          ] },
          { t: 'Comment je l\'ai réalisé', l: [
            'Fichiers statiques hébergés sur GitHub Pages, bibliothèques chargées par CDN à version figée',
            'Aide d\'un assistant IA pour la refonte 3D et une partie du code, puis tout relu et testé'
          ] }
        ]
      },
      en: {
        title: 'This portfolio',
        sub: 'A bilingual showcase site with a scroll-driven 3D scene, no framework and no build step.',
        spec: { date: '2025 · redesigned 2026', context: 'Personal project', role: 'Frontend / UI' },
        stack: ['HTML5', 'CSS3', 'JavaScript', 'Three.js', 'GSAP'],
        sections: [
          { t: 'Goal', p: 'Present my projects and background with a site that is fast, readable and easy to maintain.' },
          { t: 'What the site does', l: [
            'A single WebGL scene behind the whole page: screens, databases and API nodes connect as you scroll',
            'One 3D formation per section, without hijacking native scroll',
            'Automatic static version on slow devices, with reduced motion or when a CDN fails',
            'French and English versions, detailed project sheets, keyboard navigation'
          ] },
          { t: 'How I built it', l: [
            'Static files hosted on GitHub Pages, libraries loaded from a CDN with pinned versions',
            'Help from an AI assistant for the 3D redesign and part of the code, then everything reviewed and tested'
          ] }
        ]
      }
    }
  ];
  const ORDER = ['odoo', 'kctech', 'namerakorp', 'amg', 'loxam', 'fifa', 'portfolio', 'annuaire'];
  PROJECTS.sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));

  /* ==========================================================
     2. LANGUE FR / EN
     Chaque élément traduisible porte sa version anglaise dans data-en ;
     la version française est mémorisée au démarrage.
     ========================================================== */
  let lang = 'fr';
  const translatable = $$('[data-en]');
  translatable.forEach(el => { el.dataset.fr = el.innerHTML.trim(); });
  const langButtons = $$('.lang button');
  const fmt = n => n.toLocaleString(lang === 'en' ? 'en-GB' : 'fr-FR');

  function applyLang(next, save) {
    lang = next === 'en' ? 'en' : 'fr';
    translatable.forEach(el => { el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.fr; });
    langButtons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    d.lang = lang;
    $('.sheet-close').setAttribute('aria-label', UI[lang].close);
    $('#viewer').setAttribute('aria-label', UI[lang].viewer);
    $('[data-vclose].viewer-btn').setAttribute('aria-label', UI[lang].vclose);
    $('#viewer-prev').setAttribute('aria-label', UI[lang].vprev); $('#viewer-next').setAttribute('aria-label', UI[lang].vnext);
    splitTitles();
    $$('[data-count]').forEach(el => { if (!el.dataset.running) el.textContent = fmt(+el.dataset.count); });
    if (current !== null) renderSheet(current);
    if (save) { try { localStorage.setItem('lang', lang); } catch (e) { /* stockage indisponible : la langue ne sera pas mémorisée */ } }
  }
  langButtons.forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang, true)));

  /* ==========================================================
     3. TITRES RÉVÉLÉS MOT PAR MOT
     ========================================================== */
  function splitTitles() {
    $$('[data-split]').forEach(el => {
      const words = el.textContent.trim().split(/\s+/);
      el.textContent = '';
      words.forEach((w, i) => {
        const o = document.createElement('span'); o.className = 'w';
        const s = document.createElement('span'); s.style.setProperty('--i', i); s.textContent = w;
        o.append(s); el.append(o); if (i < words.length - 1) el.append(' ');
      });
    });
  }
  splitTitles();

  /* ==========================================================
     4. APPARITIONS AU SCROLL (en cascade dans les grilles)
     ========================================================== */
  ['.profile', '.projects', '.paths'].forEach(sel => {
    const p = $(sel); if (p) $$(':scope > [data-reveal]', p).forEach((el, k) => el.style.setProperty('--d', `${(k % 3) * 0.09}s`));
  });
  const revealables = $$('[data-reveal], [data-split]');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealables.forEach(el => io.observe(el));
  } else revealables.forEach(el => el.classList.add('in'));

  /* ==========================================================
     5. COMPTEURS ANIMÉS (accueil) : uniquement des chiffres de la fiche du stage
     ========================================================== */
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((es, o) => es.forEach(e => {
      if (!e.isIntersecting) return; o.unobserve(e.target);
      const el = e.target, target = +el.dataset.count, t0 = performance.now(), dur = 1700;
      el.dataset.running = '1';
      const tick = now => {
        const k = Math.min(1, (now - t0) / dur), v = 1 - Math.pow(1 - k, 4);
        el.textContent = fmt(Math.round(target * v));
        if (k < 1) requestAnimationFrame(tick); else delete el.dataset.running;
      };
      requestAnimationFrame(tick);
    }), { threshold: 0.6 });
    $$('[data-count]').forEach(el => io.observe(el));
  }

  /* ==========================================================
     6. CARTES : inclinaison 3D + bordure lumineuse qui suit la souris
     ========================================================== */
  if (fine) {
    $$('[data-glow]').forEach(el => el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect(); el.style.setProperty('--mx', `${e.clientX - r.left}px`); el.style.setProperty('--my', `${e.clientY - r.top}px`);
    }));
    if (!reduce) $$('[data-tilt]').forEach(el => {
      const max = 4;
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.classList.add('is-tilting'); el.style.setProperty('--ry', `${(x * max * 2).toFixed(2)}deg`); el.style.setProperty('--rx', `${(-y * max * 2).toFixed(2)}deg`);
      });
      el.addEventListener('pointerleave', () => { el.classList.remove('is-tilting'); el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
    });
  }

  /* ==========================================================
     7. CURSEUR PERSONNALISÉ (souris uniquement, jamais en mouvement réduit)
     ========================================================== */
  const cursor = $('#cursor');
  if (cursor && fine && !reduce) {
    const dot = $('i', cursor), ringEl = $('b', cursor);
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0, shown = false;
    const loop = () => {
      rx += (x - rx) * .18; ry += (y - ry) * .18;
      dot.style.transform = `translate3d(${x}px,${y}px,0)`; ringEl.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = Math.abs(x - rx) + Math.abs(y - ry) > .2 ? requestAnimationFrame(loop) : 0;
    };
    window.addEventListener('pointermove', e => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      x = e.clientX; y = e.clientY;
      if (!shown) { shown = true; rx = x; ry = y; d.classList.add('has-cursor'); }
      const t = e.target && e.target.closest ? e.target : null;
      cursor.classList.toggle('is-link', !!(t && t.closest('a, button, [data-tilt]')));
      cursor.classList.remove('is-out');
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    d.addEventListener('pointerleave', () => cursor.classList.add('is-out'));
  }

  /* ==========================================================
     8. NAVIGATION ET MENU MOBILE
     ========================================================== */
  const nav = $('#nav'), burger = $('#burger'), navBox = $('#nav-links'), progress = $('#progress');
  const navLinks = $$('.nav-links a[href^="#"]');
  const setMenu = open => {
    navBox.classList.toggle('open', open); nav.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? UI[lang].menuClose : UI[lang].menuOpen);
  };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  navLinks.forEach(a => a.addEventListener('click', () => setMenu(false)));

  /* ==========================================================
     9. ÉTAT DU SCROLL : une seule mesure par image
     Calcule la section courante, le mélange entre deux formations 3D
     et la progression dans la section, puis transmet le tout à la scène.
     Le scroll natif n'est jamais bloqué ni détourné.
     ========================================================== */
  const scenes = $$('[data-scene]'), timelines = $$('.timeline');
  let bounds = [], vh = window.innerHeight, lastY = window.scrollY, ticking = false;
  const measure = () => {
    vh = window.innerHeight;
    bounds = scenes.map(s => { const r = s.getBoundingClientRect(); return { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY, f: +s.dataset.scene, id: s.id }; });
    update();
  };
  const update = () => {
    ticking = false;
    const y = window.scrollY, mid = y + vh * .5, max = Math.max(1, d.scrollHeight - vh);
    const vel = y - lastY; lastY = y;
    nav.classList.toggle('scrolled', y > 8);
    progress.style.transform = `scaleX(${clamp(y / max, 0, 1).toFixed(4)})`;

    let i = bounds.findIndex(b => mid >= b.top && mid < b.bottom);
    if (i < 0) i = mid < (bounds[0] ? bounds[0].top : 0) ? 0 : bounds.length - 1;
    const b = bounds[i]; let a = b ? b.f : 0, bb = a, k = 0, p = 0;
    if (b) {
      const win = vh * .45;
      if (i > 0 && mid - b.top < win) { a = bounds[i - 1].f; bb = b.f; k = .5 + .5 * (mid - b.top) / win; }
      else if (i < bounds.length - 1 && b.bottom - mid < win) { a = b.f; bb = bounds[i + 1].f; k = .5 * (1 - (b.bottom - mid) / win); }
      p = clamp((mid - b.top) / Math.max(1, b.bottom - b.top), 0, 1);
      navLinks.forEach(l => { const on = l.getAttribute('href') === '#' + b.id; l.classList.toggle('current', on); if (on) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current'); });
    }

    /* Frises du parcours : la ligne se remplit avec le scroll */
    timelines.forEach(tl => {
      const r = tl.getBoundingClientRect(), f = clamp((vh * .72 - r.top) / Math.max(1, r.height), 0, 1);
      tl.style.setProperty('--fill', f.toFixed(3));
      $$('li', tl).forEach(li => li.classList.toggle('lit', li.getBoundingClientRect().top < vh * .72));
    });

    if (scene3d) scene3d.update({ a, b: bb, k, p, vel, scroll: y });
  };
  const requestUpdate = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', requestUpdate, { passive: true });
  let rt = 0; const remeasure = () => { clearTimeout(rt); rt = setTimeout(measure, 120); };
  window.addEventListener('resize', remeasure); window.addEventListener('load', remeasure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);
  if ('ResizeObserver' in window) new ResizeObserver(remeasure).observe(document.body);
  measure();

  /* ==========================================================
     10. 3D : chargée en différé, jamais bloquante
     ?3d=off force la version statique, ?3d=force impose la 3D.
     ========================================================== */
  const loadScript = (src, ms = 7000) => new Promise((res, rej) => {
    const s = document.createElement('script'); s.src = src; s.async = false; if (/^https:/.test(src)) s.crossOrigin = 'anonymous';
    const t = setTimeout(() => rej(new Error('délai dépassé : ' + src)), ms);
    s.onload = () => { clearTimeout(t); res(); }; s.onerror = () => { clearTimeout(t); rej(new Error('échec : ' + src)); };
    document.head.append(s);
  });
  const drop3d = why => {
    if (scene3d) { try { scene3d.destroy(); } catch (e) { /* déjà détruite */ } scene3d = null; }
    d.classList.remove('want-3d', 'has-3d');
    if (window.console && why) console.info('Portfolio : version statique (' + why + ').');
  };
  const start3d = async () => {
    try {
      const force = params.get('3d') === 'force';
      const batt = navigator.getBattery ? await Promise.race([navigator.getBattery(), new Promise(r => setTimeout(r, 300))]) : null;
      if (batt && !batt.charging && batt.level <= .15 && !force) return drop3d('batterie faible');
      await loadScript('scene.js?v=6');
      if (!window.PortfolioScene) throw new Error('scene.js indisponible');
      const lite = !fine || window.innerWidth < 860;
      scene3d = await window.PortfolioScene.init({ canvas: $('#scene'), lite, force, onFail: drop3d });
      d.classList.add('has-3d'); update();
    } catch (err) { drop3d(err && err.message); }
  };
  if (d.classList.contains('want-3d')) {
    const go = () => ('requestIdleCallback' in window ? requestIdleCallback(start3d, { timeout: 1200 }) : setTimeout(start3d, 200));
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true });
    if (fine) window.addEventListener('pointermove', e => { if (scene3d) scene3d.pointer(e.clientX / window.innerWidth * 2 - 1, e.clientY / window.innerHeight * 2 - 1); }, { passive: true });
    else {
      /* Téléphone : inclinaison de l'appareil (si le navigateur la fournit sans demande), sinon le doigt */
      window.addEventListener('deviceorientation', e => { if (scene3d && e.gamma != null) scene3d.pointer(e.gamma / 28, (e.beta - 45) / 32); }, { passive: true });
      window.addEventListener('touchmove', e => { const t = e.touches[0]; if (scene3d && t) scene3d.pointer(t.clientX / window.innerWidth * 2 - 1, t.clientY / window.innerHeight * 2 - 1); }, { passive: true });
    }
  }

  /* ==========================================================
     11. GSAP + ScrollTrigger : parallaxe (facultatif)
     Si le CDN ne répond pas, le site reste complet, sans parallaxe.
     ========================================================== */
  if (!reduce) {
    const go = () => loadScript(GSAP_URLS[0]).then(() => loadScript(GSAP_URLS[1])).then(() => {
      const gsap = window.gsap, ST = window.ScrollTrigger; if (!gsap || !ST) return;
      gsap.registerPlugin(ST);
      $$('.section-head h2').forEach(el => gsap.fromTo(el, { y: 30 }, { y: -30, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: .8 } }));
      const copy = $('.hero-copy'); if (copy) gsap.to(copy, { y: -70, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 } });
      $$('.project .cover img').forEach(el => gsap.fromTo(el, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: .9 } }));
      window.addEventListener('load', () => ST.refresh(), { once: true });
    }).catch(() => { /* CDN indisponible : pas de parallaxe, rien d'autre ne change */ });
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true });
  }

  /* ==========================================================
     12. FILTRES DES PROJETS
     ========================================================== */
  const filters = $$('.filter'), cards = $$('.project'), filterStatus = $('#filter-status');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    const f = btn.dataset.filter; let n = 0;
    cards.forEach(c => { const show = f === 'all' || c.dataset.category === f; c.classList.toggle('is-out', !show); if (show) { n++; c.classList.add('in'); } });
    filterStatus.textContent = UI[lang].shown(n);
    remeasure();
  }));

  /* ==========================================================
     13. FICHE PROJET : vue détaillée ouverte depuis une carte
     - transition : le panneau part de la carte et s'agrandit (technique FLIP)
     - clavier : Échap ferme, Tab reste dans la fiche, ← → changent de projet
     - l'adresse devient #projet-<id> : une fiche peut être partagée par lien
     ========================================================== */
  const sheet = $('#sheet'), panel = $('.sheet-panel'), body = $('#sheet-body');
  const outside = [$('#nav'), $('main'), $('.footer')];
  let current = null, opener = null, closing = false;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const cardOf = id => $(`.project[data-id="${id}"]`);
  const shotsOf = p => [].concat(p.ba ? [p.ba.before, p.ba.after] : [], p.gallery || []);

  function renderSheet(i) {
    const p = PROJECTS[i], t = p[lang], u = UI[lang];
    const shot = (g, n) => `<button type="button" class="shot" data-shot="${n}" aria-label="${esc(u.zoom)} : ${esc(g[lang])}"><img src="${esc(g.src)}" alt="${esc(g[lang])}" loading="lazy"></button>`;
    let n = 0, html = '';
    html += `<header class="sheet-hero">`;
    html += p.image ? `<div class="cover"><img src="${esc(p.image)}" alt=""></div>` : `<div class="cover cover-gen" aria-hidden="true"><span>${esc(p.gen)}</span></div>`;
    html += `<p class="sheet-status ${p.status}">${esc(p.status === 'done' ? u.done : u.wip)}</p>`;
    html += `<h2 class="sheet-title" id="sheet-title">${esc(t.title)}</h2><p class="sheet-sub">${esc(t.sub)}</p></header>`;
    html += `<dl class="spec"><div><dt>${u.date}</dt><dd>${esc(t.spec.date)}</dd></div><div><dt>${u.context}</dt><dd>${esc(t.spec.context)}</dd></div><div><dt>${u.role}</dt><dd>${esc(t.spec.role)}</dd></div>`;
    (t.extra || []).forEach(x => { html += `<div><dt>${esc(x.k)}</dt><dd>${esc(x.v)}</dd></div>`; });
    html += `</dl><ul class="chips" aria-label="${u.stack}">${t.stack.map(s => `<li>${esc(s)}</li>`).join('')}</ul>`;
    if (p.links.length) html += `<div class="sheet-links">${p.links.map(l => `<a class="btn btn-ghost" href="${esc(l.href)}" target="_blank" rel="noopener noreferrer">${u[l.k]} <span aria-hidden="true">↗</span></a>`).join('')}</div>`;
    if (p.stats) html += `<ul class="stats">${p.stats.map(s => `<li><b>${esc((s.pre || '') + fmt(s.n) + (s.suf || ''))}</b><span>${esc(s[lang])}</span></li>`).join('')}</ul>`;
    t.sections.forEach(s => {
      html += `<section class="block"><h3>${esc(s.t)}</h3>`;
      if (s.p) html += `<p>${esc(s.p)}</p>`;
      if (s.l) html += `<ul class="list">${s.l.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
      if (s.chips) html += `<ul class="chips">${s.chips.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
      if (s.q) html += `<blockquote>${esc(s.q)}</blockquote>`;
      if (s.ba) html += `<div class="ba">${['before', 'after'].map(key => `<figure><b>${u[key]}</b>${shot(p.ba[key], n++)}<figcaption>${esc(p.ba[key][lang])}</figcaption></figure>`).join('')}</div>`;
      if (s.gallery) html += `<div class="gallery">${p.gallery.map(g => `<figure>${shot(g, n++)}<figcaption>${esc(g[lang])}</figcaption></figure>`).join('')}</div>`;
      html += `</section>`;
    });
    body.innerHTML = html; body.scrollTop = 0;
    $('#sheet-count').textContent = `${u.project} ${String(i + 1).padStart(2, '0')} / ${String(PROJECTS.length).padStart(2, '0')}`;
    const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length], next = PROJECTS[(i + 1) % PROJECTS.length];
    $('#sheet-prev-t').textContent = prev[lang].title; $('#sheet-next-t').textContent = next[lang].title;
    $('#sheet-prev').setAttribute('aria-label', `${u.prev} : ${prev[lang].title}`); $('#sheet-next').setAttribute('aria-label', `${u.next} : ${next[lang].title}`);
  }

  /* FLIP : anime le panneau entre le rectangle de la carte et sa place finale */
  function flip(card, reverse) {
    if (reduce || !panel.animate || !card || card.classList.contains('is-out')) return null;
    const from = card.getBoundingClientRect(), to = panel.getBoundingClientRect();
    if (from.bottom < 0 || from.top > window.innerHeight) return null;
    const small = { transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`, opacity: .35 };
    const full = { transform: 'none', opacity: 1 };
    return panel.animate(reverse ? [full, small] : [small, full], { duration: reverse ? 380 : 560, easing: 'cubic-bezier(.2,.8,.2,1)' });
  }
  const setHash = h => { try { history.replaceState(null, '', h || (location.pathname + location.search)); } catch (e) { /* ignoré (ouverture en file://) */ } };

  function openSheet(id, from, fromHash) {
    const i = PROJECTS.findIndex(p => p.id === id); if (i < 0 || closing) return;
    const already = current !== null;
    current = i; renderSheet(i);
    if (!fromHash) setHash('#projet-' + id);
    if (already) { panel.focus(); return; }
    opener = from || $(`a[data-open="${id}"]`);
    setMenu(false);
    sheet.hidden = false; document.body.classList.add('locked');
    outside.forEach(el => { el.inert = true; });
    sheet.classList.add('entering');
    flip(cardOf(id), false);
    requestAnimationFrame(() => { sheet.classList.add('open'); requestAnimationFrame(() => sheet.classList.remove('entering')); });
    panel.focus({ preventScroll: true });
  }
  function closeSheet() {
    if (current === null || closing) return;
    closing = true;
    const id = PROJECTS[current].id, done = () => {
      sheet.hidden = true; closing = false; current = null; body.innerHTML = '';
      document.body.classList.remove('locked');
      outside.forEach(el => { el.inert = false; });
      const back = opener && document.contains(opener) ? opener : $(`a[data-open="${id}"]`);
      if (back) back.focus({ preventScroll: true });
    };
    sheet.classList.remove('open'); setHash('');
    const anim = flip(cardOf(id), true);
    if (anim) { anim.onfinish = done; anim.oncancel = done; } else setTimeout(done, reduce ? 0 : 200);
  }
  const step = dir => { if (current === null) return; const n = (current + dir + PROJECTS.length) % PROJECTS.length; current = n; renderSheet(n); setHash('#projet-' + PROJECTS[n].id); panel.focus(); };

  $$('a[data-open]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); openSheet(a.dataset.open, a); }));
  $$('[data-close]', sheet).forEach(el => el.addEventListener('click', closeSheet));
  $('#sheet-prev').addEventListener('click', () => step(-1));
  $('#sheet-next').addEventListener('click', () => step(1));

  /* ==========================================================
     14. VISIONNEUSE D'IMAGES (captures des fiches)
     ========================================================== */
  const viewer = $('#viewer'), vImg = $('#viewer-img'), vCap = $('#viewer-cap');
  let vList = [], vIdx = 0, vOpener = null;
  const showShot = k => { vIdx = (k + vList.length) % vList.length; const g = vList[vIdx]; vImg.src = g.src; vImg.alt = g[lang]; vCap.textContent = g[lang]; const many = vList.length > 1; $('#viewer-prev').hidden = !many; $('#viewer-next').hidden = !many; };
  const openViewer = (k, from) => { vList = shotsOf(PROJECTS[current]); vOpener = from; viewer.hidden = false; panel.inert = true; showShot(k); $('.viewer-close').focus(); };
  const closeViewer = () => { viewer.hidden = true; panel.inert = false; vImg.removeAttribute('src'); if (vOpener && document.contains(vOpener)) vOpener.focus(); };
  body.addEventListener('click', e => { const b = e.target.closest('.shot'); if (b) openViewer(+b.dataset.shot, b); });
  $$('[data-vclose]', viewer).forEach(el => el.addEventListener('click', closeViewer));
  $('#viewer-prev').addEventListener('click', () => showShot(vIdx - 1));
  $('#viewer-next').addEventListener('click', () => showShot(vIdx + 1));

  /* ==========================================================
     15. CLAVIER : Échap, flèches, et Tab qui reste dans la fenêtre ouverte
     ========================================================== */
  const trap = (root, e) => {
    const f = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', root).filter(el => !el.hidden && el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1], act = document.activeElement;
    if (e.shiftKey && (act === first || !root.contains(act))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && (act === last || !root.contains(act))) { e.preventDefault(); first.focus(); }
  };
  document.addEventListener('keydown', e => {
    if (!viewer.hidden) {
      if (e.key === 'Escape') { e.preventDefault(); closeViewer(); }
      else if (e.key === 'ArrowLeft') showShot(vIdx - 1);
      else if (e.key === 'ArrowRight') showShot(vIdx + 1);
      else if (e.key === 'Tab') trap(viewer, e);
      return;
    }
    if (current !== null) {
      if (e.key === 'Escape') { e.preventDefault(); closeSheet(); }
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'Tab') trap(sheet, e);
      return;
    }
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') { setMenu(false); burger.focus(); }
  });

  /* Ouverture directe par lien (#projet-odoo) */
  const openFromHash = () => { const m = /^#projet-([a-z0-9-]+)$/.exec(location.hash); if (m) openSheet(m[1], null, true); };
  window.addEventListener('hashchange', () => { if (/^#projet-/.test(location.hash)) openFromHash(); else if (current !== null) closeSheet(); });

  /* ==========================================================
     16. COPIER L'ADRESSE E-MAIL
     ========================================================== */
  const copyBtn = $('#copy-mail'), copyStatus = $('#copy-status');
  copyBtn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(MAIL); copyStatus.textContent = UI[lang].copied; }
    catch (err) { const r = document.createRange(); r.selectNodeContents($('#mail')); const s = window.getSelection(); s.removeAllRanges(); s.addRange(r); copyStatus.textContent = UI[lang].copyFail; }
    setTimeout(() => { copyStatus.textContent = ''; }, 3000);
  });

  /* ==========================================================
     17. DÉMARRAGE : langue mémorisée, fiche demandée par l'adresse
     ========================================================== */
  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) { /* stockage indisponible */ }
  if (saved === 'en') applyLang('en', false);
  openFromHash();
})();
