// Fichier main.js

// Attend que tout le contenu de la page soit chargé
document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // ANIMATION "FADE-IN" AU DÉFILEMENT (NOUVEAU)
    // =============================================
    const canvas = document.getElementById('starfield');
    
    // On vérifie si le canvas existe avant de continuer
    if (canvas) {
        const ctx = canvas.getContext('2d');

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const drawStars = () => {
            // Nettoie la toile
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Nombre d'étoiles (ajustez si vous voulez)
            const starCount = 200; 

            for (let i = 0; i < starCount; i++) {
                // Position X aléatoire
                const x = Math.random() * canvas.width;
                // Position Y aléatoire
                const y = Math.random() * canvas.height;
                // Taille aléatoire (entre 0.5px et 2px)
                const radius = Math.random() * 1.5 + 0.5;
                // Opacité aléatoire (pour l'effet de profondeur)
                const opacity = Math.random() * 0.5 + 0.2; 

                // Couleur (violet clair)
                ctx.fillStyle = `rgba(218, 191, 255, ${opacity})`;

                // Dessine le cercle
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        // Initialisation
        setCanvasSize();
        drawStars();

        // (Optionnel) Recalcule si la fenêtre change de taille
        window.addEventListener('resize', () => {
            setCanvasSize();
            drawStars();
        });
    }

    // ... Le reste de votre code (IntersectionObserver, Burger Menu, etc.)
    // ... S'ils ne sont pas déjà dans un 'DOMContentLoaded', 
    // ... laissez-les où ils sont.
});
    // Sélectionne tous les éléments qu'on veut animer
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    // Crée un "observateur"
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si l'élément est à l'écran (visible)
            if (entry.isIntersecting) {
                // On lui ajoute la classe "is-visible" (qui se trouve dans le CSS)
                entry.target.classList.add('is-visible');
                // On arrête de l'observer pour ne pas répéter l'animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // L'animation se déclenche quand 10% de l'élément est visible
    });

    // Demande à l'observateur de surveiller chaque élément
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });


    // =============================================
    // MISE À JOUR DU NAVBAR AU DÉFILEMENT (ACTIF)
    // =============================================

    // Sélectionne toutes les sections qui ont un ID
    const sections = document.querySelectorAll('section[id], header[id]');
    
    // Sélectionne tous les liens dans le menu de navigation
    const navLinks = document.querySelectorAll('.nav-menu a');

    const onScroll = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // On ajuste le "offsetTop" avec la hauteur du navbar
            const sectionTop = current.offsetTop - 70; 
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // On trouve le lien qui correspond à l'ID de la section
                const activeLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);
                
                // On enlève 'active' de tous les liens
                navLinks.forEach(link => link.classList.remove('active'));
                
                // On ajoute 'active' au bon lien
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    // Écoute l'événement 'scroll'
    window.addEventListener('scroll', onScroll);

});
