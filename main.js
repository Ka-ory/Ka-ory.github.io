document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. STARFIELD INFINITY (FOND ÉTOILÉ 3D)
       ========================================= */
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let stars = [];
    // Vitesse et nombre d'étoiles
    const starCount = 800; 
    const speed = 0.5;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    class Star {
        constructor() {
            this.x = Math.random() * width - width / 2;
            this.y = Math.random() * height - height / 2;
            this.z = Math.random() * width; // Profondeur
        }
        
        update() {
            this.z -= speed * 5; // Les étoiles viennent vers nous
            if (this.z <= 0) {
                this.z = width;
                this.x = Math.random() * width - width / 2;
                this.y = Math.random() * height - height / 2;
            }
        }
        
        draw() {
            let x = (this.x / this.z) * width + width / 2;
            let y = (this.y / this.z) * width + height / 2;
            let radius = (1 - this.z / width) * 2; // Plus c'est proche, plus c'est gros

            if (x < 0 || x > width || y < 0 || y > height) return;

            ctx.beginPath();
            ctx.fillStyle = "rgba(255, 255, 255, " + (1 - this.z / width) + ")";
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialisation des étoiles
    for (let i = 0; i < starCount; i++) stars.push(new Star());

    function animateStars() {
        // Effet de traînée légère (Motion Blur)
        ctx.fillStyle = "rgba(5, 5, 7, 0.4)"; 
        ctx.fillRect(0, 0, width, height);
        
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animateStars);
    }
    animateStars();


    /* =========================================
       2. EFFET TILT 3D (HOLOGRAPHIQUE)
       ========================================= */
    const cards = document.querySelectorAll('.project-card, .about-info-card, .skill-category-card, .reference-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Position de la souris relative à la carte
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calcul de la rotation (Centre de la carte = 0deg)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / 10) * -1; // Inverse l'axe X pour effet naturel
            const rotateY = (x - centerX) / 10;

            card.style.transform = `perspective(1000px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Effet de lumière dynamique (reflet)
            // On peut ajouter un gradient overlay ici si besoin via CSS variables
        });

        // Reset quand la souris quitte la carte
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0)';
        });
    });


    /* =========================================
       3. CURSEUR PERSONNALISÉ (HALO)
       ========================================= */
    const cursorHalo = document.querySelector('.cursor-halo');
    
    // Déplacement fluide
    document.addEventListener('mousemove', (e) => {
        // Petite latence pour effet fluide
        setTimeout(() => {
            cursorHalo.style.left = e.clientX + 'px';
            cursorHalo.style.top = e.clientY + 'px';
        }, 50);
    });

    // Agrandissement sur les éléments interactifs
    const interactables = document.querySelectorAll('a, button, .project-card, input, textarea');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => cursorHalo.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursorHalo.classList.remove('hovered'));
    });


    /* =========================================
       4. ANIMATION AU SCROLL (OBSERVER)
       ========================================= */
    const observerOptions = {
        threshold: 0.15, // Déclenche quand 15% de l'élément est visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optionnel : arrêter d'observer une fois apparu
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));


    /* =========================================
       5. MENU MOBILE & NAVIGATION
       ========================================= */
    const navToggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        navToggle.classList.toggle('active'); // Pour l'anim du burger
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });


    /* =========================================
       6. FILTRES PORTFOLIO
       ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Gestion classe active
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projects.forEach(project => {
                if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                    project.style.display = 'flex';
                    // Petit délai pour l'animation d'opacité
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    /* =========================================
       7. SYSTÈME DE TRADUCTION (FR/EN)
       ========================================= */
    const translations = {
        fr: {
            "nav-about": "À Propos",
            "nav-portfolio": "Portfolio",
            "nav-education": "Formation",
            "nav-experience": "Expérience",
            "nav-references": "Références",
            "nav-contact": "Contact",
            "nav-cv": "Télécharger CV",
            "hero-title": "Kamil CINAR",
            "hero-subtitle": "Étudiant en BUT Informatique, développeur passionné par la création de solutions logicielles modernes et performantes.",
            "about-title": "À Propos de Moi",
            "about-info-title": "Infos & Contact",
            "about-info-location": "Annecy (74), France",
            "about-hobbies-title": "Passions et Loisirs",
            "about-hobbies-1": "Apprentissage du piano",
            "about-hobbies-2": "Réalisation et montage vidéo",
            "about-hobbies-3": "Programmation & Veille tech",
            "about-hobbies-4": "L'univers de l'automobile",
            "about-hobbies-5": "Je suis des cours de volley ball",
            "about-lang-title": "Langues",
            "about-lang-1a": "Français :", "about-lang-1b": "Natif (C2)",
            "about-lang-2a": "Anglais :", "about-lang-2b": "Intermédiaire Sup. (B2)",
            "about-lang-3a": "Espagnol :", "about-lang-3b": "Pré-Intermédiaire (A2)",
            "about-lang-4a": "Japonais :", "about-lang-4b": "Débutant (A0)",
            "about-lang-5a": "Turc :", "about-lang-5b": "Bilingue (C2)",
            "about-soft-title": "Compétences Générales",
            "about-soft-1": "Innovant, dynamique et confiant",
            "about-soft-2": "Digne de confiance & Responsable",
            "about-soft-3": "Adaptable & Aime apprendre",
            "about-soft-4": "Rigueur & Contrôle Qualité",
            "about-tech-title": "Compétences Techniques",
            "about-tech-front": "Frontend",
            "about-tech-back": "Backend",
            "about-tech-tools": "Outils & Web",
            "about-tech-seo": "Principes de SEO",
            "portfolio-title": "Portfolio",
            "portfolio-intro": "Voici les projets sur lesquels j'ai travaillé, présentés sous forme de cas d'études.",
            "project1-title": "Projet Clonage site FIFA",
            "project1-desc": "Développement d'un clone du site officiel pour étudier l'architecture web moderne et le responsive design.",
            "project1-code": "Code bientôt dispo",
            "project2-title": "Mon Portfolio",
            "project2-desc": "Conception de ce site vitrine interactif, multilingue et animé pour présenter mes compétences.",
            "project3-title": "App Gestion (Loxam)",
            "project3-desc": "Création d'un ERP lourd pour la gestion de location de matériel et de stocks.",
            "project3-code": "Voir le Code",
            "lbl-date": "Date", "lbl-context": "Contexte", "lbl-role": "Rôle", "lbl-status": "Statut",
            "status-wip": "En cours", "status-done": "Terminé",
            "education-title": "Formation",
            "edu1-date": "2024 - 2027 (prévu)", "edu1-title": "BUT Informatique - Parcours IAMSI", "edu1-location": "Université Savoie Mont-Blanc, Annecy (74)", "edu1-desc": "Développement web (Front/Back), gestion de BDD, management de SI.",
            "edu2-date": "2024", "edu2-title": "Baccalauréat Technologique (STMG)", "edu2-location": "Lycée du Granier, La Ravoire (73)", "edu2-desc": "Spécialité Systèmes d'Information et de Gestion (SIG), Mention Assez Bien.",
            "exp-title": "Expérience",
            "exp1-date": "Depuis le 01/11/2025 (CDI)", "exp1-title": "Agent d'accueil en déchetterie", "exp1-location": "Trialp, Secteur SIBRESCA", "exp1-desc": "Gestion des usagers, conseil sur le tri, maintenance du site",
            "exp2-date": "Avril 2025 (2 semaines)", "exp2-title": "Préparateur de Véhicule", "exp2-location": "Jean Lain Occasions, Chambéry (73)", "exp2-desc": "Contrôle qualité, préparation esthétique et gestion du parc. Développement de compétences en rigueur et orientation client.",
            "ref-title": "Références",
            "ref1-role": "Enseignant d'UML et SQL",
            "ref2-role": "Enseignant d'HTML et JS",
            "contact-title": "Restons en contact",
            "contact-subtitle": "N'hésitez pas à me contacter, que ce soit pour une opportunité ou simplement pour échanger.",
            "contact-email": "Envoyer un E-mail"
        },
        en: {
            "nav-about": "About",
            "nav-portfolio": "Portfolio",
            "nav-education": "Education",
            "nav-experience": "Experience",
            "nav-references": "References",
            "nav-contact": "Contact",
            "nav-cv": "Download CV",
            "hero-title": "Kamil CINAR",
            "hero-subtitle": "CS Student & Developer passionate about crafting modern and high-performance software solutions.",
            "about-title": "About Me",
            "about-info-title": "Info & Contact",
            "about-info-location": "Annecy, France",
            "about-hobbies-title": "Hobbies & Passions",
            "about-hobbies-1": "Learning Piano",
            "about-hobbies-2": "Video Editing & Production",
            "about-hobbies-3": "Coding & Tech Watch",
            "about-hobbies-4": "Automotive World",
            "about-hobbies-5": "Volleyball",
            "about-lang-title": "Languages",
            "about-lang-1a": "French:", "about-lang-1b": "Native (C2)",
            "about-lang-2a": "English:", "about-lang-2b": "Upper Intermediate (B2)",
            "about-lang-3a": "Spanish:", "about-lang-3b": "Pre-Intermediate (A2)",
            "about-lang-4a": "Japanese:", "about-lang-4b": "Beginner (A0)",
            "about-lang-5a": "Turkish:", "about-lang-5b": "Bilingual (C2)",
            "about-soft-title": "Soft Skills",
            "about-soft-1": "Innovative, dynamic & confident",
            "about-soft-2": "Trustworthy & Responsible",
            "about-soft-3": "Adaptable & Eager to learn",
            "about-soft-4": "Rigor & Quality Control",
            "about-tech-title": "Technical Skills",
            "about-tech-front": "Frontend",
            "about-tech-back": "Backend",
            "about-tech-tools": "Tools & Web",
            "about-tech-seo": "SEO Principles",
            "portfolio-title": "Portfolio",
            "portfolio-intro": "Here are the projects I worked on, presented as case studies.",
            "project1-title": "FIFA Website Clone",
            "project1-desc": "Development of an official site clone to study modern web architecture and responsive design.",
            "project1-code": "Code available soon",
            "project2-title": "My Portfolio",
            "project2-desc": "Design of this interactive, multilingual, and animated showcase site to present my skills.",
            "project3-title": "Management App (Loxam)",
            "project3-desc": "Creation of a desktop ERP for equipment rental and stock management.",
            "project3-code": "View Code",
            "lbl-date": "Date", "lbl-context": "Context", "lbl-role": "Role", "lbl-status": "Status",
            "status-wip": "In Progress", "status-done": "Done",
            "education-title": "Education",
            "edu1-date": "2024 - 2027 (expected)", "edu1-title": "Bachelor in Computer Science (BUT)", "edu1-location": "Savoie Mont-Blanc University, Annecy", "edu1-desc": "Web dev (Front/Back), DB management, IT systems management.",
            "edu2-date": "2024", "edu2-title": "Technological Baccalaureate (STMG)", "edu2-location": "Lycée du Granier, La Ravoire", "edu2-desc": "Information Systems & Management (SIG) major, with Honors.",
            "exp-title": "Experience",
            "exp1-date": "Since Nov 1, 2025 (CDI)", "exp1-title": "Recycling Center Agent", "exp1-location": "Trialp, SIBRESCA Sector", "exp1-desc": "User management, sorting advice, site maintenance.",
            "exp2-date": "April 2025 (2 weeks)", "exp2-title": "Vehicle Preparer", "exp2-location": "Jean Lain Occasions, Chambéry", "exp2-desc": "Quality control, aesthetic preparation, and fleet management. Developed rigor and customer orientation skills.",
            "ref-title": "References",
            "ref1-role": "UML & SQL Teacher",
            "ref2-role": "HTML & JS Teacher",
            "contact-title": "Let's Keep in Touch",
            "contact-subtitle": "Feel free to contact me, whether for an opportunity or just to chat.",
            "contact-email": "Send an E-mail"
        }
    };

    const langButtons = document.querySelectorAll('.lang-switcher button, .lang-btn-mobile');
    
    // Fonction pour changer la langue
    function setLanguage(lang) {
        // MAJ des textes
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // MAJ des boutons actifs
        langButtons.forEach(btn => {
            // Vérifie si le bouton correspond à la langue choisie (via ID ou data-lang)
            const btnLang = btn.getAttribute('data-lang') || (btn.id === 'lang-fr' ? 'fr' : 'en');
            if (btnLang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // MAJ du lien CV si besoin (optionnel)
        const cvLinks = document.querySelectorAll('.nav-cv-button');
        cvLinks.forEach(link => {
            link.href = lang === 'fr' ? 'images/cv-kamil-fr.pdf' : 'images/cv-kamil-en.pdf';
        });

        // Toggle skills visibility (FR vs EN blocks) if needed
        // Ici on suppose que le texte change, mais si tu as des blocs différents :
        const skillsFr = document.getElementById('skills-content-fr');
        const skillsEn = document.getElementById('skills-content-en');
        if(skillsFr && skillsEn) {
            if(lang === 'fr') {
                skillsFr.style.display = 'grid';
                skillsEn.style.display = 'none';
            } else {
                skillsFr.style.display = 'none';
                skillsEn.style.display = 'block'; // ou grid selon ton CSS
            }
        }
    }

    // Event Listeners sur les boutons de langue
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang') || (btn.id === 'lang-fr' ? 'fr' : 'en');
            setLanguage(lang);
        });
    });

    // Langue par défaut
    setLanguage('fr');

});
