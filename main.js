document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. CONFIGURATION --- */
    const CONFIG = {
        starCount: 600,
        starSpeed: 0.5,
        typeSpeed: 50, // Vitesse de frappe (ms)
        particleCount: 12 // Particules par clic
    };

    /* --- 2. FOND ÉTOILÉ (CANVAS) --- */
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];

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
            this.z = Math.random() * width;
        }
        update() {
            this.z -= CONFIG.starSpeed * 5;
            if (this.z <= 0) {
                this.z = width;
                this.x = Math.random() * width - width / 2;
                this.y = Math.random() * height - height / 2;
            }
        }
        draw() {
            let x = (this.x / this.z) * width + width / 2;
            let y = (this.y / this.z) * width + height / 2;
            let radius = (1 - this.z / width) * 2;
            if (x < 0 || x > width || y < 0 || y > height) return;
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${1 - this.z / width})`;
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    for (let i = 0; i < CONFIG.starCount; i++) stars.push(new Star());

    function animateStars() {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(star => { star.update(); star.draw(); });
        requestAnimationFrame(animateStars);
    }
    animateStars();

    /* --- 3. SCROLL PROGRESS BAR --- */
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        document.querySelector('.scroll-progress').style.width = scrolled + "%";
    });

    /* --- 4. TYPING EFFECT (SUBTITLE) --- */
    const subtitleElement = document.querySelector('.hero-section p');
    // On sauvegarde le texte original
    const originalText = subtitleElement.getAttribute('data-key') === 'hero-subtitle' 
        ? "Étudiant en BUT Informatique, développeur passionné par la création de solutions logicielles modernes et performantes." 
        : subtitleElement.innerText;
    
    subtitleElement.innerText = ""; // On vide
    subtitleElement.classList.add('typing-cursor');

    let charIndex = 0;
    function typeWriter() {
        if (charIndex < originalText.length) {
            subtitleElement.innerText += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, CONFIG.typeSpeed);
        } else {
            subtitleElement.classList.remove('typing-cursor');
        }
    }
    // Démarrer après un court délai
    setTimeout(typeWriter, 1000);

    /* --- 5. CLICK PARTICLES (EXPLOSION) --- */
    document.addEventListener('click', (e) => {
        createParticles(e.clientX, e.clientY);
        
        // Anim curseur
        const halo = document.querySelector('.cursor-halo');
        halo.classList.add('clicking');
        setTimeout(() => halo.classList.remove('clicking'), 200);
    });

    function createParticles(x, y) {
        for (let i = 0; i < CONFIG.particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('click-particle');
            document.body.appendChild(particle);

            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = Math.random() > 0.5 ? 'var(--neon-cyan)' : 'var(--neon-purple)';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            // Destination aléatoire
            const tx = (Math.random() - 0.5) * 200;
            const ty = (Math.random() - 0.5) * 200;
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);

            // Nettoyage
            setTimeout(() => particle.remove(), 800);
        }
    }

    /* --- 6. 3D TILT & PARALLAX --- */
    const cards = document.querySelectorAll('.project-card, .about-info-card, .skill-category-card, .reference-card, .skill-en-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / 10) * -1;
            const rotateY = (x - centerX) / 10;

            card.style.transform = `perspective(1000px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0)';
        });
    });

    /* --- 7. CURSEUR --- */
    const cursorHalo = document.querySelector('.cursor-halo');
    document.addEventListener('mousemove', (e) => {
        setTimeout(() => {
            cursorHalo.style.left = e.clientX + 'px';
            cursorHalo.style.top = e.clientY + 'px';
        }, 50);
    });
    document.querySelectorAll('a, button, .project-card, input').forEach(el => {
        el.addEventListener('mouseenter', () => cursorHalo.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursorHalo.classList.remove('hovered'));
    });

    /* --- 8. OBSERVER (SCROLL REVEAL) --- */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    /* --- 9. MENU MOBILE --- */
    const navToggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    navToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    /* --- 10. TRADUCTIONS & FILTRES --- */
    // Filtres
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            projects.forEach(p => {
                if(filter === 'all' || p.getAttribute('data-category') === filter) {
                    p.style.display = 'flex';
                    setTimeout(() => p.style.opacity = '1', 10);
                } else {
                    p.style.opacity = '0';
                    setTimeout(() => p.style.display = 'none', 300);
                }
            });
        });
    });

    // Traductions (Objet complet)
    const translations = {
        fr: {
            "hero-subtitle": "Étudiant en BUT Informatique, développeur passionné par la création de solutions logicielles modernes et performantes.",
             "nav-about": "À Propos", "nav-portfolio": "Portfolio", "nav-education": "Formation", "nav-experience": "Expérience", "nav-references": "Références", "nav-contact": "Contact", "nav-cv": "Télécharger CV", "hero-title": "Kamil CINAR", "about-title": "À Propos de Moi", "about-info-title": "Infos & Contact", "about-info-location": "Annecy (74), France", "about-hobbies-title": "Passions et Loisirs", "about-hobbies-1": "Apprentissage du piano", "about-hobbies-2": "Réalisation et montage vidéo", "about-hobbies-3": "Programmation & Veille tech", "about-hobbies-4": "L'univers de l'automobile", "about-hobbies-5": "Je suis des cours de volley ball", "about-lang-title": "Langues", "about-lang-1a": "Français :", "about-lang-1b": "Natif (C2)", "about-lang-2a": "Anglais :", "about-lang-2b": "Intermédiaire Sup. (B2)", "about-lang-3a": "Espagnol :", "about-lang-3b": "Pré-Intermédiaire (A2)", "about-lang-4a": "Japonais :", "about-lang-4b": "Débutant (A0)", "about-lang-5a": "Turc :", "about-lang-5b": "Bilingue (C2)", "about-soft-title": "Compétences Générales", "about-soft-1": "Innovant, dynamique et confiant", "about-soft-2": "Digne de confiance & Responsable", "about-soft-3": "Adaptable & Aime apprendre", "about-soft-4": "Rigueur & Contrôle Qualité", "about-tech-title": "Compétences Techniques", "about-tech-front": "Frontend", "about-tech-back": "Backend", "about-tech-tools": "Outils & Web", "about-tech-seo": "Principes de SEO", "portfolio-title": "Portfolio", "portfolio-intro": "Voici les projets sur lesquels j'ai travaillé, présentés sous forme de cas d'études.", "project1-title": "Projet Clonage site FIFA", "project1-desc": "Développement d'un clone du site officiel pour étudier l'architecture web moderne et le responsive design.", "project1-code": "Code bientôt dispo", "project2-title": "Mon Portfolio", "project2-desc": "Conception de ce site vitrine interactif, multilingue et animé pour présenter mes compétences.", "project3-title": "App Gestion (Loxam)", "project3-desc": "Création d'un ERP lourd pour la gestion de location de matériel et de stocks.", "project3-code": "Voir le Code", "lbl-date": "Date", "lbl-context": "Contexte", "lbl-role": "Rôle", "lbl-status": "Statut", "status-wip": "En cours", "status-done": "Terminé", "education-title": "Formation", "edu1-date": "2024 - 2027 (prévu)", "edu1-title": "BUT Informatique - Parcours IAMSI", "edu1-location": "Université Savoie Mont-Blanc, Annecy (74)", "edu1-desc": "Développement web (Front/Back), gestion de BDD, management de SI.", "edu2-date": "2024", "edu2-title": "Baccalauréat Technologique (STMG)", "edu2-location": "Lycée du Granier, La Ravoire (73)", "edu2-desc": "Spécialité Systèmes d'Information et de Gestion (SIG), Mention Assez Bien.", "exp-title": "Expérience", "exp1-date": "Depuis le 01/11/2025 (CDI)", "exp1-title": "Agent d'accueil en déchetterie", "exp1-location": "Trialp, Secteur SIBRESCA", "exp1-desc": "Gestion des usagers, conseil sur le tri, maintenance du site", "exp2-date": "Avril 2025 (2 semaines)", "exp2-title": "Préparateur de Véhicule", "exp2-location": "Jean Lain Occasions, Chambéry (73)", "exp2-desc": "Contrôle qualité, préparation esthétique et gestion du parc. Développement de compétences en rigueur et orientation client.", "ref-title": "Références", "ref1-role": "Enseignant d'UML et SQL", "ref2-role": "Enseignant d'HTML et JS", "contact-title": "Restons en contact", "contact-subtitle": "N'hésitez pas à me contacter, que ce soit pour une opportunité ou simplement pour échanger.", "contact-email": "Envoyer un E-mail"
        },
        en: {
            "hero-subtitle": "CS Student & Developer passionate about crafting modern and high-performance software solutions.",
             "nav-about": "About", "nav-portfolio": "Portfolio", "nav-education": "Education", "nav-experience": "Experience", "nav-references": "References", "nav-contact": "Contact", "nav-cv": "Download CV", "hero-title": "Kamil CINAR", "about-title": "About Me", "about-info-title": "Info & Contact", "about-info-location": "Annecy, France", "about-hobbies-title": "Hobbies & Passions", "about-hobbies-1": "Learning Piano", "about-hobbies-2": "Video Editing & Production", "about-hobbies-3": "Coding & Tech Watch", "about-hobbies-4": "Automotive World", "about-hobbies-5": "Volleyball", "about-lang-title": "Languages", "about-lang-1a": "French:", "about-lang-1b": "Native (C2)", "about-lang-2a": "English:", "about-lang-2b": "Upper Intermediate (B2)", "about-lang-3a": "Spanish:", "about-lang-3b": "Pre-Intermediate (A2)", "about-lang-4a": "Japanese:", "about-lang-4b": "Beginner (A0)", "about-lang-5a": "Turkish:", "about-lang-5b": "Bilingual (C2)", "about-soft-title": "Soft Skills", "about-soft-1": "Innovative, dynamic & confident", "about-soft-2": "Trustworthy & Responsible", "about-soft-3": "Adaptable & Eager to learn", "about-soft-4": "Rigor & Quality Control", "about-tech-title": "Technical Skills", "about-tech-front": "Frontend", "about-tech-back": "Backend", "about-tech-tools": "Tools & Web", "about-tech-seo": "SEO Principles", "portfolio-title": "Portfolio", "portfolio-intro": "Here are the projects I worked on, presented as case studies.", "project1-title": "FIFA Website Clone", "project1-desc": "Development of an official site clone to study modern web architecture and responsive design.", "project1-code": "Code available soon", "project2-title": "My Portfolio", "project2-desc": "Design of this interactive, multilingual, and animated showcase site to present my skills.", "project3-title": "Management App (Loxam)", "project3-desc": "Creation of a desktop ERP for equipment rental and stock management.", "project3-code": "View Code", "lbl-date": "Date", "lbl-context": "Context", "lbl-role": "Role", "lbl-status": "Status", "status-wip": "In Progress", "status-done": "Done", "education-title": "Education", "edu1-date": "2024 - 2027 (expected)", "edu1-title": "Bachelor in Computer Science (BUT)", "edu1-location": "Savoie Mont-Blanc University, Annecy", "edu1-desc": "Web dev (Front/Back), DB management, IT systems management.", "edu2-date": "2024", "edu2-title": "Technological Baccalaureate (STMG)", "edu2-location": "Lycée du Granier, La Ravoire", "edu2-desc": "Information Systems & Management (SIG) major, with Honors.", "exp-title": "Experience", "exp1-date": "Since Nov 1, 2025 (CDI)", "exp1-title": "Recycling Center Agent", "exp1-location": "Trialp, SIBRESCA Sector", "exp1-desc": "User management, sorting advice, site maintenance.", "exp2-date": "April 2025 (2 weeks)", "exp2-title": "Vehicle Preparer", "exp2-location": "Jean Lain Occasions, Chambéry", "exp2-desc": "Quality control, aesthetic preparation, and fleet management. Developed rigor and customer orientation skills.", "ref-title": "References", "ref1-role": "UML & SQL Teacher", "ref2-role": "HTML & JS Teacher", "contact-title": "Let's Keep in Touch", "contact-subtitle": "Feel free to contact me, whether for an opportunity or just to chat.", "contact-email": "Send an E-mail"
        }
    };

    const langButtons = document.querySelectorAll('.lang-switcher button, .lang-btn-mobile');
    
    function setLanguage(lang) {
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[lang][key]) {
                // Special case for subtitle typing effect reset
                if (key === 'hero-subtitle') {
                    // Reset typing effect logic handled above separately or could be integrated
                    // For now simple text replacement to avoid complexity in this snippet
                    el.innerText = translations[lang][key]; 
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
        langButtons.forEach(btn => {
            const btnLang = btn.getAttribute('data-lang') || (btn.id === 'lang-fr' ? 'fr' : 'en');
            btn.classList.toggle('active', btnLang === lang);
        });
        const cvLinks = document.querySelectorAll('.nav-cv-button');
        cvLinks.forEach(link => link.href = lang === 'fr' ? 'images/cv-kamil-fr.pdf' : 'images/cv-kamil-en.pdf');
        
        // Toggle skills
        const skillsFr = document.getElementById('skills-content-fr');
        const skillsEn = document.getElementById('skills-content-en');
        if(skillsFr && skillsEn) {
            skillsFr.style.display = lang === 'fr' ? 'grid' : 'none';
            skillsEn.style.display = lang === 'fr' ? 'none' : 'block';
        }
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.getAttribute('data-lang') || (btn.id === 'lang-fr' ? 'fr' : 'en'));
        });
    });
});
