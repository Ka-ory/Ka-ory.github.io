/* ==========================================================================
   Portfolio Kamil CINAR · scène 3D (Three.js, chargé en différé depuis le CDN)

   Idée : des modules applicatifs flottent en désordre (écrans, bases de
   données, nœuds d'API), puis se relient par des flux lumineux pour former
   un système d'information. Chaque section de la page a sa formation :
     0  nuée      (accueil)   modules épars, un écran « héros » relié à une API et une base
     1  couches   (profil)    base de données -> API -> interface, les liens s'allument au scroll
     2  grille    (projets)   mur de modules, un balayage lumineux le parcourt
     3  ligne     (parcours)  flux chronologique, une impulsion suit le scroll
     4  hub       (contact)   tout converge vers un nœud unique

   Aucune dépendance à GSAP. Si Three.js ne se charge pas, init() rejette et
   main.js garde la version statique.
   Exposé : window.PortfolioScene.init(options) -> Promise<api>
   ========================================================================== */
(function () {
  'use strict';

  var THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js';

  /* Palette (identique à style.css) */
  var C = { bg: '#0d0f12', brass: '#c9b48a', brassHi: '#e6d6ae', bone: '#ece6d8', metal: '#2b3038', glow: '#d9c59a' };

  function withTimeout(p, ms) {
    return Promise.race([p, new Promise(function (_, rej) { setTimeout(function () { rej(new Error('Three.js : délai dépassé')); }, ms); })]);
  }
  /* Générateur pseudo-aléatoire à graine : la scène est identique à chaque visite */
  function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function smooth(a, b, v) { var t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  function fontsReady() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    return withTimeout(Promise.all([document.fonts.load('500 14px "IBM Plex Mono"'), document.fonts.load('600 20px "Instrument Sans"')]), 1500).catch(function () {});
  }

  /* ---------- Textures dessinées en canvas : quatre écrans fictifs ----------
     Aucune donnée réelle : des blocs, des barres et quelques libellés génériques. */
  var MONO = '"IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace';
  function chrome(c, title) {
    var g = c.createLinearGradient(0, 0, 640, 480); g.addColorStop(0, '#1a1f26'); g.addColorStop(1, '#11151a');
    c.fillStyle = g; c.fillRect(0, 0, 640, 480);
    c.fillStyle = '#222831'; c.fillRect(0, 0, 640, 46);
    c.fillStyle = 'rgba(201,180,138,.55)'; c.fillRect(0, 46, 640, 2);
    ['#e8674f', '#c9b48a', '#6d7480'].forEach(function (col, i) { c.fillStyle = col; c.beginPath(); c.arc(26 + i * 22, 23, 6, 0, 6.2832); c.fill(); });
    c.fillStyle = '#ece6d8'; c.font = '500 17px ' + MONO; c.textBaseline = 'middle'; c.fillText(title, 104, 24);
    c.strokeStyle = 'rgba(201,180,138,.5)'; c.lineWidth = 4; c.strokeRect(2, 2, 636, 476);
  }
  function bar(c, x, y, w, h, col) { c.fillStyle = col; c.fillRect(x, y, w, h); }
  var SCREENS = [
    function (c) { /* Tableau de bord ERP */
      chrome(c, 'erp · tableau de bord');
      for (var i = 0; i < 3; i++) {
        bar(c, 28 + i * 200, 72, 184, 92, '#1e242c'); bar(c, 44 + i * 200, 90, 70, 9, 'rgba(236,230,216,.35)');
        bar(c, 44 + i * 200, 116, 110 - i * 18, 26, i === 0 ? '#c9b48a' : '#ece6d8');
      }
      bar(c, 28, 190, 584, 262, '#1e242c');
      var h = [70, 118, 92, 150, 128, 186, 160, 204, 176, 222];
      h.forEach(function (v, k) { bar(c, 56 + k * 54, 430 - v, 30, v, k === 7 ? '#e6d6ae' : 'rgba(201,180,138,.62)'); });
      bar(c, 44, 430, 552, 2, 'rgba(236,230,216,.3)');
    },
    function (c) { /* Liste de documents */
      chrome(c, 'devis · factures');
      bar(c, 28, 70, 584, 34, '#262d36');
      [40, 190, 380, 520].forEach(function (x, k) { bar(c, x, 82, [90, 120, 70, 60][k], 9, 'rgba(236,230,216,.5)'); });
      for (var r = 0; r < 8; r++) {
        var y = 124 + r * 42;
        bar(c, 40, y, 96, 10, '#c9b48a'); bar(c, 190, y, 110 + (r * 47 % 70), 10, 'rgba(236,230,216,.38)');
        bar(c, 380, y, 60, 10, 'rgba(236,230,216,.38)');
        c.fillStyle = r % 3 === 0 ? 'rgba(232,103,79,.85)' : 'rgba(201,180,138,.8)'; c.beginPath(); if (c.roundRect) c.roundRect(520, y - 6, 72, 22, 11); else c.rect(520, y - 6, 72, 22); c.fill();
        bar(c, 28, y + 26, 584, 1, 'rgba(236,230,216,.12)');
      }
    },
    function (c) { /* Éditeur de code */
      chrome(c, 'api.py');
      bar(c, 0, 48, 52, 432, '#161a20');
      var rows = [[0, 120, '#c9b48a'], [1, 210, '#ece6d8'], [1, 150, '#8f98a6'], [2, 240, '#ece6d8'], [2, 110, '#e8674f'], [1, 90, '#c9b48a'], [0, 0, ''], [0, 160, '#c9b48a'], [1, 260, '#ece6d8'], [2, 180, '#8f98a6'], [2, 130, '#ece6d8'], [1, 70, '#c9b48a']];
      rows.forEach(function (r, k) {
        var y = 74 + k * 32; bar(c, 16, y, 20, 8, 'rgba(236,230,216,.22)');
        if (r[1]) { bar(c, 72 + r[0] * 34, y, r[1], 10, r[2]); if (k % 3 === 1) bar(c, 84 + r[0] * 34 + r[1], y, 80, 10, 'rgba(236,230,216,.3)'); }
      });
    },
    function (c) { /* Site web */
      chrome(c, 'site web');
      bar(c, 28, 70, 584, 170, '#1e242c'); bar(c, 52, 104, 250, 20, '#ece6d8'); bar(c, 52, 138, 190, 12, 'rgba(236,230,216,.4)'); bar(c, 52, 160, 220, 12, 'rgba(236,230,216,.4)');
      c.fillStyle = '#c9b48a'; c.beginPath(); if (c.roundRect) c.roundRect(52, 192, 120, 30, 8); else c.rect(52, 192, 120, 30); c.fill();
      bar(c, 400, 94, 180, 122, 'rgba(201,180,138,.28)');
      for (var i = 0; i < 3; i++) { bar(c, 28 + i * 200, 262, 184, 190, '#1e242c'); bar(c, 44 + i * 200, 278, 152, 90, 'rgba(236,230,216,.14)'); bar(c, 44 + i * 200, 386, 120, 10, '#ece6d8'); bar(c, 44 + i * 200, 410, 90, 8, 'rgba(236,230,216,.35)'); }
    }
  ];
  function makeAtlas(THREE, lite) {
    var cw = lite ? 512 : 1024, chh = lite ? 384 : 768;
    var cv = document.createElement('canvas'); cv.width = cw * 4; cv.height = chh; var c = cv.getContext('2d');
    SCREENS.forEach(function (draw, i) { c.save(); c.translate(i * cw, 0); c.scale(cw / 640, chh / 480); draw(c); c.restore(); });
    var tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.generateMipmaps = true; tex.minFilter = THREE.LinearMipmapLinearFilter;
    return tex;
  }

  /* ---------- Shaders ----------
     La profondeur de champ est simulée dans les shaders : plus un module est
     loin du plan de netteté (uFocus), plus ses bords fondent et plus sa
     texture est lue dans un niveau de mipmap flou. */
  var SCREEN_VS = [
    'attribute float aSeed; attribute float aCell; attribute float aFade;',
    'uniform float uTime, uFocus, uRange;',
    'varying vec2 vUv; varying float vDef, vFade, vDepth, vCell; varying vec3 vN, vView;',
    'void main(){',
    '  vUv = uv; vCell = aCell; vFade = aFade;',
    '  mat4 mv = modelViewMatrix * instanceMatrix; vec4 mp = mv * vec4(position, 1.);',
    '  vN = normalize(mat3(mv) * normal); vView = -mp.xyz; vDepth = -mp.z;',
    '  vDef = clamp(abs(vDepth - uFocus) / uRange, 0., 1.);',
    '  gl_Position = projectionMatrix * mp;',
    '}'
  ].join('\n');
  var SCREEN_FS = [
    'uniform sampler2D uMap; uniform vec3 uFog, uSpec, uLight;',
    'uniform float uCells, uFogNear, uFogFar, uSweep, uFlash, uBlur;',
    'varying vec2 vUv; varying float vDef, vFade, vDepth, vCell; varying vec3 vN, vView;',
    'void main(){',
    '  vec3 N = normalize(vN); bool front = gl_FrontFacing; if(!front) N = -N;',
    '  /* Coins arrondis + bords qui fondent avec le flou */',
    '  vec2 half_ = vec2(.6667, .5); float rad = .045;',
    '  vec2 q = abs((vUv - .5) * vec2(1.3333, 1.)) - (half_ - rad);',
    '  float sd = length(max(q, 0.)) + min(max(q.x, q.y), 0.) - rad;',
    '  float e = mix(.006, .16, vDef * sqrt(vDef));',
    '  float a = smoothstep(0., -e, sd);',
    '  vec2 uv = vec2(((front ? vUv.x : 1. - vUv.x) + vCell) / uCells, vUv.y);',
    '  uv.x = clamp(uv.x, (vCell + .004) / uCells, (vCell + .996) / uCells);',
    '  vec3 col = texture2D(uMap, uv, vDef * uBlur).rgb;',
    '  if(!front) col = mix(col, vec3(.09, .1, .12), .85);',
    '  vec3 V = normalize(vView), L = normalize(uLight);',
    '  float diff = abs(dot(N, L));',
    '  float spec = pow(max(dot(N, normalize(L + V)), 0.), 48.);',
    '  float fres = pow(1. - abs(dot(N, V)), 3.);',
    '  col = col * (.72 + .38 * diff) + uSpec * (spec * .55 + fres * .22);',
    '  /* Reflet qui balaie l\'écran */',
    '  float sw = smoothstep(.14, 0., abs(vUv.x * .8 + vUv.y * .5 - uSweep));',
    '  col += uSpec * (sw * .14 + uFlash * .35);',
    '  col = mix(col, uFog, smoothstep(uFogNear, uFogFar, vDepth));',
    '  col = mix(uFog, col, vFade);',
    '  a *= smoothstep(.7, 2.4, vDepth) * smoothstep(0., .12, vFade);',
    '  gl_FragColor = vec4(col, a);',
    '  #include <colorspace_fragment>',
    '}'
  ].join('\n');

  /* Volumes (bases de données, nœuds d'API) : métal sombre, liseré laiton */
  var SOLID_VS = [
    'attribute float aFade;',
    'uniform float uFocus, uRange;',
    'varying vec2 vUv; varying float vDef, vFade, vDepth; varying vec3 vN, vView, vObjN;',
    'void main(){',
    '  vUv = uv; vFade = aFade; vObjN = normal;',
    '  mat4 mv = modelViewMatrix * instanceMatrix; vec4 mp = mv * vec4(position, 1.);',
    '  vN = normalize(mat3(mv) * normal); vView = -mp.xyz; vDepth = -mp.z;',
    '  vDef = clamp(abs(vDepth - uFocus) / uRange, 0., 1.);',
    '  gl_Position = projectionMatrix * mp;',
    '}'
  ].join('\n');
  var SOLID_FS = [
    'uniform vec3 uBase, uRim, uSpec, uFog, uLight;',
    'uniform float uFlat, uBands, uFogNear, uFogFar, uTime;',
    'varying vec2 vUv; varying float vDef, vFade, vDepth; varying vec3 vN, vView, vObjN;',
    'void main(){',
    '  vec3 V = normalize(vView);',
    '  /* uFlat : normale par facette (nœuds d\'API taillés), sinon normale lissée (cylindres) */',
    '  vec3 N = uFlat > .5 ? normalize(cross(dFdx(vView), dFdy(vView))) : normalize(vN);',
    '  if(dot(N, V) < 0.) N = -N;',
    '  vec3 L = normalize(uLight);',
    '  float diff = max(dot(N, L), 0.);',
    '  float fres = pow(1. - max(dot(N, V), 0.), 2.2);',
    '  float spec = pow(max(dot(N, normalize(L + V)), 0.), 36.);',
    '  vec3 col = uBase * (.4 + .95 * diff) + uRim * fres * .8 + uSpec * spec * .7;',
    '  if(uBands > .5){',
    '    /* Trois « disques » empilés : joints lumineux sur le flanc du cylindre */',
    '    float side = step(abs(vObjN.y), .5);',
    '    float s = abs(fract(vUv.y * 3. + .5) - .5);',
    '    float line = smoothstep(.04, 0., s) * side;',
    '    col += uRim * line * (.75 + .25 * sin(uTime * 1.4 + vUv.x * 12.566));',
    '  }',
    '  col = mix(col, uFog, smoothstep(uFogNear, uFogFar, vDepth));',
    '  col = mix(uFog, col, vFade * mix(1., .62, vDef));',
    '  float a = smoothstep(0., .12, vFade) * smoothstep(.7, 2.4, vDepth) * mix(1., .55, vDef);',
    '  gl_FragColor = vec4(col, a);',
    '  #include <colorspace_fragment>',
    '}'
  ].join('\n');

  /* Flux lumineux : un ruban orienté vers la caméra entre deux modules,
     parcouru par des impulsions. */
  var LINK_VS = [
    'attribute vec3 aA; attribute vec3 aB; attribute float aSeed; attribute float aOp;',
    'uniform float uWidth;',
    'varying vec2 vUv; varying float vOp, vSeed, vLen;',
    'void main(){',
    '  vec4 a = modelViewMatrix * vec4(aA, 1.), b = modelViewMatrix * vec4(aB, 1.);',
    '  vec4 p = mix(a, b, position.x);',
    '  vec2 d = b.xy / max(-b.z, .1) - a.xy / max(-a.z, .1);',
    '  vec2 n = normalize(vec2(-d.y, d.x) + 1e-6);',
    '  p.xy += n * position.y * uWidth * (1. + max(-p.z, 0.) * .045);',
    '  vUv = vec2(position.x, position.y + .5); vOp = aOp; vSeed = aSeed; vLen = distance(aA, aB);',
    '  gl_Position = projectionMatrix * p;',
    '}'
  ].join('\n');
  var LINK_FS = [
    'uniform vec3 uColor; uniform float uTime;',
    'varying vec2 vUv; varying float vOp, vSeed, vLen;',
    'void main(){',
    '  float across = 1. - abs(vUv.y - .5) * 2.;',
    '  float core = pow(across, 2.5);',
    '  float pulse = pow(.5 + .5 * sin((vUv.x * max(vLen, 1.) * .22 - uTime * .32 + vSeed) * 6.2831), 10.);',
    '  float ends = smoothstep(0., .06, vUv.x) * smoothstep(1., .94, vUv.x);',
    '  float a = (.2 + pulse * 1.1) * core * ends * vOp;',
    '  gl_FragColor = vec4(uColor * (1. + pulse * .6), a);',
    '  #include <colorspace_fragment>',
    '}'
  ].join('\n');

  var DUST_VS = [
    'attribute float aSize; attribute float aPhase; uniform float uTime, uPx, uScroll; varying float vA;',
    'void main(){',
    '  vec3 p = position; p.y = mod(p.y + uScroll * (.4 + aPhase) + sin(uTime * .2 + aPhase * 40.) * .3 + 9., 18.) - 9.;',
    '  p.x += sin(uTime * .15 + aPhase * 25.) * .4;',
    '  vec4 mp = modelViewMatrix * vec4(p, 1.); float depth = -mp.z;',
    '  gl_PointSize = aSize * uPx / max(depth, .5);',
    '  vA = (.4 + .6 * (.5 + .5 * sin(uTime * .9 + aPhase * 60.))) * smoothstep(34., 12., depth) * smoothstep(1., 4., depth);',
    '  gl_Position = projectionMatrix * mp;',
    '}'
  ].join('\n');
  var DUST_FS = [
    'uniform vec3 uColor; uniform float uOpacity; varying float vA;',
    'void main(){ float d = length(gl_PointCoord - .5); float a = smoothstep(.5, .05, d) * vA * uOpacity; gl_FragColor = vec4(uColor, a);',
    '  #include <colorspace_fragment>',
    '}'
  ].join('\n');

  /* ====================================================================== */
  async function init(opts) {
    opts = opts || {};
    var THREE = await withTimeout(import(THREE_URL), opts.timeout || 9000);
    var canvas = opts.canvas, lite = !!opts.lite;
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: !lite, alpha: false, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: !opts.force });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 2));
    var fogColor = new THREE.Color(C.bg);
    renderer.setClearColor(fogColor, 1);

    await fontsReady();

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(40, 1, 0.1, 90);
    var W = 1, H = 1, aspect = 1, portrait = false, TAN = Math.tan(THREE.MathUtils.degToRad(20));
    function hh(z) { return Math.abs(z) * TAN; }           /* demi-hauteur visible à la profondeur z */
    function hw(z) { return hh(z) * aspect; }              /* demi-largeur visible à la profondeur z */

    var rnd = mulberry(20261115);
    /* Nombre de modules par type : 0 écran, 1 base de données, 2 nœud d'API (allégé sur mobile) */
    var COUNT = lite ? [11, 5, 7] : [20, 9, 13];
    var N = COUNT[0] + COUNT[1] + COUNT[2];
    var HUB = new THREE.Vector3(0, 0.2, -15.5);

    var light = new THREE.Vector3(-.45, .6, .7);
    var focus = { value: 9 }, range = { value: 9 };        /* uniforms partagés : plan de netteté */
    var uTime = { value: 0 };

    /* ---------- Modules ---------- */
    var M = [], byType = [[], [], []];
    for (var ty = 0; ty < 3; ty++) for (var j = 0; j < COUNT[ty]; j++) {
      var o = { type: ty, ti: j, r: [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()], p: new THREE.Vector3(0, 0, -40), q: new THREE.Quaternion(), s: 1, f: 0, nuee: new THREE.Vector3(), nueeFade: 1, z: 0 };
      M.push(o); byType[ty].push(o);
    }
    /* Ordre mélangé (stable) pour la grille et la ligne : les types s'y mêlent */
    var shuffled = M.slice(); (function () { var r2 = mulberry(77); for (var k = shuffled.length - 1; k > 0; k--) { var s = Math.floor(r2() * (k + 1)); var tmp = shuffled[k]; shuffled[k] = shuffled[s]; shuffled[s] = tmp; } })();
    shuffled.forEach(function (o, k) { o.gi = k; });

    function sharedUniforms(extra) {
      var u = { uTime: uTime, uFocus: focus, uRange: range, uFog: { value: fogColor }, uFogNear: { value: 10 }, uFogFar: { value: 36 }, uSpec: { value: new THREE.Color(C.brassHi) }, uLight: { value: light } };
      for (var k in extra) u[k] = extra[k];
      return u;
    }

    /* Écrans (plans instanciés, triés du fond vers l'avant à chaque image) */
    var atlas = makeAtlas(THREE, lite); atlas.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    var nS = COUNT[0];
    var scrGeo = new THREE.PlaneGeometry(1.3333, 1);
    var sSeed = new THREE.InstancedBufferAttribute(new Float32Array(nS), 1), sCell = new THREE.InstancedBufferAttribute(new Float32Array(nS), 1), sFade = new THREE.InstancedBufferAttribute(new Float32Array(nS), 1);
    [sSeed, sCell, sFade].forEach(function (a) { a.setUsage(THREE.DynamicDrawUsage); });
    scrGeo.setAttribute('aSeed', sSeed); scrGeo.setAttribute('aCell', sCell); scrGeo.setAttribute('aFade', sFade);
    var scrMat = new THREE.ShaderMaterial({ uniforms: sharedUniforms({ uMap: { value: atlas }, uCells: { value: 4 }, uBlur: { value: 5.5 }, uSweep: { value: -1 }, uFlash: { value: 0 } }), vertexShader: SCREEN_VS, fragmentShader: SCREEN_FS, transparent: true, depthWrite: false, side: THREE.DoubleSide });
    var screens = new THREE.InstancedMesh(scrGeo, scrMat, nS); screens.instanceMatrix.setUsage(THREE.DynamicDrawUsage); screens.frustumCulled = false; screens.renderOrder = 2; scene.add(screens);
    byType[0].forEach(function (o, k) { o.cell = k === 0 ? 0 : (k * 7 + (k >> 2)) % 4; });
    var scrOrder = byType[0].slice();

    /* Volumes */
    function solidMesh(geo, n, flat, bands, base) {
      var fade = new THREE.InstancedBufferAttribute(new Float32Array(n), 1); fade.setUsage(THREE.DynamicDrawUsage); geo.setAttribute('aFade', fade);
      var mat = new THREE.ShaderMaterial({ uniforms: sharedUniforms({ uBase: { value: new THREE.Color(base) }, uRim: { value: new THREE.Color(C.brass) }, uFlat: { value: flat }, uBands: { value: bands } }), vertexShader: SOLID_VS, fragmentShader: SOLID_FS, transparent: true, depthWrite: true });
      mat.extensions = { derivatives: true };
      var mesh = new THREE.InstancedMesh(geo, mat, n); mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); mesh.frustumCulled = false; mesh.renderOrder = 1; scene.add(mesh);
      return { mesh: mesh, fade: fade };
    }
    var dbs = solidMesh(new THREE.CylinderGeometry(.46, .46, .82, lite ? 24 : 40, 1), COUNT[1], 0, 1, C.metal);
    var apis = solidMesh(new THREE.IcosahedronGeometry(.44, 0), COUNT[2], 1, 0, '#343a44');
    var solids = [null, dbs, apis];

    /* ---------- Flux : qui est relié à qui ----------
       écran -> API -> base de données, plus quelques liaisons entre API. */
    var LINKS = [];
    byType[0].forEach(function (o, k) { LINKS.push({ a: o, b: byType[2][k % COUNT[2]], hero: k === 0 }); });
    byType[2].forEach(function (o, k) { LINKS.push({ a: o, b: byType[1][k % COUNT[1]], hero: k === 0 }); if (k % 2 === 0) LINKS.push({ a: o, b: byType[2][(k + 1) % COUNT[2]] }); });
    var L = LINKS.length;
    LINKS.forEach(function (l, k) { l.ord = (k * 7 % L) / L; });
    var quad = new THREE.PlaneGeometry(1, 1); quad.translate(.5, 0, 0);
    var linkGeo = new THREE.InstancedBufferGeometry(); linkGeo.index = quad.index; linkGeo.setAttribute('position', quad.attributes.position);
    var lA = new THREE.InstancedBufferAttribute(new Float32Array(L * 3), 3), lB = new THREE.InstancedBufferAttribute(new Float32Array(L * 3), 3), lOp = new THREE.InstancedBufferAttribute(new Float32Array(L), 1), lSeed = new THREE.InstancedBufferAttribute(new Float32Array(L), 1);
    [lA, lB, lOp].forEach(function (a) { a.setUsage(THREE.DynamicDrawUsage); });
    for (var k0 = 0; k0 < L; k0++) lSeed.array[k0] = rnd();
    linkGeo.setAttribute('aA', lA); linkGeo.setAttribute('aB', lB); linkGeo.setAttribute('aOp', lOp); linkGeo.setAttribute('aSeed', lSeed); linkGeo.instanceCount = L;
    var linkMat = new THREE.ShaderMaterial({ uniforms: { uColor: { value: new THREE.Color(C.glow) }, uTime: uTime, uWidth: { value: lite ? .07 : .055 } }, vertexShader: LINK_VS, fragmentShader: LINK_FS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    var links = new THREE.Mesh(linkGeo, linkMat); links.frustumCulled = false; links.renderOrder = 1.5;   /* avant les écrans : un flux ne barre jamais un écran */ scene.add(links);

    /* ---------- Nœud central (contact) + ondes ---------- */
    var hubMat = new THREE.LineBasicMaterial({ color: new THREE.Color(C.brassHi), transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    var hub = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.15, 1)), hubMat); hub.position.copy(HUB); hub.renderOrder = 4; scene.add(hub);
    var waves = [0, 1, 2].map(function () {
      var m = new THREE.Mesh(new THREE.RingGeometry(1, 1.02, 96), new THREE.MeshBasicMaterial({ color: new THREE.Color(C.brass), transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
      m.position.copy(HUB); m.renderOrder = 4; scene.add(m); return m;
    });

    /* ---------- Poussière de laiton ---------- */
    var DN = lite ? 140 : 380, dPos = new Float32Array(DN * 3), dSize = new Float32Array(DN), dPh = new Float32Array(DN);
    for (var i = 0; i < DN; i++) { dPos[i * 3] = (rnd() * 2 - 1) * 16; dPos[i * 3 + 1] = (rnd() * 2 - 1) * 9; dPos[i * 3 + 2] = -2 - rnd() * 30; dSize[i] = .02 + rnd() * rnd() * .08; dPh[i] = rnd(); }
    var dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3)); dustGeo.setAttribute('aSize', new THREE.BufferAttribute(dSize, 1)); dustGeo.setAttribute('aPhase', new THREE.BufferAttribute(dPh, 1));
    var dustMat = new THREE.ShaderMaterial({ uniforms: { uColor: { value: new THREE.Color(C.brass) }, uTime: uTime, uPx: { value: 1 }, uScroll: { value: 0 }, uOpacity: { value: .7 } }, vertexShader: DUST_VS, fragmentShader: DUST_FS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    var dust = new THREE.Points(dustGeo, dustMat); dust.frustumCulled = false; dust.renderOrder = 0; scene.add(dust);

    /* ---------- Positions de la nuée (dépendent du format d'écran) ---------- */
    function layout() {
      var r2 = mulberry(424242);
      M.forEach(function (o) {
        for (var tries = 0; tries < 40; tries++) {
          var z = -5.5 - Math.pow(r2(), 1.25) * 20, nx = r2() * 2.3 - 1.15, ny = r2() * 2.2 - 1.1;
          var inText = portrait ? (ny > -0.75) : (nx < 0.12);       /* zone du titre et du texte */
          var inNav = ny > 0.7 && z > -11;                           /* bandeau du menu */
          var inHero = portrait ? false : (nx > 0.1 && nx < 1.05 && Math.abs(ny) < 0.85 && z > -12);
          if ((inText && z > -15) || inNav || inHero) continue;
          o.nueeFade = inText ? .45 : 1;                              /* derrière le texte : en retrait */
          o.nuee.set(nx * hw(z), ny * hh(z), z); break;
        }
      });
    }

    var lineCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(12, 5.5, -32), new THREE.Vector3(5.5, 2.4, -21), new THREE.Vector3(1.6, .5, -13.5), new THREE.Vector3(-2.6, -1.3, -8.5), new THREE.Vector3(-8.5, -3.8, -3)]);
    var tA = { p: new THREE.Vector3(), e: new THREE.Euler(), q: new THREE.Quaternion(), s: 1, f: 1 }, tB = { p: new THREE.Vector3(), e: new THREE.Euler(), q: new THREE.Quaternion(), s: 1, f: 1 };

    /* ---------- Les formations : où va le module o quand la section idx est à l'écran ---------- */
    function formation(idx, o, t, st, out) {
      var r = o.r, ty = o.type, ti = o.ti, nT = COUNT[ty];
      out.s = ty === 0 ? .9 + r[4] * .7 : .85 + r[4] * .45; out.f = 1;
      out.e.set(0, 0, 0);
      switch (idx) {
        case 0: { /* Nuée (accueil) : un trio écran + API + base, relié, raconte déjà l'idée */
          if (ti === 0) {
            if (portrait) {
              var zp = -12, wP = hw(zp), hP = hh(zp);
              if (ty === 0) { out.p.set(0, -hP * .5, zp); out.s = wP * 1.25 / 1.3333; out.e.set(.1, -.2 + Math.sin(t * .4) * .05, .03); out.f = .5; }
              else if (ty === 2) { out.p.set(wP * .62, -hP * .08, zp - 1.5); out.f = .6; }
              else { out.p.set(-wP * .55, -hP * .82, zp - .5); out.f = .6; }
            } else {
              var zh = -8.6, hx = hw(zh) * .52;
              if (ty === 0) { out.p.set(hx, .15 + Math.sin(t * .7) * .07, zh); out.s = Math.min(2.5, hw(zh) * .45); out.e.set(.07 + Math.sin(t * .5) * .03, -.36 + Math.sin(t * .37) * .06, .03); }
              else if (ty === 2) { out.p.set(hx + hw(zh) * .3, hh(zh) * .66 + Math.sin(t * .6) * .08, zh - 2.2); out.s = 1.1; }
              else { out.p.set(hx + hw(zh) * .22, -hh(zh) * .7 + Math.cos(t * .5) * .06, zh - 1.4); out.s = 1.15; }
            }
          } else {
            out.f = o.nueeFade;
            out.p.copy(o.nuee); out.p.x += Math.sin(t * .21 + r[0] * 9) * .32; out.p.y += Math.cos(t * .17 + r[1] * 9) * .28;
            out.e.set((r[2] - .5) * 1.4 + Math.sin(t * .31 + r[5] * 7) * .25, (r[3] - .5) * 1.8 + t * .06 * (r[5] - .5) * 2, (r[6] - .5) * 1.1);
          }
          break; }
        case 1: { /* Couches (profil) : données en bas, API au milieu, interfaces en haut */
          var cols = Math.ceil(nT / 2), row = ti % 2, c = ti >> 1, gap = portrait ? 1.7 : (ty === 0 ? 2.6 : 3.1), z0 = -15.5;
          var x = (c - (cols - 1) / 2 + row * .5) * gap, y = (ty === 0 ? 1 : ty === 2 ? 0 : -1) * hh(z0) * (portrait ? .62 : .56), yaw = portrait ? .15 : .3;
          out.p.set(x * Math.cos(yaw), y + (r[0] - .5) * .5 + Math.sin(t * .3 + r[1] * 9) * .1, z0 - row * 3 + x * Math.sin(yaw));
          out.e.set(-.08, -yaw + (r[2] - .5) * .2, 0); out.f = .55; out.s = ty === 0 ? 1.25 : 1;
          break; }
        case 2: { /* Grille (projets) : un mur de modules, balayé par une lueur */
          var colsG = portrait ? 4 : 8, gi = o.gi, cg = gi % colsG, rw = Math.floor(gi / colsG), rowsN = Math.ceil(N / colsG);
          var xg = (cg - (colsG - 1) / 2) * 1.95, yg = (rw - (rowsN - 1) / 2) * 1.65, yawG = portrait ? .2 : .4;
          out.p.set(xg * Math.cos(yawG) + (portrait ? 0 : 1.2), yg, -21 + xg * Math.sin(yawG));
          out.e.set(0, -yawG, 0); out.s = ty === 0 ? 1.15 : .95;
          var hl = Math.floor(t * 1.6) % N === gi ? 1 : 0; out.f = .24 + hl * .4;
          break; }
        case 3: { /* Ligne (parcours) : le flux, avec une impulsion qui suit le scroll */
          var u = (o.gi / N + t * .012) % 1; lineCurve.getPointAt(u, out.p);
          out.p.x += (r[0] - .5) * 1.1; out.p.y += (r[1] - .5) * .9 + Math.sin(t * .8 + o.gi) * .05;
          out.e.set(.3 + (r[2] - .5) * .3, -.9 + u * .7, .2 + (r[3] - .5) * .25);
          var gl = Math.exp(-Math.pow((u - (1 - st.p)) * 7, 2));
          out.f = (.42 + gl * .45) * smooth(0, .06, u) * smooth(1, .9, u); out.s *= .95 + gl * .25;
          break; }
        default: { /* Hub (contact) : trois anneaux autour d'un nœud unique */
          var R = (ty === 0 ? 6 : ty === 1 ? 4.5 : 3.1) * (portrait ? .5 : 1), dir = ty === 1 ? -1 : 1;
          var ang = ti / nT * 6.2832 + t * .06 * dir + ty;
          out.p.set(HUB.x + Math.cos(ang) * R, HUB.y + Math.sin(ang) * R * (portrait ? 1.5 : .92), HUB.z + Math.sin(ang * 3 + t * .4) * .5 - ty * .4);
          out.e.set(-Math.sin(ang) * .25, -Math.cos(ang) * .5, 0); out.f = portrait ? .34 : .5; out.s = ty === 0 ? (portrait ? .8 : 1.15) : .9;
        }
      }
      /* Les volumes tournent sur eux-mêmes, quelle que soit la formation */
      if (ty === 1) out.e.set(.28 + (r[2] - .5) * .3, t * .16 + r[3] * 6, (r[6] - .5) * .3);
      else if (ty === 2) out.e.set(t * .21 + r[2] * 6, t * .27 + r[3] * 6, 0);
      out.q.setFromEuler(out.e);
    }
    /* Opacité des flux selon la formation */
    function linkOpacity(idx, l, st) {
      switch (idx) {
        case 0: return l.hero ? 1 : .07;
        case 1: return .95 * smooth(l.ord * .7 - .12, l.ord * .7 + .04, st.p * 1.15);   /* s'allument un à un */
        case 2: return .26;
        case 3: return .7;
        default: return 1;
      }
    }

    /* ---------- État ---------- */
    var st = { a: 0, b: 0, k: 0, p: 0, scroll: 0, vel: 0 };
    var ptr = { x: 0, y: 0, sx: 0, sy: 0 }, velS = 0, wts = [0, 0, 0, 0, 0], FOCUS = [9, 14, 19, 10.5, 14.5];
    var flash = 0, sweepT = 0, wasGrid = false;
    var dummy = new THREE.Object3D(), euler = new THREE.Euler(), qTmp = new THREE.Quaternion(), vB = new THREE.Vector3();

    function resize() {
      var w = canvas.clientWidth || window.innerWidth, h = canvas.clientHeight || window.innerHeight;
      if (w === W && h === H) return;
      W = w; H = h; aspect = W / H; portrait = aspect < .82;
      renderer.setSize(W, H, false); camera.aspect = aspect; camera.updateProjectionMatrix();
      dustMat.uniforms.uPx.value = H * renderer.getPixelRatio() * 1.374;
      layout();
    }

    var clock = new THREE.Clock(), running = true, raf = 0, frames = 0, slowAcc = 0, stage = 0, dead = false, introT = 0;

    function frame() {
      if (!running || dead) return;
      raf = requestAnimationFrame(frame);
      var dt = Math.min(clock.getDelta(), .05), t = clock.elapsedTime;
      resize();
      introT = Math.min(1, introT + dt / 2.4);
      var intro = 1 - Math.pow(1 - introT, 4);
      var follow = 1 - Math.exp(-dt * 5.5), followSlow = 1 - Math.exp(-dt * 3);
      ptr.sx += (ptr.x - ptr.sx) * followSlow; ptr.sy += (ptr.y - ptr.sy) * followSlow;
      velS += (clamp(st.vel, -80, 80) - velS) * followSlow;
      uTime.value = t;

      /* Poids de chaque formation (mélange entre deux sections) */
      var k = st.a === st.b ? 0 : smooth(0, 1, st.k), f;
      for (f = 0; f < 5; f++) wts[f] = 0;
      wts[st.a] += 1 - k; wts[st.b] += k;

      /* Caméra : parallaxe au pointeur (ou à l'inclinaison du téléphone), léger tangage au scroll */
      camera.position.set(ptr.sx * (portrait ? .25 : .6), -ptr.sy * .34, (1 - intro) * 5);
      camera.lookAt(0, 0, -12); camera.rotation.x += velS * .0007; camera.rotation.z += -ptr.sx * .012;
      light.set(-.45 + ptr.sx * .7, .6 - ptr.sy * .4, .7);

      /* Plan de netteté : il recule ou avance avec la formation */
      var fz = 0; for (f = 0; f < 5; f++) fz += wts[f] * FOCUS[f];
      focus.value += (fz - focus.value) * followSlow;

      /* Modules */
      for (var i = 0; i < N; i++) {
        var o = M[i];
        formation(st.a, o, t, st, tA);
        if (k > 0) {
          formation(st.b, o, t, st, tB);
          tA.p.lerp(tB.p, k); tA.q.slerp(tB.q, k); tA.s = lerp(tA.s, tB.s, k); tA.f = lerp(tA.f, tB.f, k);
          tA.p.z += Math.sin(k * Math.PI) * (o.r[7] - .3) * 5;       /* les trajectoires s'écartent pendant la transition */
        }
        if (o.type === 0) tA.q.multiply(qTmp.setFromEuler(euler.set(-ptr.sy * .18, ptr.sx * .26, 0)));
        o.p.lerp(tA.p, follow); o.q.slerp(tA.q, follow); o.s += (tA.s - o.s) * follow; o.f += (tA.f * intro - o.f) * follow; o.z = o.p.z;
      }
      /* Écrans : tri du fond vers l'avant (transparence correcte) */
      scrOrder.sort(function (x, y) { return x.z - y.z; });
      for (var n = 0; n < nS; n++) {
        var d = scrOrder[n];
        dummy.position.copy(d.p); dummy.quaternion.copy(d.q); dummy.scale.setScalar(d.s); dummy.updateMatrix(); screens.setMatrixAt(n, dummy.matrix);
        sSeed.array[n] = d.r[0]; sCell.array[n] = d.cell; sFade.array[n] = d.f;
      }
      screens.instanceMatrix.needsUpdate = sSeed.needsUpdate = sCell.needsUpdate = sFade.needsUpdate = true;
      for (var ty2 = 1; ty2 < 3; ty2++) {
        var grp = solids[ty2], list = byType[ty2];
        for (var m2 = 0; m2 < list.length; m2++) {
          var e2 = list[m2]; dummy.position.copy(e2.p); dummy.quaternion.copy(e2.q); dummy.scale.setScalar(e2.s); dummy.updateMatrix(); grp.mesh.setMatrixAt(m2, dummy.matrix); grp.fade.array[m2] = e2.f;
        }
        grp.mesh.instanceMatrix.needsUpdate = grp.fade.needsUpdate = true;
      }

      /* Flux lumineux */
      var wHub = wts[4];
      for (var q = 0; q < L; q++) {
        var l = LINKS[q], op = 0;
        for (f = 0; f < 5; f++) if (wts[f] > 0) op += wts[f] * linkOpacity(f, l, st);
        op *= (.35 + .65 * Math.min(1, l.a.f + l.b.f)) * intro;
        vB.copy(l.b.p).lerp(HUB, wHub);                                /* contact : tout converge vers le nœud */
        lA.array[q * 3] = l.a.p.x; lA.array[q * 3 + 1] = l.a.p.y; lA.array[q * 3 + 2] = l.a.p.z;
        lB.array[q * 3] = vB.x; lB.array[q * 3 + 1] = vB.y; lB.array[q * 3 + 2] = vB.z;
        lOp.array[q] = op;
      }
      lA.needsUpdate = lB.needsUpdate = lOp.needsUpdate = true;

      /* Nœud central et ondes (moment fort du contact) */
      hubMat.opacity += (wHub * .9 - hubMat.opacity) * follow; hub.visible = hubMat.opacity > .01;
      hub.rotation.set(t * .13, t * .19, 0); hub.scale.setScalar(.8 + wHub * .25 + Math.sin(t * 1.3) * .03);
      for (var wv = 0; wv < 3; wv++) {
        var ph = (t * .22 + wv / 3) % 1, ring = waves[wv];
        ring.visible = wHub > .02; ring.scale.setScalar(1.3 + ph * (portrait ? 4.5 : 8.5)); ring.material.opacity = (1 - ph) * (1 - ph) * .55 * wHub;
      }

      /* Reflet périodique + éclair quand la grille des projets se forme */
      var grid = wts[2] > .6;
      if (grid && !wasGrid) flash = 1;
      wasGrid = grid; flash = Math.max(0, flash - dt * 1.6);
      scrMat.uniforms.uFlash.value = flash * flash;
      sweepT += dt; if (sweepT > 5.5) sweepT = -1; scrMat.uniforms.uSweep.value = -.3 + sweepT * .55;
      dustMat.uniforms.uScroll.value = st.scroll * .004;

      renderer.render(scene, camera);

      /* Garde-fou de performance : on allège, puis on rend la main à la version statique */
      if (!opts.force) {
        frames++;
        if (frames > 20) slowAcc += dt;
        if (frames === 110) {
          var avg = slowAcc / 90;
          if (avg > .034 && stage === 0) { stage = 1; renderer.setPixelRatio(1); W = 0; dust.visible = false; frames = 0; slowAcc = 0; }
          else if (avg > .045 && stage === 1) { api.destroy(); if (opts.onFail) opts.onFail('trop lent'); }
        }
      }
    }

    function onVis() { if (dead) return; if (document.hidden) { running = false; cancelAnimationFrame(raf); } else if (!running) { running = true; clock.getDelta(); frame(); } }
    document.addEventListener('visibilitychange', onVis);
    canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); api.destroy(); if (opts.onFail) opts.onFail('contexte perdu'); });

    var api = {
      /* a, b : formations de départ et d'arrivée ; k : mélange 0..1 ; p : progression dans la section courante */
      update: function (s) { st.a = clamp(s.a | 0, 0, 4); st.b = clamp(s.b | 0, 0, 4); st.k = s.k; st.p = s.p || 0; st.vel = s.vel || 0; st.scroll = s.scroll || 0; },
      pointer: function (x, y) { ptr.x = clamp(x, -1, 1); ptr.y = clamp(y, -1, 1); },
      destroy: function () {
        if (dead) return; dead = true; running = false; cancelAnimationFrame(raf);
        document.removeEventListener('visibilitychange', onVis);
        scene.traverse(function (m) { if (m.geometry) m.geometry.dispose(); if (m.material) m.material.dispose(); });
        atlas.dispose(); renderer.dispose();
      }
    };

    resize();
    renderer.compile(scene, camera);
    frame();
    return api;
  }

  window.PortfolioScene = { init: init };
})();
