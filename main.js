// Fichier main.js COMPLET (avec Burger)

// Attend que tout le contenu de la page soit chargé
document.addEventListener('DOMContentLoaded', () => { // <--- UN SEUL listener START

    // =============================================
    // NOUVEAU : ANIMATION COMPLÈTE DU CIEL
    // =============================================
    const canvas = document.getElementById('starfield');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];
        let shootingStars = [];
        let time = 0; // Un compteur pour l'animation de clignotement

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // --- 1. ÉTOILES FIXES (CLIGNOTANTES) ---
        const createStaticStars = () => {
            stars = []; // Vider le tableau pour le redimensionnement
            const starCount = 250; // Augmentez si vous voulez plus d'étoiles

            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                    // Opacité de base + vitesse de clignotement uniques
                    baseOpacity: Math.random() * 0.5 + 0.1, // Plus sombres (0.1 à 0.6)
                    opacity: Math.random() * 0.5 + 0.1,
                    twinkleSpeed: Math.random() * 0.02 + 0.005
                });
            }
        };

        const drawStaticStars = () => {
            stars.forEach(star => {
                // Logique de clignotement : utilise un sinus pour un pulse doux
                star.opacity = star.baseOpacity + Math.sin(time * star.twinkleSpeed) * (star.baseOpacity * 0.5);

                ctx.fillStyle = `rgba(218, 191, 255, ${star.opacity})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        // --- 2. ÉTOILES FILANTES (ALÉATOIRES) ---
        const createShootingStar = () => {
            shootingStars.push({
                x: Math.random() * canvas.width + (canvas.width * 0.2), // Commence en haut à droite
                y: Math.random() * (canvas.height * 0.2) - (canvas.height * 0.1), // Commence au-dessus
                size: Math.random() * 2 + 0.5,     // Taille aléatoire
                speed: Math.random() * 8 + 5,      // Vitesse aléatoire
                length: Math.random() * 150 + 80   // Longueur aléatoire
            });
        };

        const drawShootingStars = () => {
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const s = shootingStars[i];

                // Mouvement (diagonale haut-droite vers bas-gauche)
                s.x -= s.speed;
                s.y += s.speed * 0.7; // Angle

                // Si l'étoile sort de l'écran, on la supprime
                if (s.x < -s.length || s.y > canvas.height + s.length) {
                    shootingStars.splice(i, 1);
                    continue;
                }

                // Dessiner la "queue"
                const gradient = ctx.createLinearGradient(s.x, s.y, s.x + s.length, s.y - s.length * 0.7);
                const opacity = 1 - (s.x / (canvas.width * 1.5)); // Devient transparente en sortant
                gradient.addColorStop(0, `rgba(218, 191, 255, ${opacity * 0.8})`);
                gradient.addColorStop(1, `transparent`);

                ctx.strokeStyle = gradient;
                ctx.lineWidth = s.size;
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x + s.length, s.y - s.length * 0.7); // Angle de la queue
                ctx.stroke();
            }
        };

        // --- 3. BOUCLE D'ANIMATION ---
        const animate = () => {
            time++; // Incrémente le temps pour le clignotement
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Nettoie la toile
            
            drawStaticStars();    // Dessine les étoiles fixes (qui clignotent)
            drawShootingStars();  // Dessine les étoiles filantes
            
            requestAnimationFrame(animate); // Demande la prochaine frame
        };

        // --- 4. INITIALISATION ---
        setCanvasSize();
        createStaticStars();
        
        // Crée une nouvelle étoile filante à un intervalle aléatoire (moins redondant)
        const spawnShootingStar = () => {
            createShootingStar();
            // Prochaine étoile dans 2 à 7 secondes
            setTimeout(spawnShootingStar, Math.random() * 5000 + 2000); 
        };
        
        // Lancement
        animate();
        spawnShootingStar(); // Lance la première étoile filante

        // Recalcule si la fenêtre change de taille
        window.addEventListener('resize', () => {
            setCanvasSize();
            createStaticStars(); // Recrée les étoiles fixes pour la nouvelle taille
            shootingStars = []; // Vide les étoiles filantes en cours
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
// =============================================
    // NOUVEAU : GESTION DU HALO DE CURSEUR
    // =============================================
    const halo = document.querySelector('.cursor-halo');
    if (halo) {
        window.addEventListener('mousemove', (e) => {
            // Utilise requestAnimationFrame pour la performance
            window.requestAnimationFrame(() => {
                halo.style.left = `${e.clientX}px`;
                halo.style.top = `${e.clientY}px`;
            });
        });
    }

}); // <--- Assurez-vous que c'est AVANT ce crochet de fin !
