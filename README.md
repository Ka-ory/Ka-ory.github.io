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



## Dépendances externes (versions figées)

- Three.js 0.160.0 et GSAP 3.12.5 + ScrollTrigger, via jsDelivr.
- Polices Big Shoulders Display, Instrument Sans et IBM Plex Mono, via Google Fonts (`display=swap`).

