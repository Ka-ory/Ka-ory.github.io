document.addEventListener('DOMContentLoaded', () => { 

    const cvPathFR = 'images/cv-kamil-fr.pdf';
    const cvPathEN = 'images/cv-kamil-en.pdf';
    
    const cvButtons = document.querySelectorAll('.nav-cv-button');

    // --- TRADUCTIONS ---
    const translations = {
        fr: {
            "nav-about": "À Propos",
            "nav-portfolio": "Portfolio",
            "nav-education": "Formation",
            "nav-experience": "Expérience",
            "nav-references": "Références",
            "nav-contact": "Contact",
            "nav-cv": "Télécharger mon CV",
            "hero-title": "Kamil CINAR",
            "hero-subtitle": "Étudiant en BUT Informatique, développeur passionné par la création de solutions logicielles modernes et performantes.",
            "about-title": "À Propos de Moi",
            "about-info-title": "Infos & Contact",
            "about-info-age": "1 Mai 2006 (19ans)",
            "about-info-location": "Annecy (74), France",
            "about-info-linkedin": "Kamil CINAR",
            "about-hobbies-title": "Passions et Loisirs",
            "about-hobbies-1": "Apprentissage du piano",
            "about-hobbies-2": "Réalisation et montage vidéo",
            "about-hobbies-3": "Programmation & Veille tech",
            "about-hobbies-4": "L'univers de l'automobile",
            "about-hobbies-5": "Je suis des cours de volley ball",
            "about-lang-title": "Langues",
            "about-lang-1a": "Français :",
            "about-lang-1b": "Natif (C2)",
            "about-lang-2a": "Anglais :",
            "about-lang-2b": "Intermédiaire Sup. (B2)",
            "about-lang-3a": "Espagnol :",
            "about-lang-3b": "Pré-Intermédiaire (A2)",
            "about-lang-4a": "Japonais :",
            "about-lang-4b": "Débutant (A0)", 
            "about-lang-5a": "Turc :",
            "about-lang-5b": "Bilingue (C2)",
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

            "lbl-date": "Date",
            "lbl-context": "Contexte",
            "lbl-role": "Rôle",
            "lbl-status": "Statut",
            "status-wip": "En cours",
            "status-done": "Terminé",

            "portfolio-title": "Portfolio",
            "portfolio-intro": "Voici les projets sur lesquels j'ai travaillé, présentés sous forme de cas d'études.", 
            "project1-title": "Projet Clonage site FIFA", 
            "project1-desc": "Développement d'un clone du site officiel pour étudier l'architecture web moderne et le responsive design.", 
            "project1-code": "En cours ...", 
            "project2-title": "Mon Portfolio",
            "project2-desc": "Conception de ce site vitrine interactif, multilingue et animé pour présenter mes compétences.", 
            "project2-code": "Voir le Code",
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
            "nav-about": "About",
            "nav-portfolio": "Portfolio",
            "nav-education": "Education",
            "nav-experience": "Experience",
            "nav-references": "References",
            "nav-contact": "Contact",
            "nav-cv": "Download CV",
            "hero-title": "Kamil CINAR",
            "hero-subtitle": "Computer Science student, passionate developer focused on creating modern and efficient software solutions.",
            "about-title": "About Me",
            "about-info-title": "Info & Contact",
            "about-info-age": "May 1, 2006 (19 years old)",
            "about-info-location": "Annecy (74), France",
            "about-info-linkedin": "Kamil CINAR",
            "about-hobbies-title": "Passions & Hobbies",
            "about-hobbies-1": "Learning piano",
            "about-hobbies-2": "Video production and editing",
            "about-hobbies-3": "Programming & Tech watch",
            "about-hobbies-4": "The automotive world",
            "about-hobbies-5": "I take volleyball classes",
            "about-lang-title": "Languages",
            "about-lang-1a": "French:",
            "about-lang-1b": "Native (C2)",
            "about-lang-2a": "English:",
            "about-lang-2b": "Upper-Intermediate (B2)",
            "about-lang-3a": "Spanish:",
            "about-lang-3b": "Pre-Intermediate (A2)",
            "about-lang-4a": "Japanese:",
            "about-lang-4b": "Beginner (A0)",
            "about-lang-5a": "Turkish:",
            "about-lang-5b": "Bilingual (C2)",
            "about-soft-title": "General Skills",
            "about-soft-1": "Innovative, dynamic, and confident",
            "about-soft-2": "Trustworthy & Responsible",
            "about-soft-3": "Adaptable & Eager to learn",
            "about-soft-4": "Rigor & Quality control",
            "about-tech-title": "Technical Skills",
            "about-tech-front": "Frontend",
            "about-tech-back": "Backend",
            "about-tech-tools": "Tools & Web",
            "about-tech-seo": "SEO Principles",

            "lbl-date": "Date",
            "lbl-context": "Context",
            "lbl-role": "Role",
            "lbl-status": "Status",
            "status-wip": "In Progress",
            "status-done": "Finished",

            "portfolio-title": "Portfolio",
            "portfolio-intro": "Here are the projects I have worked on, presented as case studies.", 
            "project1-title": "FIFA Website Clone Project", 
            "project1-desc": "Development of a FIFA website clone to learn web architecture. Used <strong>HTML5/CSS3</strong> for structure and <strong>JavaScript</strong> for dynamism.", 
            "project1-code": "In progress ...", 
            "project2-title": "My Portfolio",
            "project2-desc": "Designed this portfolio (current site) to showcase my skills. Integrated <strong>Canvas JS</strong> animations and a vanilla <strong>JavaScript</strong> multilingual system.", 
            "project2-code": "View Code",
            "project3-title": "Management App (Loxam)",
            "project3-desc": "Creation of a heavy ERP for equipment rental management and stock control.",
            
            "education-title": "Education",
            "edu1-date": "2024 - 2027 (expected)",
            "edu1-title": "University Diploma in Computer Science - IAMSI Path",
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

       
        if (lang === 'en') {
            if(skillsFr) skillsFr.style.display = 'none';
            if(skillsEn) skillsEn.style.display = 'grid';
        } else {
            if(skillsFr) skillsFr.style.display = 'grid';
            if(skillsEn) skillsEn.style.display = 'none';
        }

     
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
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
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- STARFIELD ---
    const canvas = document.getElementById('starfield');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];
        let shootingStars = [];
        let time = 0; 

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createStaticStars = () => {
            stars = []; 
            const starCount = 250; 
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                    baseOpacity: Math.random() * 0.5 + 0.1, 
                    opacity: Math.random() * 0.5 + 0.1,
                    twinkleSpeed: Math.random() * 0.02 + 0.005
                });
            }
        };

        const drawStaticStars = () => {
            stars.forEach(star => {
                star.opacity = star.baseOpacity + Math.sin(time * star.twinkleSpeed) * (star.baseOpacity * 0.5);
                ctx.fillStyle = `rgba(218, 191, 255, ${star.opacity})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        const createShootingStar = () => {
            shootingStars.push({
                x: Math.random() * canvas.width + (canvas.width * 0.2), 
                y: Math.random() * (canvas.height * 0.2) - (canvas.height * 0.1), 
                size: Math.random() * 2 + 0.5,     
                speed: Math.random() * 8 + 5,     
                length: Math.random() * 150 + 80   
            });
        };

        const drawShootingStars = () => {
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const s = shootingStars[i];
                s.x -= s.speed;
                s.y += s.speed * 0.7;
                if (s.x < -s.length || s.y > canvas.height + s.length) {
                    shootingStars.splice(i, 1);
                    continue;
                }
                const gradient = ctx.createLinearGradient(s.x, s.y, s.x + s.length, s.y - s.length * 0.7);
                const opacity = 1 - (s.x / (canvas.width * 1.5)); 
                gradient.addColorStop(0, `rgba(218, 191, 255, ${opacity * 0.8})`);
                gradient.addColorStop(1, `transparent`);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = s.size;
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x + s.length, s.y - s.length * 0.7); 
                ctx.stroke();
            }
        };

        const animate = () => {
            time++; 
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
            drawStaticStars();    
            drawShootingStars();  
            requestAnimationFrame(animate); 
        };
        
        setCanvasSize();
        createStaticStars();
        const spawnShootingStar = () => {
            createShootingStar();
            setTimeout(spawnShootingStar, Math.random() * 5000 + 2000); 
        };
        animate();
        spawnShootingStar(); 
   
        window.addEventListener('resize', () => {
            setCanvasSize();
            createStaticStars(); 
            shootingStars = []; 
        });
    }

    // Scroll Observer
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

   
    const sections = document.querySelectorAll('section'); 
    const navLinks = document.querySelectorAll('.nav-menu a');

    const onScroll = () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; 
            const sectionId = current.getAttribute('id');
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-menu a[href='#${sectionId}']`);
                navLinks.forEach(link => link.classList.remove('active'));
                if (activeLink) activeLink.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', onScroll);
    

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

    const halo = document.querySelector('.cursor-halo');
    if (halo) {
        window.addEventListener('mousemove', (e) => {
            window.requestAnimationFrame(() => {
                halo.style.left = `${e.clientX}px`;
                halo.style.top = `${e.clientY}px`;
            });
        });
    }
});
