// Fichier main.js COMPLET (avec Burger)

// Attend que tout le contenu de la page soit chargé
document.addEventListener('DOMContentLoaded', () => { // <--- UN SEUL listener START

    // =============================================
    // NOUVEAU : GÉNÉRATION D'ÉTOILES ALÉATOIRES
    // =============================================
    const canvas = document.getElementById('starfield');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const starCount = 200; 

            for (let i = 0; i < starCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const radius = Math.random() * 1.5 + 0.5;
                const opacity = Math.random() * 0.5 + 0.2; 

                ctx.fillStyle = `rgba(218, 191, 255, ${opacity})`;

                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        setCanvasSize();
        drawStars();
        window.addEventListener('resize', () => {
            setCanvasSize();
            drawStars();
        });
    }

    // =============================================
    // ANIMATION "FADE-IN" AU DÉFILEMENT
    // =============================================
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // =============================================
    // MISE À JOUR DU NAVBAR AU DÉFILEMENT
    // =============================================
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const onScroll = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 70; 
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);
                navLinks.forEach(link => link.classList.remove('active'));
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };
    window.addEventListener('scroll', onScroll);

    
    // =============================================
    // GESTION DU MENU BURGER (CODE AJOUTÉ)
    // =============================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.mobile-nav');
    const navLinksMobile = document.querySelectorAll('.mobile-nav .nav-link');

    // On vérifie que les éléments existent (au cas où)
    if (navToggle && navMenu) {
        const toggleMenu = () => {
            navToggle.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
        };

        navToggle.addEventListener('click', toggleMenu);

        // Bonus : Ferme le menu quand on clique sur un lien
        navLinksMobile.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('is-active')) {
                    toggleMenu();
                }
            });
        });
    }

}); // <--- UN SEUL listener END
