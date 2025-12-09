document.addEventListener('DOMContentLoaded', () => { 

    // --- NAVIGATION MOBILE ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Animation du burger
            const bars = document.querySelectorAll('.bar');
            if(navMenu.classList.contains('active')){
                bars[0].style.transform = "rotate(45deg) translate(5px, 6px)";
                bars[1].style.transform = "rotate(-45deg) translate(5px, -6px)";
            } else {
                bars[0].style.transform = "none";
                bars[1].style.transform = "none";
            }
        });

        // Fermer le menu au clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                document.querySelectorAll('.bar').forEach(bar => bar.style.transform = "none");
            });
        });
    }

    // --- SYSTEME DE LANGUE ---
    const translations = {
        fr: {
            "hero-title": "Architecte de <br><span class='text-gradient'>Solutions Digitales</span>",
            "hero-subtitle": "Je transforme vos besoins complexes en interfaces web modernes, rapides et orientées résultats.",
            "nav-about": "Expertise",
            "nav-portfolio": "Projets",
            "nav-education": "Parcours",
            "nav-contact": "Me Contacter",
            "nav-cv": "CV",
            "about-title": "Mon Expertise",
            "about-info-title": "Kamil CINAR",
            "about-info-location": "Annecy (74), France",
            "about-soft-1": "Proactif & Orienté Solution",
            "about-soft-4": "Contrôle Qualité",
            "about-lang-title": "International",
            "about-tech-title": "Arsenal Technique",
            "portfolio-title": "Réalisations",
            "project1-title": "E-Shop FIFA (Clone)",
            "project1-desc": "Architecture e-commerce complète, responsive et optimisée pour la conversion.",
            "project2-title": "Portfolio Premium",
            "project2-desc": "Site vitrine haute performance, multilingue avec design Glassmorphism.",
            "project3-title": "ERP Loxam",
            "project3-desc": "Solution lourde de gestion de stocks et location pour entreprise.",
            "education-title": "<i class='fas fa-graduation-cap'></i> Formation",
            "edu1-date": "2024 - 2027",
            "edu1-title": "BUT Informatique",
            "edu1-desc": "Fullstack & Architecture SI",
            "edu2-title": "Bac STMG (SIG)",
            "exp-title": "<i class='fas fa-briefcase'></i> Expérience",
            "exp1-date": "Depuis 11/2025",
            "exp1-title": "Gestion de Site",
            "exp2-title": "Préparateur Véhicule",
            "contact-title": "Prêt à collaborer ?",
            "contact-subtitle": "Créons ensemble une solution qui valorise votre activité.",
            "contact-email": "Lancer le projet",
            "ref1-role": "Enseignant UML & SQL",
            "ref2-role": "Enseignant Web"
        },
        en: {
            "hero-title": "Architect of <br><span class='text-gradient'>Digital Solutions</span>",
            "hero-subtitle": "Turning complex requirements into modern, fast, and result-oriented web interfaces.",
            "nav-about": "Expertise",
            "nav-portfolio": "Projects",
            "nav-education": "Journey",
            "nav-contact": "Contact Me",
            "nav-cv": "Resume",
            "about-title": "My Expertise",
            "about-info-title": "Kamil CINAR",
            "about-info-location": "Annecy (74), France",
            "about-soft-1": "Proactive & Solution Oriented",
            "about-soft-4": "Quality Control",
            "about-lang-title": "International",
            "about-tech-title": "Technical Arsenal",
            "portfolio-title": "Selected Work",
            "project1-title": "FIFA E-Shop (Clone)",
            "project1-desc": "Complete e-commerce architecture, responsive and conversion-optimized.",
            "project2-title": "Premium Portfolio",
            "project2-desc": "High-performance showcase site, multilingual with Glassmorphism design.",
            "project3-title": "Loxam ERP",
            "project3-desc": "Heavy-duty stock management and rental solution for enterprise.",
            "education-title": "<i class='fas fa-graduation-cap'></i> Education",
            "edu1-date": "2024 - 2027",
            "edu1-title": "CS Degree (BUT)",
            "edu1-desc": "Fullstack & IS Architecture",
            "edu2-title": "High School Diploma (IT)",
            "exp-title": "<i class='fas fa-briefcase'></i> Experience",
            "exp1-date": "Since 11/2025",
            "exp1-title": "Site Management",
            "exp2-title": "Vehicle Specialist",
            "contact-title": "Ready to collaborate?",
            "contact-subtitle": "Let's build a solution that elevates your business.",
            "contact-email": "Start Project",
            "ref1-role": "UML & SQL Professor",
            "ref2-role": "Web Professor"
        }
    };

    const langButtons = document.querySelectorAll('.lang-btn');
    const skillsFr = document.getElementById('skills-content-fr');
    const skillsEn = document.getElementById('skills-content-en');
    const cvLink = document.querySelector('a[data-key="nav-cv"]');

    const setLanguage = (lang) => {
        // MAJ Boutons
        langButtons.forEach(btn => {
            if(btn.dataset.lang === lang) btn.classList.add('active');
            else btn.classList.remove('active');
        });

        // MAJ CV Link
        if(cvLink) cvLink.href = (lang === 'en') ? 'images/cv-kamil-en.pdf' : 'images/cv-kamil-fr.pdf';

        // MAJ Contenu Tech
        if (lang === 'en') {
            if(skillsFr) skillsFr.style.display = 'none';
            if(skillsEn) skillsEn.style.display = 'flex';
        } else {
            if(skillsFr) skillsFr.style.display = 'flex';
            if(skillsEn) skillsEn.style.display = 'none';
        }

        // MAJ Textes
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.dataset.key;
            if(translations[lang][key]) el.innerHTML = translations[lang][key];
        });
    };

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    // --- STARFIELD SUBTIL ---
    const canvas = document.getElementById('starfield');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let stars = [];

        const init = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            stars = [];
            for(let i=0; i<100; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    r: Math.random() * 1.5,
                    opacity: Math.random() * 0.5
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0,0,width,height);
            ctx.fillStyle = "#fff";
            stars.forEach(s => {
                ctx.globalAlpha = s.opacity;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
                ctx.fill();
            });
            requestAnimationFrame(draw);
        };

        window.addEventListener('resize', init);
        init();
        draw();
    }

    // --- FILTRES PROJETS ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            
            projects.forEach(card => {
                if(filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });
});
