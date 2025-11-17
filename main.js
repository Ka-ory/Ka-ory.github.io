document.addEventListener('DOMContentLoaded', () => { 

    // =============================================
    // ANIMATION DU CIEL
    // =============================================
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

        // --- 1. ÉTOILES FIXES (CLIGNOTANTES) ---
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

        // --- 2. ÉTOILES FILANTES (ALÉATOIRES) ---
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
        // --- 3. ÉTOILES ANIMATIONS (ALÉATOIRES) ---
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
    const sections = document.querySelectorAll('#accueil, #apropos, #portfolio, #formation, #experience, #references, #contact');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const onScroll = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 70; 
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-menu a[href='#${sectionId}']`);
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

    if (navToggle && navMenu) {
        const toggleMenu = () => {
            navToggle.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
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
    // =============================================
    // NOUVEAU : GESTION DU HALO DE CURSEUR
    // =============================================
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
