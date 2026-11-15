# Portfolio de Kamil CINAR

Site : https://ka-ory.github.io

Portfolio bilingue (FR / EN) en fichiers statiques, hébergé sur GitHub Pages. Une scène 3D unique reste fixée derrière la page : des écrans, des bases de données et des nœuds d'API flottent, puis se relient par des flux lumineux à mesure que l'on descend. Le scroll natif n'est jamais bloqué.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | La page : accueil, profil, projets, parcours, contact |
| `style.css` | Tout le design (palette graphite + laiton) |
| `main.js` | Données des fiches projets, langue, animations, fiche détaillée. Fonctionne seul |
| `scene.js` | Scène 3D, chargée en différé seulement si l'appareil le permet |
| `favicon.svg` | Icône de l'onglet |
| `images/` | Captures des projets (WebP) |


Aucune compilation : on modifie un fichier, on pousse, GitHub Pages publie.

## Tester

Ouvre `index.html` dans un navigateur (une connexion Internet est nécessaire pour la 3D et les polices).

- `index.html?3d=off` : version statique, celle des appareils lents et du mode « réduire les animations ».
- `index.html?3d=force` : impose la 3D, même si l'appareil est jugé trop lent.
- `index.html#projet-odoo` : ouvre directement une fiche (`odoo`, `kctech`, `namerakorp`, `amg`, `loxam`, `fifa`, `portfolio`, `annuaire`).

## Comment ça marche

- **Les formations 3D.** Chaque `<section>` porte un attribut `data-scene` (0 à 4). `main.js` mesure le scroll une fois par image et indique à `scene.js` la formation de départ, celle d'arrivée et le mélange entre les deux. Dans `scene.js`, la fonction `formation()` dit où va chaque module pour chaque section.
- **Le flou de profondeur** est calculé dans les shaders : plus un module est loin du plan de netteté, plus ses bords fondent et plus sa texture est floue.
- **Les replis.** La 3D n'est pas lancée si le visiteur a demandé moins d'animations, si l'appareil est faible (peu de mémoire ou de cœurs, économie de données, batterie basse) ou si WebGL manque. Si Three.js ne se charge pas ou si l'affichage est trop lent, la scène est détruite et l'illustration statique reprend la place. Sans GSAP, seule la parallaxe disparaît.
- **Lisibilité.** Aucun texte secondaire n'est posé directement sur la 3D : il y a toujours une carte de verre (`.glass`) ou un voile (`.veil`) derrière.
- **Ajouter un projet.** Une carte dans `index.html` (bloc `<article class="project">`, avec `data-id`) et une entrée du même `id` dans le tableau `PROJECTS` de `main.js`, puis l'`id` dans `ORDER`.

## Dépendances externes (versions figées)

- Three.js 0.160.0 et GSAP 3.12.5 + ScrollTrigger, via jsDelivr.
- Polices Big Shoulders Display, Instrument Sans et IBM Plex Mono, via Google Fonts (`display=swap`).

Si l'une d'elles ne répond pas, le site reste complet : polices système, pas de parallaxe, illustration statique à la place de la 3D.
