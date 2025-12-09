document.addEventListener('DOMContentLoaded', () => { 

    const cvPathFR = 'images/cv-kamil-fr.pdf';
    const cvPathEN = 'images/cv-kamil-en.pdf';
    
    const cvButtons = document.querySelectorAll('.nav-cv-button');

    // --- TRADUCTIONS PROFESSIONNELLES ---
    const translations = {
        fr: {
            "nav-about": "À Propos",
            "nav-portfolio": "Réalisations", // Plus pro que "Portfolio"
            "nav-education": "Formation",
            "nav-experience": "Expérience",
            "nav-references": "Références",
            "nav-contact": "Contact",
            "nav-cv": "Mon CV",
            
            "hero-title": "Kamil CINAR",
            "hero-subtitle": "Étudiant en Informatique & Développeur Web. J'accompagne les professionnels dans la création de solutions digitales performantes et sur-mesure.",
            
            "about-title": "À Propos de Moi",
            "about-info-title": "Infos & Contact",
            "about-info-age": "1 Mai 2006 (19ans)",
            "about-info-location": "Annecy (74), France",
            "about-info-linkedin": "Kamil CINAR",
            
            "about-hobbies-title": "Passions et Loisirs",
            "about-hobbies-1": "Apprentissage du piano",
            "about-hobbies-2": "Réalisation et montage vidéo",
            "about-hobbies-3": "Veille technologique & Dev",
            "about-hobbies-4": "L'univers de l'automobile",
            "about-hobbies-5": "Pratique du volley-ball",
            
            "about-lang-title": "Langues",
            "about-lang-1a": "Français :", "about-lang-1b": "Natif (C2)",
            "about-lang-2a": "Anglais :", "about-lang-2b": "Technique (B2)",
            "about-lang-3a": "Espagnol :", "about-lang-3b": "Scolaire (A2)",
            "about-lang-4a": "Japonais :", "about-lang-4b": "Notions (A0)", 
            "about-lang-5a": "Turc :", "about-lang-5b": "Bilingue (C2)",
            
            "about-soft-title": "Savoir-être",
            "about-soft-1": "Proactif et orienté solutions",
            "about-soft-2": "Fiable & Responsable",
            "about-soft-3": "Grande capacité d'adaptation",
            "about-soft-4": "Rigueur & Souci du détail",
            
            "about-tech-title": "Compétences Techniques",
            "about-tech-front": "Frontend",
            "about-tech-back": "Backend",
            "about-tech-tools": "Outils & Déploiement",
            "about-tech-seo": "Optimisation SEO",

            "lbl-date": "Date",
            "lbl-context": "Type",
            "lbl-role": "Rôle",
            "lbl-status": "Statut",
            "status-wip": "En ligne",
            "status-done": "Terminé",

            "portfolio-title": "Réalisations",
            "portfolio-intro": "Une sélection de projets démontrant mes capacités techniques et mon expertise en développement.", 
            
            "project1-title": "E-Shop FIFA (Clone)", 
            "project1-desc": "Développement complet d'une boutique en ligne. Architecture robuste et responsive design adapté à tous les écrans.", 
            "project1-code": "Voir le site en direct", 
            
            "project2-title": "Portfolio Professionnel",
            "project2-desc": "Conception de ce site vitrine interactif et multilingue. Optimisé pour la présentation de services et l'expérience utilisateur.", 
            "project2-code": "Voir le Code Source",
            
            "project3-title": "App Gestion ERP (Loxam)",
            "project3-desc": "Création d'un ERP lourd pour la gestion de stocks et location de matériel. Solution logicielle pour l'optimisation des processus.",
            "project3-code": "Voir le Code Source",
            
            "education-title": "Formation",
            "edu1-date": "2024 - 2027 (en cours)",
            "edu1-title": "BUT Informatique - Parcours IAMSI",
            "edu1-location": "Université Savoie Mont-Blanc, Annecy (74)",
            "edu1-desc": "Architecture logicielle, développement Fullstack, gestion de bases de données avancées.",
            "edu2-date": "2024",
            "edu2-title": "Baccalauréat Technologique (STMG)",
            "edu2-location": "Lycée du Granier, La Ravoire (73)",
            "edu2-desc": "Spécialité Systèmes d'Information de Gestion (SIG), Mention Assez Bien.",
            
            "exp-title": "Expérience Professionnelle",
            "exp1-date": "Depuis 11/2025",
            "exp1-title": "Agent d'accueil & Gestion",
            "exp1-location": "Trialp, Secteur SIBRESCA",
            "exp1-desc": "Relation client, gestion des flux, responsabilité de site.",
            "exp2-date": "Avril 2025",
            "exp2-title": "Préparateur de Véhicule",
            "exp2-location": "Jean Lain Occasions, Chambéry (73)",
            "exp2-desc": "Contrôle qualité rigoureux, préparation avant livraison, respect des délais.",
            
            "ref-title": "Références",
            "ref1-name": "Pascal COLIN",
            "ref1-role": "Enseignant UML & SQL",
            "ref2-name": "Luc DAMAS",
            "ref2-role": "Enseignant Web (HTML/JS)",
            
            "contact-title": "Démarrons un projet ensemble",
            "contact-subtitle": "Besoin d'un site web ou d'une solution logicielle ? Discutons de vos besoins.",
            "contact-email": "Me contacter par E-mail"
        },
        en: {
            "nav-about": "About",
            "nav-portfolio": "Projects",
            "nav-education": "Education",
            "nav-experience": "Experience",
            "nav-references": "References",
            "nav-contact": "Contact",
            "nav-cv": "My Resume",
            
            "hero-title": "Kamil CINAR",
            "hero-subtitle": "Computer Science Student & Web Developer. I assist professionals in creating high-performance, tailored digital solutions.",
            
            "about-title": "About Me",
            "about-info-title": "Info & Contact",
            "about-info-age": "May 1, 2006 (19 years old)",
            "about-info-location": "Annecy (74), France",
            "about-info-linkedin": "Kamil CINAR",
            
            "about-hobbies-title": "Passions & Hobbies",
            "about-hobbies-1": "Learning piano",
            "about-hobbies-2": "Video production & editing",
            "about-hobbies-3": "Tech watch & Development",
            "about-hobbies-4": "Automotive enthusiast",
            "about-hobbies-5": "Volleyball player",
            
            "about-lang-title": "Languages",
            "about-lang-1a": "French:", "about-lang-1b": "Native (C2)",
            "about-lang-2a": "English:", "about-lang-2b": "Technical (B2)",
            "about-lang-3a": "Spanish:", "about-lang-3b": "Basic (A2)",
            "about-lang-4a": "Japanese:", "about-lang-4b": "Beginner (A0)",
            "about-lang-5a": "Turkish:", "about-lang-5b": "Bilingual (C2)",
            
            "about-soft-title": "Soft Skills",
            "about-soft-1": "Proactive & Solution-oriented",
            "about-soft-2": "Reliable & Responsible",
            "about-soft-3": "Highly Adaptable",
            "about-soft-4": "Rigor & Attention to detail",
            
            "about-tech-title": "Technical Skills",
            "about-tech-front": "Frontend",
            "about-tech-back": "Backend",
            "about-tech-tools": "Tools & Deployment",
            "about-tech-seo": "SEO Principles",

            "lbl-date": "Date",
            "lbl-context": "Type",
            "lbl-role": "Role",
            "lbl-status": "Status",
            "status-wip": "Live",
            "status-done": "Completed",

            "portfolio-title": "Projects",
            "portfolio-intro": "A selection of projects demonstrating my technical expertise and development capabilities.", 
            
            "project1-title": "FIFA E-Shop (Clone)", 
            "project1-desc": "Full development of an online store. Robust architecture and responsive design adapted to all devices.", 
            "project1-code": "View Live Site", 
            
            "project2-title": "Professional Portfolio",
            "project2-desc": "Design of this interactive and multilingual showcase site. Optimized for service presentation and user experience.", 
            "project2-code": "View Source Code",
            
            "project3-title": "ERP Management App (Loxam)",
            "project3-desc": "Creation of a heavy ERP for stock management and equipment rental. Software solution for process optimization.",
            "project3-code": "View Source Code",
            
            "education-title": "Education",
            "edu1-date": "2024 - 2027 (in progress)",
            "edu1-title": "University Diploma in CS - IAMSI Track",
            "edu1-location": "Université Savoie Mont-Blanc, Annecy (74)",
            "edu1-desc": "Software architecture, Fullstack development, Advanced database management.",
            "edu2-date": "2024",
            "edu2-title": "Technology Baccalaureate (STMG)",
            "edu2-location": "Lycée du Granier, La Ravoire (73)",
            "edu2-desc": "Specialty in Information Systems (SIG), with Honors.",
            
            "exp-title": "Experience",
            "exp1-date": "Since 11/2025",
            "exp1-title": "Site Reception & Management",
            "exp1-location": "Trialp, SIBRESCA Sector",
            "exp1-desc": "Customer relations, flow management, site responsibility.",
            "exp2-date": "April 2025",
            "exp2-title": "Vehicle Preparation Specialist",
            "exp2-location": "Jean Lain Occasions, Chambéry (73)",
            "exp2-desc": "Rigorous quality control, pre-delivery preparation, deadline adherence.",
            
            "ref-title": "References",
            "ref1-name": "Pascal COLIN",
            "ref1-role": "UML & SQL Professor",
            "ref2-name": "Luc DAMAS",
            "ref2-role": "Web Professor (HTML/JS)",
            
            "contact-title": "Let's start a project",
            "contact-subtitle": "Need a website or a software solution? Let's discuss your needs.",
            "contact-email": "Contact me by Email"
        }
    };

    const langButtons = document.querySelectorAll('button[id^="lang-"], .lang-btn-mobile');
    const skillsFr = document.getElementById('skills-content-fr');
    const skillsEn = document.getElementById('skills-content-en');

    const setLanguage = (lang) => {
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        
        cvButtons.forEach(btn => btn.href = (lang === 'en') ? cvPathEN : cvPathFR);

        langButtons.forEach(btn => {
            const langCode = btn.id ? btn.id.split('-')[1] : btn.getAttribute('data-lang');
            if (langCode === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Gestion de l'affichage des compétences
        if (lang === 'en') {
            if(skillsFr) skillsFr.style.display = 'none';
            if(skillsEn) skillsEn.style.display = 'grid';
        } else {
            if(skillsFr) skillsFr.style.display = 'grid';
            if(skillsEn) skillsEn.style.display = 'none';
        }

        // Application des traductions
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                // Utilisation de innerHTML pour permettre les balises comme <strong> si besoin
                element.innerHTML = translations[lang][key];
            }
        });
    };

    langButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.id ? e.target.id.split('-')[1] : e.target.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    const savedLang = localStorage.getItem('language') || 'fr';
    setLanguage(savedLang);

    // --- FILTRES PORTFOLIO ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    // Animation douce lors du filtrage
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- FOND ÉTOILÉ (Version Sobre) ---
    // Nettoyage : Suppression des étoiles filantes pour un aspect plus "Business"
    const canvas = document.getElementById('starfield');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];
        let time = 0; 

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createStaticStars = () => {
            stars = []; 
            // Réduction du nombre d'étoiles pour alléger le visuel
            const starCount = 150; 
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.2 + 0.3, // Etoiles plus fines
                    baseOpacity: Math.random() * 0.4 + 0.1, 
                    twinkleSpeed: Math.random() * 0.01 + 0.002 // Scintillement très lent
                });
            }
        };

        const drawStaticStars = () => {
            stars.forEach(star => {
                // Scintillement subtil
                const opacity = star.baseOpacity + Math.sin(time * star.twinkleSpeed) * 0.1;
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        const animate = () => {
            time++; 
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
            drawStaticStars();    
            requestAnimationFrame(animate); 
        };
        
        setCanvasSize();
        createStaticStars();
        animate();
   
        window.addEventListener('resize', () => {
            setCanvasSize();
            createStaticStars(); 
        });
    }

    // --- ANIMATION AU SCROLL (Observer) ---
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    elementsToAnimate.forEach(element => observer.observe(element));

    // --- MENU ACTIF AU SCROLL ---
    const sections = document.querySelectorAll('section'); 
    const navLinks = document.querySelectorAll('.nav-menu a');

    const onScroll = () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150; 
            const sectionId = current.getAttribute('id');
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-menu a[href='#${sectionId}']`);
                navLinks.forEach(link => link.classList.remove('active'));
                if (activeLink) activeLink.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', onScroll);
    
    // --- MENU MOBILE ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.mobile-nav');
    const navLinksMobile = document.querySelectorAll('.mobile-nav .nav-link');

    if (navToggle && navMenu) {
        const toggleMenu = () => {
            navToggle.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
            document.body.style.overflow = navMenu.classList.contains('is-active') ? 'hidden' : ''; 
        };
        navToggle.addEventListener('click', toggleMenu);
        
        navLinksMobile.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('is-active')) {
                    toggleMenu();
                }
            });
        });
    }

    // Nettoyage: Suppression de l'effet "Cursor Halo" (Cercle autour de la souris)
    // Code supprimé pour un rendu plus professionnel/sobre.
});
