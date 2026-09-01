/* ══════════════════════════════════════════════════════════════
   ISAA · Comportamiento compartido
   Un solo archivo para las cuatro páginas. Cada bloque comprueba
   que su nodo exista: una página que no tiene marquee, planes o
   FAQ simplemente no ejecuta ese render.
   ══════════════════════════════════════════════════════════════ */
(function(){
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Nodo nulo: deja que el código corra sin ramas en páginas
     donde la sección no existe. */
  var SINK = {innerHTML:"", textContent:"", hidden:false,
              setAttribute:function(){}, getAttribute:function(){return null;},
              addEventListener:function(){}, style:{}};
  function $(id){ return document.getElementById(id); }
  function el(id){ return $(id) || SINK; }

  /* ── Datos ─────────────────────────────────────────────── */
  var PAINS_A = [
    ["desk","El estudio está en WhatsApp, en un correo, o en ningún lado"],
    ["sofa","Te piden un documento de hace dos años y empieza la búsqueda"],
    ["warm","El reembolso se atora por un papel que sí tenías"]
  ];
  var PAINS_B = [
    ["sofa","Nadie más en tu familia sabe dónde está nada"],
    ["warm","Llegas a consulta y repites tu historial de memoria"],
    ["desk","Cambias de doctor y empiezas el expediente otra vez"]
  ];

  var ICONS = {
    circulo:'<path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="6" r="4"/><path d="M22 20v-2a4 4 0 0 0-3-3.87"/><path d="M16 2.13a4 4 0 0 1 0 7.75"/>',
    ojo:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    escudo:'<path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5Z"/><path d="M9 12l2 2 4-4"/>',
    corazon:'<path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1l8.8 8.8 8.8-8.8a5 5 0 0 0 0-7.1Z"/>',
    tarjeta:'<rect x="2" y="4" width="20" height="16" rx="3"/><path d="M7 9h4M7 13h7"/><circle cx="17" cy="9.5" r="1.5"/>',
    evento:'<path d="M2 12h4l2.5-7 5 14L17 12h5"/>'
  };
  function svg(p){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>';}

  var PILLARS = [
    {c:"var(--c-teal)",bgc:"rgba(13,148,136,.14)",ic:"circulo",over:"Pertenencia",t:"Tu familia médica, unida",
     em:"Los que más te importan, cuidados y cerca.",
     fu:"Cada persona con su propio expediente e identidad, dentro de un Círculo.",
     chips:["Mi Círculo","Titular + miembros","Expediente por persona","Círculo broker"]},
    {c:"var(--c-morado)",bgc:"rgba(124,58,237,.14)",ic:"ojo",over:"Orden",t:"Todo capturado y clasificado, solo",
     em:"La calma de no perder nada.",
     fu:"El Ojo Clínico lee y clasifica con IA; un correo único por evento termina con la fragmentación.",
     chips:["Ojo Clínico IA","Registro de eventos","Correo único por evento","Expediente + PDF","Búsqueda"]},
    {c:"var(--c-verde)",bgc:"rgba(22,163,74,.14)",ic:"escudo",over:"Control",t:"Gestiona y resuelve sin moverte",
     em:"Dejas de perseguir trámites.",
     fu:"Te comunicas con cada instancia por evento y armas el paquete listo para tu aseguradora.",
     chips:["Chat por evento → correo","Reembolsos","Paquete + checklist","Descarga lista para enviar"]},
    {c:"#0F3460",bgc:"rgba(15,52,96,.14)",ic:"corazon",over:"Confianza",t:"Lista cuando más importa",
     em:"Tranquilidad en cualquier emergencia.",
     fu:"Tu identidad médica con QR, accesible al instante y compartible con quien decidas.",
     chips:["Tarjeta QR","Sin cuenta para quien recibe","Sangre · alergias · medicinas","Contacto de emergencia"]}
  ];

  var QUOTES = [
    ["Mi mamá tiene cuatro médicos distintos y yo llevaba todo en una carpeta física. Ahora abro la app y ahí está todo, ordenado por evento.","Cuidadores","var(--c-verde)"],
    ["Vendo seguros desde hace once años. Es la primera herramienta que mis clientes usan entre renovaciones.","Brokers","var(--c-teal)"],
    ["Subí una receta con una foto y el Ojo Clínico la clasificó sola. No tuve que escribir nada.","Pacientes","var(--c-azul)"],
    ["Armé el paquete del reembolso en una tarde. Antes me tomaba tres semanas juntar los papeles.","Pacientes","var(--c-azul)"],
    ["El día que mi hijo se cayó en la escuela, mostré su tarjeta con el QR y no tuve que explicar sus alergias a nadie.","Cuidadores","var(--c-verde)"],
    ["Sumé a mis clientes a un Círculo y ahora el seguimiento post-venta es parte de mi servicio, no un favor.","Brokers","var(--c-teal)"]
  ];

  var STEPS = [
    {n:"Paso 1",c:"#0F3460",bgc:"rgba(15,52,96,.14)",ic:"tarjeta",t:"Tarjeta Médica",
     d:"La información base de cada persona — sangre, alergias, medicinas, seguro y contactos. Compartible por QR."},
    {n:"Paso 2",c:"var(--c-teal)",bgc:"rgba(13,148,136,.14)",ic:"circulo",t:"Mi Círculo",
     d:"Agrupa a las personas: titular y adicionales."},
    {n:"Paso 3",c:"var(--c-morado)",bgc:"rgba(124,58,237,.14)",ic:"ojo",t:"Ojo Clínico / Nuevo Evento",
     d:"Escanea; la IA clasifica y propone el evento. O créalo a mano y adjunta sus documentos."},
    {n:"Paso 4",c:"var(--c-azul)",bgc:"rgba(37,99,235,.14)",ic:"evento",t:"Eventos Médicos",
     d:"Gestión del expediente — todo vive aquí."}
  ];

  var FAQ = [
    ["reemplaza-medico","¿ISAA reemplaza a mi médico o a mi aseguradora?","No. ISAA no atiende ni asegura: organiza. Guardamos y ordenamos la documentación de tu seguimiento de salud para que la tengas lista cuando cualquier médico, hospital o aseguradora te la pida."],
    ["quien-ve-info","¿Quién puede ver la información de mi familia?","Solo quien tú decidas. Los permisos son por persona: cada miembro del Círculo tiene su propio expediente y tú controlas qué se comparte y con quién."],
    ["subir-historial","¿Necesito subir todo mi historial para empezar?","No. Empieza con tu Tarjeta Médica —sangre, alergias, medicinas y contactos— y agrega eventos conforme ocurran. El expediente se construye solo, con el uso."],
    ["que-hace-ojo-clinico","¿Qué hace exactamente el Ojo Clínico?","Escanea el documento que le tomes en foto, lo lee, lo clasifica y te propone a qué evento médico pertenece. Tú solo confirmas."],
    ["sin-seguro","¿Sirve si no tengo seguro de gastos médicos mayores?","Sí. El expediente y la Tarjeta Médica funcionan igual sin póliza. La función de armar el paquete para reembolso es la única que aplica solo con seguro."]
  ];

  var LOGOS = ["Hospitales","Laboratorios","Farmacias","Aseguradoras","Consultorios","Clínicas"];

  /* ── Render ────────────────────────────────────────────── */
  function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

  function painCard(p){
    return '<div class="pain"><div class="photo photo--'+p[0]+'"></div><span>'+esc(p[1])+'</span></div>';
  }
  function fillMarquee(el,items,fn){
    var one = items.map(fn).join("");
    el.innerHTML = one + one + one + one;
  }
  fillMarquee(el("mqA"), PAINS_A, painCard);
  fillMarquee(el("mqB"), PAINS_B, painCard);
  fillMarquee(el("mqL"), LOGOS, function(l){return "<b>"+esc(l)+"</b>";});

  el("pilares-grid").innerHTML = PILLARS.map(function(p){
    return '<article class="card pillar rv">'
      + '<div class="pillar__head">'
      +   '<span class="ico" style="background:'+p.bgc+';color:'+p.c+';stroke:'+p.c+'">'+svg(ICONS[p.ic])+'</span>'
      +   '<span class="overline" style="color:'+p.c+'">'+esc(p.over)+'</span>'
      + '</div>'
      + '<h3 class="card-t">'+esc(p.t)+'</h3>'
      + '<div class="pillar__ben">'
      +   '<div><span class="overline">Emocional</span><p class="body">'+esc(p.em)+'</p></div>'
      +   '<div><span class="overline">Funcional</span><p class="body">'+esc(p.fu)+'</p></div>'
      + '</div>'
      + '<div class="pillar__chips">'+p.chips.map(function(c){
            return '<span class="chip" style="background:'+p.bgc+';color:'+p.c+'">'+esc(c)+'</span>';}).join("")
      + '</div></article>';
  }).join("");

  el("quotes").innerHTML = QUOTES.map(function(q){
    return '<article class="card card--navy rv" data-ph="Testimonio placeholder">'
      + '<div class="t-head"><span class="mk" aria-hidden="true">&ldquo;</span>'
      + '<span class="chip chip--solid" style="background:'+q[2]+'">'+esc(q[1])+'</span></div>'
      + '<p class="quote">'+esc(q[0])+'</p>'
      + '<div class="who"><span class="who__av"></span><span><span class="who__n">Nombre Apellido</span><br>'
      + '<span class="who__r">Cargo · Ciudad</span></span></div></article>';
  }).join("");

  el("steps").innerHTML = STEPS.map(function(s){
    return '<div class="step rv">'
      + '<span class="ico ico--lg" style="background:'+s.bgc+';color:'+s.c+';stroke:'+s.c+'">'+svg(ICONS[s.ic])+'</span>'
      + '<span class="overline" style="color:'+s.c+'">'+esc(s.n)+'</span>'
      + '<h3 class="card-t">'+esc(s.t)+'</h3>'
      + '<p class="body">'+esc(s.d)+'</p>'
      + '<svg class="step__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>'
      + '</div>';
  }).join("");

  el("faq").innerHTML = FAQ.map(function(f){
    return '<details class="q rv" id="faq-'+f[0]+'"><summary>'+esc(f[1])
      + '<svg class="q__x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>'
      + '</summary><p class="q__a">'+esc(f[2])+'</p></details>';
  }).join("");

  /* ── Reveal al hacer scroll ────────────────────────────── */
  var items = document.querySelectorAll(".rv");
  if (reduce || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(items, function(el){ el.setAttribute("data-in","true"); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){
          var sibs = e.target.parentNode ? Array.prototype.indexOf.call(e.target.parentNode.children, e.target) : 0;
          e.target.style.transitionDelay = Math.min(sibs,5)*70 + "ms";
          e.target.setAttribute("data-in","true");
          io.unobserve(e.target);
        }
      });
    }, {rootMargin:"0px 0px -8% 0px", threshold:0.08});
    Array.prototype.forEach.call(items, function(el){ io.observe(el); });
  }

  /* ── Nav: sólida al pasar el hero ──────────────────────── */
  var nav = el("nav");
  var hero = $("top");
  function syncNav(){
    if (!hero) { nav.setAttribute("data-solid", "true"); return; }
    var past = window.scrollY > (hero.offsetHeight - 90);
    nav.setAttribute("data-solid", past ? "true" : "false");
  }
  syncNav();
  window.addEventListener("scroll", syncNav, {passive:true});
  window.addEventListener("resize", syncNav);

  /* ── Tarjeta flotante ──────────────────────────────────── */
  var float = el("float");
  var closed = false;
  el("floatX").addEventListener("click", function(){
    closed = true; float.setAttribute("data-in","false");
    setTimeout(function(){ float.hidden = true; }, 600);
  });
  window.addEventListener("scroll", function(){
    if (closed) return;
    float.setAttribute("data-in", window.scrollY > window.innerHeight*1.4 ? "true" : "false");
  }, {passive:true});

  /* ── Modo revisión ─────────────────────────────────────── */
  var rev = el("rev");
  rev.addEventListener("click", function(){
    var on = document.body.getAttribute("data-review") === "on";
    document.body.setAttribute("data-review", on ? "off" : "on");
    rev.textContent = on ? "Modo revisión" : "Ocultar placeholders";
  });

  /* ── Filtros del blog [§9.2] ───────────────────────────── */
  /* El brief los especifica como fila de chips con "Todos" activo.
     En un artboard eso es estático; en el sitio un control que no
     hace nada es peor que no tenerlo, así que filtran de verdad. */
  var filters = $("filters");
  if (filters) {
    var posts = Array.prototype.slice.call(document.querySelectorAll("#posts .post"));
    var empty = $("posts-empty");
    filters.addEventListener("click", function(ev){
      var btn = ev.target.closest ? ev.target.closest("[data-filter]") : null;
      if (!btn) return;
      var cat = btn.getAttribute("data-filter");
      Array.prototype.forEach.call(filters.querySelectorAll("[data-filter]"), function(b){
        var on = b === btn;
        b.setAttribute("aria-pressed", on ? "true" : "false");
        if (on) { b.setAttribute("data-on","true"); } else { b.removeAttribute("data-on"); }
      });
      var visibles = 0;
      posts.forEach(function(p){
        var show = cat === "Todos" || p.getAttribute("data-cat") === cat;
        p.hidden = !show;
        if (show) visibles++;
      });
      if (empty) empty.hidden = visibles > 0;
    });
  }

  /* ── Mockups de producto [§8.2] ────────────────────────── */
  /* Cada plancha lleva una pantalla real del design system a 390×844.
     El factor de escala depende del alto disponible, que es responsive,
     así que se calcula aquí en vez de fijarlo por breakpoint. */
  var mocks = Array.prototype.slice.call(document.querySelectorAll(".mock"));
  if (mocks.length) {
    var fitMocks = function(){
      mocks.forEach(function(m){
        var f = m.querySelector(".mock__f");
        if (!f) return;
        var s = m.clientHeight / 844;
        if (!s) return;
        f.style.transform = "scale(" + s + ")";
        m.style.width = Math.round(390 * s) + "px";
      });
    };
    fitMocks();
    window.addEventListener("resize", fitMocks);
    window.addEventListener("load", fitMocks);
  }

  /* ── Video del hero ────────────────────────────────────── */
  /* Dos motivos para no reproducirlo: la regla 10 del manual
     (prefers-reduced-motion) y los datos móviles — son 4.4 MB, y
     buena parte de la audiencia entra desde el teléfono. En ambos
     casos se queda el póster, que es un frame del mismo video. */
  var hv = $("heroVideo");
  if (hv) {
    /* El src vive en data-src, no en el HTML: con preload y autoplay
       puestos en el marcado el navegador ya pidió bytes antes de que
       este script corriera. Así, en móvil se descargan cero. */
    var mueve = !reduce && window.innerWidth > 720;
    if (mueve) {
      hv.src = hv.getAttribute("data-src");
      var p = hv.play();
      if (p && p.catch) p.catch(function(){ /* el navegador lo bloqueó: queda el póster */ });
    }
  }

  /* ── Menú móvil ────────────────────────────────────────── */
  var burger = $("burger"), menu = $("menu");
  if (burger && menu) {
    var setMenu = function(open){
      menu.hidden = !open;
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    };
    burger.addEventListener("click", function(){ setMenu(menu.hidden); });
    document.addEventListener("keydown", function(e){
      if (e.key === "Escape" && !menu.hidden) { setMenu(false); burger.focus(); }
    });
    document.addEventListener("click", function(e){
      if (menu.hidden) return;
      if (!menu.contains(e.target) && !burger.contains(e.target)) setMenu(false);
    });
    window.addEventListener("resize", function(){
      if (window.innerWidth > 980 && !menu.hidden) setMenu(false);
    });
  }

  /* ── Splash ────────────────────────────────────────────── */
  var splash = el("splash");
  function hideSplash(){ splash.hidden = true; }

  var seen = false;
  try { seen = sessionStorage.getItem("isaa:splash") === "1"; } catch (e) {}

  if (reduce || seen) {
    hideSplash();
  } else {
    try { sessionStorage.setItem("isaa:splash", "1"); } catch (e) {}
    setTimeout(hideSplash, 1150);
  }
})();
