document.addEventListener('DOMContentLoaded', () => { 

    // --- NAVIGATION MOBILE ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animation simple des barres du burger via CSS classes ou inline si besoin
            // Ici le CSS gère l'affichage du menu, on garde simple
            const bars = document.querySelectorAll('.bar');
            if(navMenu.classList.contains('active')){
                bars[0].style.transform = "rotate(45deg) translate(5px, 6px)";
                bars[1].style.opacity = "0";
                bars[2].style.transform = "rotate(-45deg) translate(5px, -6px)";
            } else {
                bars[0].style.transform = "none";
                bars[1].style.opacity = "1";
                bars[2].style.transform = "none";
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const bars = document.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = "none";
                    bar.style.opacity = "1";
                });
            });
        });
    }

    // --- TRADUCTIONS ---
    const translations = {
        fr: {
            "hero-title": "Kamil CINAR",
            "hero-subtitle": "Étudiant en BUT Informatique, développeur passionné par la création de solutions logicielles modernes, fiables et performantes.",
            "nav-about": "À Propos",
            "nav-portfolio": "Portfolio",
            "nav-education": "Parcours",
            "nav-contact": "Contact",
            "nav-cv": "CV",
            
            "about-title": "À Propos de Moi",
            "about-info-title": "Infos & Contact",
            "about-info-age": "1 Mai 2006 (19ans)",
            "about-info-location": "Annecy (74), France",
            
            "about-hobbies-title": "Passions",
            "about-hobbies-1": "Apprentissage du piano",
            "about-hobbies-2": "Réalisation et montage vidéo",
            "about-hobbies-3": "Programmation & Veille tech",
            "about-hobbies-4": "Automobile & Mécanique",
            "about-hobbies-5": "Volley ball",
            
            "about-soft-title": "Savoir-Être",
            "about-soft-1": "Innovant & Dynamique",
            "about-soft-2": "Fiable & Responsable",
            "about-soft-3": "Grande capacité d'adaptation",
            "about-soft-4": "Rigueur & Souci du détail",
            
            "about-lang-title": "Langues",
            "about-lang-1b": "Natif (C2)",
            "about-lang-2b": "Anglais (B2)",
            "about-lang-3b": "Espagnol (A2)",
            "about-lang-5b": "Turc (C2)",
            
            "about-tech-title": "Stack Technique",
            "about-tech-front": "Frontend",
            "about-tech-back": "Backend",
            "about-tech-tools": "Outils",
            "about-tech-seo": "SEO",

            "portfolio-title": "Réalisations",
            "project1-title": "E-Shop FIFA (Clone)",
            "project1-desc": "Architecture e-commerce complète basée sur le site officiel. Responsive design, gestion panier et base de données.",
            "project2-title": "Portfolio Premium",
            "project2-desc": "Site vitrine haute performance. Design Glassmorphism soigné, animations fluides et support multilingue.",
            "project3-title": "ERP Loxam",
            "project3-desc": "Solution lourde pour la gestion de stocks et location de matériel pro. Interface WPF et base de données MySQL.",

            "education-title": "Formation",
            "edu1-date": "2024 - 2027 (En cours)",
            "edu1-title": "BUT Informatique - Parcours IAMSI",
            "edu1-location": "Université Savoie Mont-Blanc, Annecy (74)",
            "edu1-desc": "Développement web (Front/Back), gestion de BDD, management de SI.",
            "edu2-date": "2024",
            "edu2-title": "Baccalauréat Technologique (STMG)",
            "edu2-location": "Lycée du Granier, La Ravoire (73)",
            "edu2-desc": "Spécialité Systèmes d'Information et de Gestion (SIG), Mention Assez Bien.",

            "exp-title": "Expérience",
            "exp1-date": "Depuis Nov. 2025",
            "exp1-title": "Agent d'accueil (Gestion Site)",
            "exp1-location": "Trialp, Secteur SIBRESCA",
            "exp1-desc": "Gestion des usagers, conseil sur le tri, maintenance et responsabilité du site.",
            "exp2-date": "Avril 2025 (2 semaines)",
            "exp2-title": "Préparateur de Véhicule",
            "exp2-location": "Jean Lain Occasions, Chambéry (73)",
            "exp2-desc": "Contrôle qualité, préparation esthétique. Développement de compétences en rigueur et relation client.",

            "ref-title": "Références",
            "ref1-name": "Pascal COLIN",
            "ref1-role": "Enseignant d'UML et SQL",
            "ref2-name": "Luc DAMAS",
            "ref2-role": "Enseignant d'HTML et JS",

            "contact-title": "Démarrons un projet",
            "contact-subtitle": "Disponible pour discuter de vos besoins en développement web ou logiciel.",
            "contact-email": "M'envoyer un E-mail"
        },
        en: {
            "hero-title": "Kamil CINAR",
            "hero-subtitle": "Computer Science student, passionate developer focused on creating modern, reliable, and efficient software solutions.",
            "nav-about": "About",
            "nav-portfolio": "Portfolio",
            "nav-education": "Education",
            "nav-experience": "Experience",
            "nav-contact": "Contact",
            "nav-cv": "Resume",
            
            "about-title": "About Me",
            "about-info-title": "Info & Contact",
            "about-info-age": "May 1, 2006 (19 years old)",
            "about-info-location": "Annecy (74), France",
            
            "about-hobbies-title": "Passions",
            "about-hobbies-1": "Learning piano",
            "about-hobbies-2": "Video production and editing",
            "about-hobbies-3": "Programming & Tech watch",
            "about-hobbies-4": "Automotive & Mechanics",
            "about-hobbies-5": "Volleyball",
            
            "about-soft-title": "Soft Skills",
            "about-soft-1": "Innovative & Dynamic",
            "about-soft-2": "Reliable & Responsible",
            "about-soft-3": "Highly Adaptable",
            "about-soft-4": "Rigor & Attention to Detail",
            
            "about-lang-title": "Languages",
            "about-lang-1b": "Native (C2)",
            "about-lang-2b": "English (B2)",
            "about-lang-3b": "Spanish (A2)",
            "about-lang-5b": "Turkish (C2)",
            
            "about-tech-title": "Technical Stack",
            "about-tech-front": "Frontend",
            "about-tech-back": "Backend",
            "about-tech-tools": "Tools",
            "about-tech-seo": "SEO Principles",

            "portfolio-title": "Portfolio",
            "project1-title": "FIFA E-Shop (Clone)",
            "project1-desc": "Complete e-commerce architecture based on official site. Responsive design, cart management, and database.",
            "project2-title": "Premium Portfolio",
            "project2-desc": "High-performance showcase site. Polished Glassmorphism design, fluid animations, and multilingual support.",
            "project3-title": "Loxam ERP",
            "project3-desc": "Heavy-duty solution for stock management and pro equipment rental. WPF interface and MySQL database.",

            "education-title": "Education",
            "edu1-date": "2024 - 2027 (Ongoing)",
            "edu1-title": "CS Degree (BUT) - IAMSI Track",
            "edu1-location": "Université Savoie Mont-Blanc, Annecy (74)",
            "edu1-desc": "Web development (Front/Back), database management, IS management.",
            "edu2-date": "2024",
            "edu2-title": "Technology Baccalaureate (STMG)",
            "edu2-location": "Lycée du Granier, La Ravoire (73)",
            "edu2-desc": "Specialty in Information and Management Systems (SIG), with Honors.",

            "exp-title": "Experience",
            "exp1-date": "Since Nov. 2025",
            "exp1-title": "Site Reception & Management",
            "exp1-location": "Trialp, SIBRESCA Sector",
            "exp1-desc": "User management, sorting advice, site maintenance and responsibility.",
            "exp2-date": "April 2025 (2 weeks)",
            "exp2-title": "Vehicle Preparation Specialist",
            "exp2-location": "Jean Lain Occasions, Chambéry (73)",
            "exp2-desc": "Quality control, aesthetic preparation. Skills in rigor and customer relations.",

            "ref-title": "References",
            "ref1-name": "Pascal COLIN",
            "ref1-role": "UML and SQL Teacher",
            "ref2-name": "Luc DAMAS",
            "ref2-role": "HTML and JS Teacher",

            "contact-title": "Let's Start a Project",
            "contact-subtitle": "Available to discuss your web development or software needs.",
            "contact-email": "Send me an Email"
        }
    };

    const langButtons = document.querySelectorAll('.lang-btn');
    const skillsFr = document.getElementById('skills-content-fr');
    const skillsEn = document.getElementById('skills-content-en');
    const cvLink = document.querySelector('a[data-key="nav-cv"]');

    const setLanguage = (lang) => {
        langButtons.forEach(btn => {
            if(btn.dataset.lang === lang) btn.classList.add('active');
            else btn.classList.remove('active');
        });

        if(cvLink) cvLink.href = (lang === 'en') ? 'images/cv-kamil-en.pdf' : 'images/cv-kamil-fr.pdf';

        if (lang === 'en') {
            if(skillsFr) skillsFr.style.display = 'none';
            if(skillsEn) skillsEn.style.display = 'flex';
        } else {
            if(skillsFr) skillsFr.style.display = 'flex';
            if(skillsEn) skillsEn.style.display = 'none';
        }

        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.dataset.key;
            if(translations[lang][key]) el.innerHTML = translations[lang][key];
        });
    };

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    // --- STARFIELD ---
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
            for(let i=0; i<80; i++) { // Moins d'étoiles pour plus de sobriété
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

    // --- FILTRES ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            
            projects.forEach(card => {
                if(filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'flex'; // Important: flex pour garder layout carte
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });
});
