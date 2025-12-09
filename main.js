document.addEventListener('DOMContentLoaded', () => { 

    // --- NAVIGATION MOBILE ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
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
                document.querySelectorAll('.bar').forEach(bar => {
                    bar.style.transform = "none";
                    bar.style.opacity = "1";
                });
            });
        });
    }

    // --- TRADUCTIONS (Contenu restauré) ---
    const translations = {
        fr: {
            "hero-title": "Kamil CINAR",
            "hero-subtitle": "Étudiant en BUT Informatique, développeur passionné par la création de solutions logicielles modernes et performantes.",
            "nav-about": "À Propos",
            "nav-portfolio": "Portfolio",
            "nav-education": "Formation",
            "nav-experience": "Expérience",
            "nav-contact": "Contact",
            "nav-cv": "CV",
            
            "about-title": "À Propos de Moi",
            "about-info-title": "Infos & Contact",
            "about-info-age": "1 Mai 2006 (19ans)",
            "about-info-location": "Annecy (74), France",
            
            "about-hobbies-title": "Passions et Loisirs",
            "about-hobbies-1": "Apprentissage du piano",
            "about-hobbies-2": "Réalisation et montage vidéo",
            "about-hobbies-3": "Programmation & Veille tech",
            "about-hobbies-4": "L'univers de l'automobile",
            "about-hobbies-5": "Volley ball",
            
            "about-soft-title": "Compétences Générales",
            "about-soft-1": "Innovant, dynamique et confiant",
            "about-soft-2": "Digne de confiance & Responsable",
            "about-soft-3": "Adaptable & Aime apprendre",
            "about-soft-4": "Rigueur & Contrôle Qualité",
            
            "about-lang-title": "Langues",
            "about-lang-1b": "Natif (C2)",
            "about-lang-2b": "Anglais (B2)",
            "about-lang-3b": "Espagnol (A2)",
            "about-lang-5b": "Turc (C2)",
            
            "about-tech-title": "Compétences Techniques",
            "about-tech-front": "Frontend",
            "about-tech-back": "Backend",
            "about-tech-tools": "Outils",
            "about-tech-seo": "SEO",

            "portfolio-title": "Portfolio",
            "project1-title": "Projet Clonage site FIFA",
            "project1-desc": "Développement d'un clone du site officiel pour étudier l'architecture web moderne et le responsive design.",
            "project2-title": "Mon Portfolio",
            "project2-desc": "Conception de ce site vitrine interactif, multilingue et animé pour présenter mes compétences.",
            "project3-title": "App Gestion (Loxam)",
            "project3-desc": "Création d'un ERP lourd pour la gestion de location de matériel et de stocks.",

            "education-title": "Formation",
            "edu1-date": "2024 - 2027 (prévu)",
            "edu1-title": "BUT Informatique - Parcours IAMSI",
            "edu1-location": "Université Savoie Mont-Blanc, Annecy (74)",
            "edu1-desc": "Développement web (Front/Back), gestion de BDD, management de SI.",
            "edu2-date": "2024",
            "edu2-title": "Baccalauréat Technologique (STMG)",
            "edu2-location": "Lycée du Granier, La Ravoire (73)",
            "edu2-desc": "Spécialité Systèmes d'Information et de Gestion (SIG), Mention Assez Bien.",

            "exp-title": "Expérience",
            "exp1-date": "Depuis le 01/11/2025 (CDI)",
            "exp1-title": "Agent d'accueil en déchetterie",
            "exp1-location": "Trialp, Secteur SIBRESCA",
            "exp1-desc": "Gestion des usagers, conseil sur le tri, maintenance du site",
            "exp2-date": "Avril 2025 (2 semaines)",
            "exp2-title": "Préparateur de Véhicule",
            "exp2-location": "Jean Lain Occasions, Chambéry (73)",
            "exp2-desc": "Contrôle qualité, préparation esthétique et gestion du parc. Développement de compétences en rigueur et orientation client.",

            "ref-title": "Références",
            "ref1-name": "Pascal COLIN",
            "ref1-role": "Enseignant d'UML et SQL",
            "ref2-name": "Luc DAMAS",
            "ref2-role": "Enseignant d'HTML et JS",

            "contact-title": "Restons en contact",
            "contact-subtitle": "N'hésitez pas à me contacter, que ce soit pour une opportunité ou simplement pour échanger.",
            "contact-email": "Envoyer un E-mail"
        },
        en: {
            "hero-title": "Kamil CINAR",
            "hero-subtitle": "Computer Science student, passionate developer focused on creating modern and efficient software solutions.",
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
            
            "about-hobbies-title": "Passions & Hobbies",
            "about-hobbies-1": "Learning piano",
            "about-hobbies-2": "Video production and editing",
            "about-hobbies-3": "Programming & Tech watch",
            "about-hobbies-4": "The automotive world",
            "about-hobbies-5": "Volleyball",
            
            "about-soft-title": "Soft Skills",
            "about-soft-1": "Innovative, dynamic, and confident",
            "about-soft-2": "Trustworthy & Responsible",
            "about-soft-3": "Adaptable & Eager to learn",
            "about-soft-4": "Rigor & Quality control",
            
            "about-lang-title": "Languages",
            "about-lang-1b": "Native (C2)",
            "about-lang-2b": "English (B2)",
            "about-lang-3b": "Spanish (A2)",
            "about-lang-5b": "Turkish (C2)",
            
            "about-tech-title": "Technical Skills",
            "about-tech-front": "Frontend",
            "about-tech-back": "Backend",
            "about-tech-tools": "Tools",
            "about-tech-seo": "SEO Principles",

            "portfolio-title": "Portfolio",
            "project1-title": "FIFA Website Clone",
            "project1-desc": "Development of a FIFA website clone to learn web architecture modern and responsive design.",
            "project2-title": "My Portfolio",
            "project2-desc": "Designed this interactive, multilingual, and animated portfolio to showcase my skills.",
            "project3-title": "Management App (Loxam)",
            "project3-desc": "Creation of a heavy ERP for equipment rental management and stock control.",

            "education-title": "Education",
            "edu1-date": "2024 - 2027 (expected)",
            "edu1-title": "University Diploma in Computer Science",
            "edu1-location": "Université Savoie Mont-Blanc, Annecy (74)",
            "edu1-desc": "Web development (Front/Back), database management, IS management.",
            "edu2-date": "2024",
            "edu2-title": "Technology Baccalaureate (STMG)",
            "edu2-location": "Lycée du Granier, La Ravoire (73)",
            "edu2-desc": "Specialty in Information and Management Systems (SIG), with Honors.",

            "exp-title": "Experience",
            "exp1-date": "Since 11/01/2025 (Full-time)",
            "exp1-title": "Recycling Center Reception Agent",
            "exp1-location": "Trialp, SIBRESCA Sector",
            "exp1-desc": "User management, sorting advice, site maintenance",
            "exp2-date": "April 2025 (2 weeks)",
            "exp2-title": "Vehicle Preparation",
            "exp2-location": "Jean Lain Occasions, Chambéry (73)",
            "exp2-desc": "Quality control, cosmetic preparation, and fleet management. Developed skills in rigor and customer focus.",

            "ref-title": "References",
            "ref1-name": "Pascal COLIN",
            "ref1-role": "UML and SQL Teacher",
            "ref2-name": "Luc DAMAS",
            "ref2-role": "HTML and JS Teacher",

            "contact-title": "Let's get in touch",
            "contact-subtitle": "Feel free to contact me, whether for an opportunity or just to chat.",
            "contact-email": "Send an E-mail"
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
