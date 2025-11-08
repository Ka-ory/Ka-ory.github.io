// Fichier main.js

// Attend que tout le contenu de la page soit chargé
document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // ANIMATION "FADE-IN" AU DÉFILEMENT (NOUVEAU)
    // =============================================
    
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
