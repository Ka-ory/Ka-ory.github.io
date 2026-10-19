(() => {
    'use strict';
    const doc = document.documentElement;
    doc.classList.add('js');

    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    /* ==========================================================
       1. DONNÉES DES FICHES PROJETS (FR / EN)
       ========================================================== */
    const UI = {
        fr: { date: 'Date', context: 'Contexte', role: 'Rôle', status: 'Statut', stack: 'Stack', close: 'Fermer la fiche',
              done: 'Terminé', wip: 'En cours', prev: 'Précédent', next: 'Suivant', code: 'Voir le code', site: 'Voir le site',
              before: 'Avant', after: 'Après', gradeLbl: 'stage + soutenance', zoom: 'Agrandir l\'image', copied: 'Adresse copiée', copyFail: 'Copie impossible, sélectionnez l\'adresse à la main.', cv: 'images/cv-kamil-fr.pdf' },
        en: { date: 'Date', context: 'Context', role: 'Role', status: 'Status', stack: 'Stack', close: 'Close the sheet',
              done: 'Completed', wip: 'In progress', prev: 'Previous', next: 'Next', code: 'View code', site: 'View site',
              before: 'Before', after: 'After', gradeLbl: 'internship + defence', zoom: 'Enlarge the image', copied: 'Address copied', copyFail: 'Copy failed, select the address manually.', cv: 'images/cv-kamil-en.pdf' }
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
                sub: 'La micro-entreprise que j\'ai lancée en septembre 2026 à Annecy : intégration Odoo, facture électronique et développement web pour les TPE et PME de Savoie et Haute-Savoie.',
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
                sub: 'The micro-business I launched in September 2026 in Annecy: Odoo integration, e-invoicing and web development for small businesses in Savoie and Haute-Savoie.',
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
            id: 'loxam', image: 'images/loxam.png', status: 'done',
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
            id: 'fifa', image: 'images/fifa.png', status: 'wip',
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
            id: 'portfolio', image: 'images/portfolio.png', status: 'done',
            links: [{ k: 'code', href: 'https://github.com/Ka-ory/Ka-ory.github.io' }],
            fr: {
                title: 'Ce portfolio',
                sub: 'Un site vitrine bilingue, réalisé sans framework.',
                spec: { date: '2025', context: 'Projet personnel', role: 'Frontend / UI' },
                stack: ['HTML5', 'CSS3', 'JavaScript'],
                sections: [
                    { t: 'Objectif', p: 'Présenter mes projets et mon parcours avec un site rapide, lisible et facile à maintenir.' },
                    { t: 'Ce que j\'ai fait', l: [
                        'Design et intégration complets, sans framework',
                        'Version française et anglaise',
                        'Fiches projets détaillées, animations et menu mobile'
                    ] }
                ]
            },
            en: {
                title: 'This portfolio',
                sub: 'A bilingual showcase site built without any framework.',
                spec: { date: '2025', context: 'Personal project', role: 'Frontend / UI' },
                stack: ['HTML5', 'CSS3', 'JavaScript'],
                sections: [
                    { t: 'Goal', p: 'Present my projects and background with a site that is fast, readable and easy to maintain.' },
                    { t: 'What I did', l: [
                        'Full design and front-end build, no framework',
                        'French and English versions',
                        'Detailed project sheets, animations and mobile menu'
                    ] }
                ]
            }
        }
    ];
    const ORDER = ['odoo', 'kctech', 'namerakorp', 'amg', 'loxam', 'fifa', 'portfolio', 'annuaire'];
    PROJECTS.sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));

    /* ==========================================================
       2. LANGUE FR / EN
       ========================================================== */
    let lang = 'fr';
    const translatable = $$('[data-en]');
    translatable.forEach(el => { el.dataset.fr = el.innerHTML.trim(); });
    const langButtons = $$('.lang button');

    function applyLang(next) {
        lang = next;
        translatable.forEach(el => { el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.fr; });
        langButtons.forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
        doc.lang = lang;
        $$('.cv-link').forEach(a => { a.href = UI[lang].cv; });
        $('.sheet-close').setAttribute('aria-label', UI[lang].close);
        splitTitles();
        if (spineLen) buildSpine();
        if (current !== null) renderSheet(current, false);
        try { localStorage.setItem('lang', lang); } catch (e) { /* stockage indisponible */ }
    }
    langButtons.forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));

    /* ==========================================================
       3. NAVIGATION, PROGRESSION, MENU MOBILE
       ========================================================== */
    const nav = $('#nav');
    const progress = $('#progress');
    const burger = $('#burger');
    const navLinks = $('#nav-links');
    let ticking = false;

    function onScroll() {
        const y = window.scrollY;
        nav.classList.toggle('scrolled', y > 12);
        const max = doc.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
        updateTimelines();
        updateSpine();
        ticking = false;
    }
    window.addEventListener('scroll', () => {
        if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });

    function setMenu(open) {
        navLinks.classList.toggle('open', open);
        nav.classList.toggle('menu-open', open);
        burger.setAttribute('aria-expanded', String(open));
        if (!sheetOpen) document.body.classList.toggle('locked', open);
    }
    burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
    $$('a', navLinks).forEach(a => a.addEventListener('click', () => setMenu(false)));

    const sections = $$('main > section[id]');
    const links = $$('.nav-links a[href^="#"]');
    const spy = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) links.forEach(l => l.classList.toggle('current', l.getAttribute('href') === '#' + e.target.id));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));

    /* ==========================================================
       4. APPARITION AU SCROLL (par cascade dans les grilles)
       ========================================================== */
    const reveals = $$('.reveal');
    ['.bento', '.projects', '.refs', '.skills-grid', '.paths'].forEach(sel => {
        const parent = $(sel);
        if (parent) $$('.reveal', parent).forEach((el, i) => el.style.setProperty('--d', `${(i % 3) * 0.08}s`));
    });
    if ('IntersectionObserver' in window && !reduceMotion) {
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                e.target.classList.add('in');
                const eb = e.target.matches('.section-head') ? $('.eyebrow', e.target) : null;
                if (eb) scramble(eb);
                obs.unobserve(e.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
        reveals.forEach(el => io.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('in'));
    }

    /* ==========================================================
       5. LUMIÈRE QUI SUIT LA SOURIS SUR LES CARTES
       ========================================================== */
    if (finePointer) {
        $$('.tile, .project').forEach(card => {
            card.addEventListener('pointermove', e => {
                const r = card.getBoundingClientRect();
                card.style.setProperty('--mx', `${e.clientX - r.left}px`);
                card.style.setProperty('--my', `${e.clientY - r.top}px`);
            });
        });
    }

    /* ==========================================================
       6. FILTRES DES PROJETS
       ========================================================== */
    const filters = $$('.filter');
    const cards = $$('.project');
    filters.forEach(btn => btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.toggle('on', b === btn));
        const f = btn.dataset.filter;
        cards.forEach(c => {
            const show = f === 'all' || c.dataset.category === f;
            c.classList.toggle('is-out', !show);
            if (show && !reduceMotion) {
                c.classList.add('in');
                c.style.animation = 'none'; void c.offsetWidth; c.style.animation = '';
            }
        });
    }));

    /* ==========================================================
       7. FRISE : LA LIGNE SE REMPLIT AVEC LE SCROLL
       ========================================================== */
    const timelines = $$('.timeline');
    function updateTimelines() {
        const vh = window.innerHeight;
        timelines.forEach(tl => {
            const r = tl.getBoundingClientRect();
            const fill = Math.max(0, Math.min(1, (vh * 0.7 - r.top) / r.height));
            tl.style.setProperty('--fill', fill.toFixed(3));
            $$('li', tl).forEach(li => {
                const lr = li.getBoundingClientRect();
                li.classList.toggle('lit', lr.top < vh * 0.7);
            });
        });
    }

    /* ==========================================================
       8. FOND INTERACTIF DU HERO (grille de points)
       ========================================================== */
    const canvas = $('#grid');
    const ctx = canvas.getContext('2d');
    const hero = $('.hero');
    let cw = 0, ch = 0, dpr = 1, pointer = { x: -999, y: -999 }, running = false, raf = 0;
    const GAP = 30, RADIUS = 150;
    const deckEl = $('#deck');

    function sizeCanvas() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        cw = hero.clientWidth; ch = hero.clientHeight;
        canvas.width = cw * dpr; canvas.height = ch * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function drawGrid(t) {
        ctx.clearRect(0, 0, cw, ch);
        for (let y = GAP / 2; y < ch; y += GAP) {
            for (let x = GAP / 2; x < cw; x += GAP) {
                const dx = x - pointer.x, dy = y - pointer.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                const k = d < RADIUS ? 1 - d / RADIUS : 0;
                const wave = reduceMotion ? 0 : (Math.sin((x * 0.012) + t * 0.0008) + Math.sin((y * 0.014) - t * 0.0006)) * 0.5;
                const alpha = 0.10 + wave * 0.04 + k * 0.45;
                const r = 1 + k * 1.1;
                const push = k * 6;
                const ox = d > 0 ? (dx / d) * push : 0, oy = d > 0 ? (dy / d) * push : 0;
                ctx.fillStyle = `rgba(143,198,233,${Math.max(0.04, alpha).toFixed(3)})`;
                ctx.beginPath(); ctx.arc(x + ox, y + oy, r, 0, 6.2832); ctx.fill();
            }
        }
    }
    function loop(t) { drawGrid(t); if (running) raf = requestAnimationFrame(loop); }
    function start() { if (!running && !reduceMotion) { running = true; raf = requestAnimationFrame(loop); } }
    function stop() { running = false; cancelAnimationFrame(raf); }

    sizeCanvas(); drawGrid(0);
    window.addEventListener('resize', () => { sizeCanvas(); drawGrid(0); });
    if (!reduceMotion) {
        hero.addEventListener('pointermove', e => {
            const r = hero.getBoundingClientRect();
            pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top;
            if (finePointer) {
                const nx = (e.clientX / window.innerWidth - 0.5) * 2, ny = (e.clientY / window.innerHeight - 0.5) * 2;
                deckEl.style.setProperty('--px', `${(-nx * 10).toFixed(1)}px`);
                deckEl.style.setProperty('--py', `${(-ny * 8).toFixed(1)}px`);
            }
        });
        hero.addEventListener('pointerleave', () => { pointer.x = pointer.y = -999; });
        new IntersectionObserver(es => es.forEach(e => (e.isIntersecting ? start() : stop())), { threshold: 0 }).observe(hero);
        document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    }

    /* ==========================================================
       9. FICHE PROJET (panneau latéral)
       ========================================================== */
    const sheet = $('#sheet');
    const panel = $('.sheet-panel', sheet);
    const body = $('#sheet-body');
    let current = null, sheetOpen = false, lastFocus = null;

    const idx = id => PROJECTS.findIndex(p => p.id === id);
    const pad = n => String(n).padStart(2, '0');

    let gallerySet = [];
    function renderSheet(i, resetScroll = true) {
        const p = PROJECTS[i], t = p[lang], ui = UI[lang];
        const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
        const next = PROJECTS[(i + 1) % PROJECTS.length];
        let n = 0;
        const st = () => `style="--i:${n++}"`;
        const grade = p.grade ? `<span class="grade"><b>${p.grade}</b>/20<small>${ui.gradeLbl}</small></span>` : '';
        const heroHtml = p.image
            ? `<div class="sheet-hero"><img src="${p.image}" alt="">${grade}</div>`
            : `<div class="sheet-hero gen"><span>${p.gen}</span></div>`;
        gallerySet = [];
        const stats = p.stats ? `<div class="stats" ${st()}>${p.stats.map(x => `<div class="stat"><b>${x.pre ? `<i>${x.pre}</i>` : ''}<span class="count" data-n="${x.n}">${x.n.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US')}</span>${x.suf ? `<em>${x.suf}</em>` : ''}</b><span>${x[lang]}</span></div>`).join('')}</div>` : '';
        const sections = t.sections.map(s => {
            let inner = '';
            if (s.ba && p.ba) {
                const bIdx = gallerySet.push({ src: p.ba.before.src, cap: p.ba.before[lang] }) - 1;
                gallerySet.push({ src: p.ba.after.src, cap: p.ba.after[lang] });
                inner += `<div class="ba-switch" role="group"><button type="button" class="on" data-ba="before">${ui.before}</button><button type="button" data-ba="after">${ui.after}</button></div>
                    <div class="ba-stage" data-zoom="${bIdx}" role="button" tabindex="0" aria-label="${ui.zoom}"><img class="on" data-ba-img="before" src="${p.ba.before.src}" alt="${p.ba.before[lang]}"><img data-ba-img="after" src="${p.ba.after.src}" alt="${p.ba.after[lang]}"></div>
                    <p class="ba-cap" id="ba-cap">${p.ba.before[lang]}</p>`;
            }
            if (s.gallery && p.gallery) {
                inner += `<div class="gallery">${p.gallery.map(g => {
                    const k = gallerySet.push({ src: g.src, cap: g[lang] }) - 1;
                    return `<button type="button" data-zoom="${k}" aria-label="${ui.zoom} : ${g[lang]}"><span class="g-img"><img src="${g.src}" alt="" loading="lazy"></span><span class="g-cap">${g[lang]}</span></button>`;
                }).join('')}</div>`;
            }
            if (s.p) inner += `<p>${s.p}</p>`;
            if (s.q) inner += `<p class="sheet-quote">${s.q}</p>`;
            if (s.l) inner += `<ul class="plain">${s.l.map(x => `<li>${x}</li>`).join('')}</ul>`;
            if (s.chips) inner += `<ul class="chips">${s.chips.map(x => `<li>${x}</li>`).join('')}</ul>`;
            return `<section class="sheet-sec" ${st()}><h3>${s.t}</h3>${inner}</section>`;
        }).join('');
        const links = p.links.length
            ? `<div class="sheet-links" ${st()}>${p.links.map((l, k) => `<a class="btn ${k === 0 ? 'btn-primary' : 'btn-ghost'}" href="${l.href}" target="_blank" rel="noopener noreferrer">${ui[l.k]} ↗</a>`).join('')}</div>`
            : '';
        const extra = (t.extra || []).map(x => `<div class="hl"><dt>${x.k}</dt><dd>${x.v}</dd></div>`).join('');
        body.innerHTML = `
            ${heroHtml}
            <div class="sheet-content">
                <header ${st()}>
                    <h2 class="sheet-title" id="sheet-title">${t.title}</h2>
                    <p class="sheet-sub">${t.sub}</p>
                </header>
                <dl class="spec" ${st()}>
                    <div><dt>${ui.date}</dt><dd>${t.spec.date}</dd></div>
                    <div><dt>${ui.context}</dt><dd>${t.spec.context}</dd></div>
                    <div><dt>${ui.role}</dt><dd>${t.spec.role}</dd></div>
                    <div><dt>${ui.status}</dt><dd><span class="dot ${p.status === 'wip' ? 'wip' : ''}"></span>${p.status === 'wip' ? ui.wip : ui.done}</dd></div>
                    ${extra}
                </dl>
                ${stats}
                ${sections}
                <section class="sheet-sec" ${st()}><h3>${ui.stack}</h3><ul class="chips">${t.stack.map(x => `<li>${x}</li>`).join('')}</ul></section>
                ${links}
            </div>`;
        $('#sheet-count').innerHTML = `<b>${pad(i + 1)}</b> / ${pad(PROJECTS.length)}`;
        $('#sheet-prev-t').textContent = prev[lang].title;
        $('#sheet-next-t').textContent = next[lang].title;
        $('#sheet-prev').setAttribute('aria-label', `${ui.prev} : ${prev[lang].title}`);
        $('#sheet-next').setAttribute('aria-label', `${ui.next} : ${next[lang].title}`);
        if (resetScroll) {
            $('.sheet-scroll', sheet).scrollTop = 0;
            runCounters(600);
        } else {
            $$('.sheet-content > *', sheet).forEach(el => { el.style.animation = 'none'; el.style.opacity = '1'; el.style.transform = 'none'; });
        }
    }

    function runCounters(delay) {
        if (reduceMotion) return;
        const els = $$('.count', body);
        const loc = lang === 'fr' ? 'fr-FR' : 'en-US';
        els.forEach(el => { el.textContent = '0'; });
        setTimeout(() => {
            const t0 = performance.now(), dur = 1400;
            const tick = now => {
                const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
                els.forEach(el => { el.textContent = Math.round(+el.dataset.n * e).toLocaleString(loc); });
                if (k < 1 && sheetOpen) requestAnimationFrame(tick);
                else els.forEach(el => { el.textContent = (+el.dataset.n).toLocaleString(loc); });
            };
            requestAnimationFrame(tick);
        }, delay);
    }

    function setBA(which) {
        $$('[data-ba]', body).forEach(b => b.classList.toggle('on', b.dataset.ba === which));
        $$('[data-ba-img]', body).forEach(im => im.classList.toggle('on', im.dataset.baImg === which));
        const p = PROJECTS[current];
        const cap = $('#ba-cap', body);
        if (cap && p.ba) cap.textContent = p.ba[which][lang];
        const stage = $('.ba-stage', body);
        if (stage) stage.dataset.zoom = String(which === 'before' ? 0 : 1);
    }

    function openSheet(id, fromHash) {
        const i = idx(id);
        if (i < 0) return;
        if (!sheetOpen) lastFocus = document.activeElement;
        current = i;
        renderSheet(i);
        sheetOpen = true;
        sheet.classList.add('open');
        sheet.setAttribute('aria-hidden', 'false');
        document.body.classList.add('locked');
        if (!fromHash) { try { history.replaceState(null, '', '#projet-' + id); } catch (e) { /* ignoré */ } }
        setTimeout(() => panel.focus({ preventScroll: true }), 50);
    }
    function closeSheet() {
        if (!sheetOpen) return;
        sheetOpen = false; current = null;
        sheet.classList.remove('open');
        sheet.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('locked');
        try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* ignoré */ }
        if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
    function step(dir) {
        if (current === null) return;
        const next = (current + dir + PROJECTS.length) % PROJECTS.length;
        current = next;
        renderSheet(next);
        try { history.replaceState(null, '', '#projet-' + PROJECTS[next].id); } catch (e) { /* ignoré */ }
    }

    document.addEventListener('click', e => {
        const back = e.target.closest('.deck-card.is-back');
        if (back) { e.preventDefault(); showDeck(+back.dataset.deck, true); return; }
        const tab = e.target.closest('.deck-tab');
        if (tab) { showDeck(+tab.dataset.to, true); return; }
        const ba = e.target.closest('[data-ba]');
        if (ba) { setBA(ba.dataset.ba); return; }
        const zoom = e.target.closest('[data-zoom]');
        if (zoom) { openViewer(+zoom.dataset.zoom); return; }
        if (e.target.closest('[data-vclose]')) { closeViewer(); return; }
        const opener = e.target.closest('[data-open]');
        if (opener) { e.preventDefault(); openSheet(opener.dataset.open); return; }
        if (e.target.closest('[data-close]')) closeSheet();
        // clic sur toute la carte projet
        const card = e.target.closest('.project');
        if (card && !e.target.closest('a')) openSheet(card.dataset.id);
    });
    $('#sheet-prev').addEventListener('click', () => step(-1));
    $('#sheet-next').addEventListener('click', () => step(1));
    document.addEventListener('keydown', e => {
        if (viewerOpen) {
            if (e.key === 'Escape') closeViewer();
            if (e.key === 'ArrowRight') stepViewer(1);
            if (e.key === 'ArrowLeft') stepViewer(-1);
            return;
        }
        if (e.key === 'Enter' && e.target.matches && e.target.matches('.ba-stage')) { openViewer(+e.target.dataset.zoom); return; }
        if (!sheetOpen) { if (e.key === 'Escape') setMenu(false); return; }
        if (e.key === 'Escape') closeSheet();
        if (e.key === 'ArrowRight') step(1);
        if (e.key === 'ArrowLeft') step(-1);
        if (e.key === 'Tab') {
            const f = $$('a[href], button', panel).filter(el => el.offsetParent !== null);
            if (!f.length) return;
            const first = f[0], last = f[f.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    });

    // Lien direct vers une fiche : #projet-odoo
    function openFromHash() {
        const m = /^#projet-([a-z0-9-]+)$/.exec(location.hash);
        if (m && idx(m[1]) >= 0) openSheet(m[1], true);
    }
    window.addEventListener('hashchange', () => { if (/^#projet-/.test(location.hash)) openFromHash(); else if (sheetOpen) closeSheet(); });

    /* ==========================================================
       10. COPIE DE L'ADRESSE E-MAIL
       ========================================================== */
    const toast = document.createElement('div');
    toast.className = 'toast'; toast.setAttribute('role', 'status');
    document.body.appendChild(toast);
    let toastTimer;
    function showToast(msg) {
        toast.textContent = msg; toast.classList.add('show');
        clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
    }
    $('#copy-mail').addEventListener('click', async () => {
        const addr = $('#mail').textContent.replace('→', '').trim();
        try { await navigator.clipboard.writeText(addr); showToast(UI[lang].copied); }
        catch (e) {
            const range = document.createRange(); range.selectNodeContents($('#mail'));
            const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
            showToast(UI[lang].copyFail);
        }
    });

    /* ==========================================================
       11. VISIONNEUSE D'IMAGES
       ========================================================== */
    const viewer = $('#viewer'), vImg = $('#viewer-img'), vCap = $('#viewer-cap');
    let viewerOpen = false, vIdx = 0;
    function showV(animate) {
        const g = gallerySet[vIdx];
        if (!g) return;
        vImg.src = g.src; vImg.alt = g.cap; vCap.textContent = g.cap;
        const multi = gallerySet.length > 1;
        $('#viewer-prev').hidden = !multi; $('#viewer-next').hidden = !multi;
        if (animate && !reduceMotion && vImg.animate) vImg.animate([{ opacity: 0, transform: 'scale(.98)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.2,.7,.1,1)' });
    }
    function openViewer(i) {
        if (!gallerySet.length) return;
        vIdx = Math.max(0, Math.min(gallerySet.length - 1, i));
        showV(false);
        viewerOpen = true;
        viewer.classList.add('open'); viewer.setAttribute('aria-hidden', 'false');
        setTimeout(() => $('.viewer-close').focus({ preventScroll: true }), 50);
    }
    function closeViewer() {
        if (!viewerOpen) return;
        viewerOpen = false;
        viewer.classList.remove('open'); viewer.setAttribute('aria-hidden', 'true');
        panel.focus({ preventScroll: true });
    }
    function stepViewer(d) { vIdx = (vIdx + d + gallerySet.length) % gallerySet.length; showV(true); }
    $('#viewer-prev').addEventListener('click', () => stepViewer(-1));
    $('#viewer-next').addEventListener('click', () => stepViewer(1));

    /* ==========================================================
       12. DECK DES PROJETS PHARES (permutation automatique)
       ========================================================== */
    const deckCards = $$('.deck-card'), deckTabs = $$('.deck-tab');
    let deckIdx = 0;
    function showDeck(i) {
        deckIdx = i;
        deckCards.forEach(c => {
            const front = +c.dataset.deck === i;
            c.classList.toggle('is-front', front);
            c.classList.toggle('is-back', !front);
            c.tabIndex = 0;
        });
        deckTabs.forEach(t => {
            const on = +t.dataset.to === i;
            t.classList.toggle('on', on);
            const bar = $('b', t);
            bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = '';
        });
    }
    if (!reduceMotion) {
        deckEl.classList.add('auto');
        deckTabs.forEach(t => $('b', t).addEventListener('animationend', () => {
            if (t.classList.contains('on')) showDeck((deckIdx + 1) % deckCards.length);
        }));
        deckEl.addEventListener('pointerenter', () => deckEl.classList.add('paused'));
        deckEl.addEventListener('pointerleave', () => deckEl.classList.remove('paused'));
        deckEl.addEventListener('focusin', () => deckEl.classList.add('paused'));
        deckEl.addEventListener('focusout', () => deckEl.classList.remove('paused'));
    }

    /* ==========================================================
       13. FIL DIRECTEUR (se dessine avec le scroll)
       ========================================================== */
    const page = $('#page'), spineSvg = $('#spine-svg'), track = $('#spine-track'), fillPath = $('#spine-fill');
    const head = $('#spine-head'), halo = $('#spine-halo'), nodesWrap = $('#spine-nodes');
    let spineLen = 0, samples = [], nodeData = [];

    function buildSpine() {
        const pr = page.getBoundingClientRect();
        const pageTop = pr.top + window.scrollY;
        const wrap = $('#profil .wrap');
        const contentLeft = wrap.getBoundingClientRect().left + parseFloat(getComputedStyle(wrap).paddingLeft) - pr.left;
        const X = contentLeft > 80 ? contentLeft - 36 : Math.max(7, contentLeft / 2);
        const A = Math.max(3, Math.min(24, X - 6));
        $('#spine').classList.toggle('no-labels', X < 170);
        const heads = $$('.section-head', page);
        const ys = heads.map(h => {
            const e = $('.eyebrow', h) || h;
            const r = e.getBoundingClientRect();
            return r.top + window.scrollY - pageTop + r.height / 2;
        });
        const y0 = $('#profil').getBoundingClientRect().top + window.scrollY - pageTop + 16;
        let d = `M ${X} ${y0.toFixed(1)}`, prev = y0, side = 1;
        ys.forEach(y => {
            const h = y - prev;
            d += ` C ${X + side * A} ${(prev + h * 0.3).toFixed(1)} ${X + side * A} ${(prev + h * 0.7).toFixed(1)} ${X} ${y.toFixed(1)}`;
            prev = y; side = -side;
        });
        spineSvg.setAttribute('width', String(Math.ceil(X + A + 30)));
        spineSvg.setAttribute('height', String(Math.ceil(page.scrollHeight)));
        track.setAttribute('d', d); fillPath.setAttribute('d', d);
        const grad = $('#spine-grad');
        grad.setAttribute('y1', String(y0)); grad.setAttribute('y2', String(prev));
        spineLen = track.getTotalLength();
        fillPath.style.strokeDasharray = `${spineLen} ${spineLen}`;
        samples = [];
        const N = 400;
        for (let k = 0; k <= N; k++) { const L = (k / N) * spineLen; samples.push([L, track.getPointAtLength(L).y]); }
        nodesWrap.innerHTML = '';
        nodeData = ys.map((y, i) => {
            const node = document.createElement('span'); node.className = 'spine-node';
            node.style.left = `${X}px`; node.style.top = `${y}px`;
            const label = document.createElement('span'); label.className = 'spine-label';
            label.style.left = `${X}px`; label.style.top = `${y}px`;
            label.textContent = ($('.eyebrow', heads[i]) || heads[i]).textContent.trim();
            nodesWrap.append(node, label);
            return { y, node, label };
        });
        updateSpine();
    }
    function updateSpine() {
        if (!spineLen) return;
        const pageTop = page.getBoundingClientRect().top + window.scrollY;
        const target = window.scrollY + window.innerHeight * 0.55 - pageTop;
        let L = 0;
        if (target >= samples[samples.length - 1][1]) L = spineLen;
        else if (target > samples[0][1]) {
            for (let k = 1; k < samples.length; k++) {
                if (samples[k][1] >= target) {
                    const [l0, y0] = samples[k - 1], [l1, y1] = samples[k];
                    L = l0 + (l1 - l0) * ((target - y0) / Math.max(0.001, y1 - y0));
                    break;
                }
            }
        }
        fillPath.style.strokeDashoffset = String(spineLen - L);
        const pt = track.getPointAtLength(L);
        const vis = L > 1 ? '1' : '0';
        head.setAttribute('cx', pt.x); head.setAttribute('cy', pt.y); head.style.opacity = vis;
        halo.setAttribute('cx', pt.x); halo.setAttribute('cy', pt.y); halo.style.opacity = vis;
        nodeData.forEach(n => { const lit = n.y <= target + 2; n.node.classList.toggle('lit', lit); n.label.classList.toggle('lit', lit); });
    }
    let spineTimer;
    const rebuild = () => { clearTimeout(spineTimer); spineTimer = setTimeout(buildSpine, 120); };
    window.addEventListener('resize', rebuild);
    if ('ResizeObserver' in window) new ResizeObserver(rebuild).observe(page);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(rebuild);
    window.addEventListener('load', rebuild);

    /* ==========================================================
       14. TEXTE : TITRES EN MOTS, SURTITRES « DÉCODÉS »
       ========================================================== */
    const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    function splitTitles() {
        $$('.section-head h2').forEach(h => {
            const words = h.textContent.trim().split(/\s+/);
            h.innerHTML = words.map((w, i) => `<span class="w"><span style="--wi:${i}">${esc(w)}</span></span>`).join(' ');
        });
    }
    const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_';
    function scramble(el) {
        if (reduceMotion) return;
        const final = el.textContent, startLang = lang, t0 = performance.now(), dur = 750;
        const step = now => {
            if (lang !== startLang) return;
            const k = Math.min(1, (now - t0) / dur), n = Math.floor(final.length * k);
            let out = final.slice(0, n);
            for (let i = n; i < final.length; i++) out += final[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0];
            el.textContent = out;
            if (k < 1) requestAnimationFrame(step); else el.textContent = final;
        };
        requestAnimationFrame(step);
    }

    /* ==========================================================
       15. BOUTONS MAGNÉTIQUES
       ========================================================== */
    if (finePointer && !reduceMotion) {
        $$('.hero .btn, .contact .btn, .mail').forEach(el => {
            el.addEventListener('pointermove', e => {
                const r = el.getBoundingClientRect();
                const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
                el.style.translate = `${(dx * 0.16).toFixed(1)}px ${(dy * 0.28).toFixed(1)}px`;
            });
            el.addEventListener('pointerleave', () => { el.style.translate = ''; });
        });
    }

    /* ==========================================================
       16. DÉMARRAGE
       ========================================================== */
    let saved = null;
    try { saved = localStorage.getItem('lang'); } catch (e) { /* stockage indisponible */ }
    splitTitles();
    showDeck(0);
    if (saved === 'en') applyLang('en');
    buildSpine();
    onScroll();
    openFromHash();
})();
