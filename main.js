document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Langue FR / EN --- */
    // Le français est écrit directement dans le HTML ; l'anglais est dans l'attribut data-en.
    const translatable = document.querySelectorAll('[data-en]');
    translatable.forEach(el => el.dataset.fr = el.innerHTML.trim());

    const langButtons = document.querySelectorAll('.lang-switcher button');
    const cvLink = document.querySelector('.nav-cv-button');

    function setLanguage(lang) {
        translatable.forEach(el => {
            el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.fr;
        });
        langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
        document.documentElement.lang = lang;
        if (cvLink) cvLink.href = lang === 'en' ? 'images/cv-kamil-en.pdf' : 'images/cv-kamil-fr.pdf';
        try { localStorage.setItem('lang', lang); } catch (e) { /* stockage indisponible */ }
    }

    langButtons.forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));

    let savedLang = null;
    try { savedLang = localStorage.getItem('lang'); } catch (e) { /* stockage indisponible */ }
    if (savedLang === 'en') setLanguage('en');

    /* --- 2. Menu mobile --- */
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    function closeMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', () => {
        const open = navMenu.classList.toggle('active');
        navToggle.classList.toggle('active', open);
        navToggle.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
    });
    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', closeMenu));

    /* --- 3. Filtres des projets --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            projects.forEach(p => {
                p.classList.toggle('hidden', filter !== 'all' && p.dataset.category !== filter);
            });
        });
    });

    /* --- 4. Apparition douce des sections --- */
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        reveals.forEach(el => revealObserver.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('is-visible'));
    }

    /* --- 5. Lien actif dans la navigation --- */
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = [...document.querySelectorAll('main > section')];
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.toggle('current', l.getAttribute('href') === '#' + entry.target.id));
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => sectionObserver.observe(s));
});
