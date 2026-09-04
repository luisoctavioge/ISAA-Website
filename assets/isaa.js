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
    ["warm","El reembolso se atora por un papel que sí tenías"],
    ["desk","Llevas cuatro años con el mismo tratamiento y los estudios están en cuatro lugares distintos."]
  ];
  var PAINS_B = [
    ["sofa","Nadie más en tu familia sabe dónde está nada"],
    ["warm","Llegas a consulta y repites tu historial de memoria"],
    ["desk","Cambias de doctor y empiezas el expediente otra vez"],
    ["sofa","Cambias de ginecólogo a mitad del embarazo y hay que empezar de cero."]
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
  /* Un color de marca que carga texto usa su variante -txt [T33].
     El icono conserva el original: T33 excluye fill de iconos. */
  var TXT = {"var(--primary)":"var(--primary-txt)","var(--secondary)":"var(--secondary-txt)",
             "var(--c-naranja)":"var(--c-naranja-txt)","var(--c-verde)":"var(--c-verde-txt)",
             "var(--c-teal)":"var(--c-teal-txt)","var(--c-azul)":"var(--c-azul-txt)",
             "var(--c-morado)":"var(--c-morado-txt)"};
  function txt(c){ return TXT[c] || c; }

  /* El chip que lleva texto va al 7%: al 15% el label del mismo color
     no alcanza AA sobre su propio fondo [B2]. El chip del icono se
     queda al 15%, que es lo que fija §3.5 del manual. */
  function chipBg(c){ return c.split(",.15)").join(",.07)").split(",.14)").join(",.07)"); }


  var PILLARS = [
    {c:"var(--c-teal)",bgc:"rgba(13,148,136,.14)",ic:"circulo",
     t:"Los que más te importan en un solo lugar",
     d:"Cada persona con su expediente, y su historia completa en orden.",
     chips:["Mi Círculo","Cada quien su expediente","Expediente por persona","Círculo broker"]},
    {c:"var(--c-morado)",bgc:"rgba(124,58,237,.14)",ic:"ojo",
     t:"Se ordena mientras vas avanzando",
     d:"Capturas el documento y el Ojo Clínico, asistido por IA, te guía. Tú confirmas.",
     chips:["Ojo Clínico IA","Registro de eventos","Correo único por evento","Expediente + PDF","Búsqueda"]},
    {c:"var(--c-verde)",bgc:"rgba(22,163,74,.14)",ic:"escudo",
     t:"Todas las conversaciones, junto al evento del que hablan",
     d:"Hospitales, laboratorios, farmacias, consultorios, aseguradoras — todos en un mismo lugar. Sin buscar en el correo ni en WhatsApp.",
     chips:["Chat por evento → correo","Reembolsos","Paquete + checklist","Descarga lista para enviar"]},
    {c:"#0F3460",bgc:"rgba(15,52,96,.14)",ic:"corazon",
     t:"Todo va contigo, siempre",
     d:"Tu historial y el de tu Círculo, de un médico a otro. Y en una urgencia, tu Tarjeta Médica se abre con un QR — quien la recibe no necesita cuenta.",
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
     d:"Sangre, alergias, medicinas, seguro y contactos. Cinco minutos y ya la puedes compartir por QR."},
    {n:"Paso 2",c:"var(--c-teal)",bgc:"rgba(13,148,136,.14)",ic:"circulo",t:"Mi Círculo",
     d:"Agrega a quien quieras cuidar. Cada persona con su propio expediente."},
    {n:"Paso 3",c:"var(--c-morado)",bgc:"rgba(124,58,237,.14)",ic:"ojo",t:"Ojo Clínico",
     d:"Capturas el documento y te guía a dónde va. Tú confirmas. Y si prefieres, también puedes hacerlo manualmente."},
    {n:"Paso 4",c:"var(--c-azul)",bgc:"rgba(37,99,235,.14)",ic:"evento",t:"Eventos Médicos",
     d:"Todo lo que pasa alrededor de un motivo de salud, junto: documentos, fechas y conversaciones."}
  ];

  /* FAQ partido por página [T34]. Cada contenedor declara cuál le
     toca con data-faq. Las entradas marcadas PENDIENTE quedan
     comentadas hasta que pasen revisión legal [T35, T36]. */
  var FAQ_HOME = [
    ["reemplaza-medico","¿ISAA reemplaza a mi médico o a mi aseguradora?","No. ISAA no atiende ni asegura: organiza. Guardamos y ordenamos la documentación de tu seguimiento de salud para que la tengas lista cuando cualquier médico, hospital o aseguradora te la pida."],
    ["aseguradora-no-ve","¿Mi aseguradora puede ver lo que guardo aquí?","No, salvo que tú se lo mandes. ISAA no está conectada con ninguna aseguradora ni le reporta nada a nadie. Tu expediente es tuyo y sale de aquí solo cuando tú lo compartes."],
    ["quien-ve-info","¿Quién puede ver mi información?","Solo quien tú decidas. Nada se comparte por omisión. Al crear tu cuenta aceptas tres cosas por separado —términos, manejo de datos sensibles y comunicaciones de marketing— y puedes rechazar la última sin perder nada de la app."],
    ["cerrar-cuenta","¿Qué pasa con mis datos si cierro mi cuenta?","Puedes llevarte tu expediente completo. La portabilidad es un derecho que te da la ley, no una función del plan, y aplica igual en Gratis que en Premium."]
  ];

  /* Las de precio viven en planes.html, que es donde se buscan. */
  var FAQ_PLANES = [
    ["gratis-no-expira","¿El plan Gratis es una prueba que se acaba?","No. Es un plan permanente, con límites: 2 eventos médicos, 5 documentos, 2 hilos de conversación y una exportación en PDF. No pedimos tarjeta y no se convierte en cobro."],
    ["cuanto-cuesta-premium","¿Cuánto cuesta y qué incluye Premium?","$149 al mes o $1,149 al año, que sale en $96 mensuales. Quita todos los límites del plan Gratis para el titular."],
    ["costo-por-persona","¿Cuánto cuesta agregar a alguien de mi familia?","$79 al mes o $609 al año por cada persona adicional. Cada una tiene su propio expediente, y una cuenta admite hasta 8 personas contándote a ti."]
  ];

  /* PENDIENTE · sin publicar, esperan redacción legal [T35]
     · ¿Cómo cancelo?
     · ¿Qué pasa con mi expediente si dejo de pagar?
     Van entre "costo-por-persona" y "quien-ve-info". */

  var FAQ_COMO = [
    ["subir-historial","¿Necesito subir todo mi historial para empezar?","No. Empieza con tu Tarjeta Médica —sangre, alergias, medicinas y contactos— y agrega eventos conforme ocurran. El expediente crece con el uso."],
    ["medico-sin-cuenta","¿Mi doctor tiene que crear una cuenta para recibir lo que le mando?","No, y eso es a propósito. Quien recibe —tu médico, un laboratorio, tu aseguradora— abre lo que le compartes sin registrarse ni instalar nada. ISAA hace el trabajo para que nadie más tenga que cambiar cómo trabaja."],
    ["que-hace-ojo-clinico","¿Qué hace exactamente el Ojo Clínico?","Lee la foto del documento, lo clasifica y te propone a qué evento médico pertenece. Tú solo confirmas."],
    ["sin-seguro","¿Sirve si no tengo seguro de gastos médicos mayores?","Sí. El expediente y la Tarjeta Médica funcionan igual sin póliza. Armar el paquete para reembolso es lo único que aplica solo con seguro."]
  ];

  /* PENDIENTE · sin publicar, esperan redacción legal [T36]
     · ¿Quién lee mis documentos cuando los subo?
     · ¿Dónde se guardan mis datos?
     Van al final de FAQ_COMO. */

  var LOGOS = ["Hospitales","Laboratorios","Farmacias","Consultorios","Aseguradoras"];

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
      + '<span class="ico" style="background:'+p.bgc+';color:'+p.c+';stroke:'+p.c+'">'+svg(ICONS[p.ic])+'</span>'
      + '<h3 class="card-t">'+esc(p.t)+'</h3>'
      + '<p class="body">'+esc(p.d)+'</p>'
      + '<div class="pillar__chips">'+p.chips.map(function(c){
            return '<span class="chip" style="background:'+chipBg(p.bgc)+';color:'+txt(p.c)+'">'+esc(c)+'</span>';}).join("")
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
      + '<span class="overline" style="color:'+txt(s.c)+'">'+esc(s.n)+'</span>'
      + '<h3 class="card-t">'+esc(s.t)+'</h3>'
      + '<p class="body">'+esc(s.d)+'</p>'
      + '<svg class="step__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>'
      + '</div>';
  }).join("");

  var cajaFaq = $("faq");
  if (cajaFaq) {
    var cual = cajaFaq.getAttribute("data-faq");
    var lista = cual === "como" ? FAQ_COMO : cual === "planes" ? FAQ_PLANES : FAQ_HOME;
    cajaFaq.innerHTML = lista.map(function(f){
      return '<details class="q rv" id="faq-'+f[0]+'"><summary>'+esc(f[1])
        + '<svg class="q__x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>'
        + '</summary><p class="q__a">'+esc(f[2])+'</p></details>';
    }).join("");
  }

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

  /* ── Calculadora de precios ────────────────────────────── */
  /* Titular $149/mes o $1,149/año · cada persona adicional
     $79/mes o $609/año. Tope de 8: el titular más siete.
     La tabla de la Parte A del documento llega a 7 personas; el
     octavo valor lo extiende la misma fórmula y Luis lo confirmó:
     $702 al mes, $5,412 al año.
     El ahorro se compara contra pagar ese mismo servicio mes a
     mes durante doce meses. Los montos se calculan, no se
     transcriben: así no se pueden desincronizar de la fórmula. */
  var calc = $("calc");
  if (calc) {
    var TITULAR_MES = 149, TITULAR_ANIO = 1149;
    var PERSONA_MES = 79,  PERSONA_ANIO = 609;

    var pesos = function(n){ return "$" + n.toLocaleString("es-MX"); };

    var pintar = function(n){
      var mes  = TITULAR_MES  + PERSONA_MES  * (n - 1);
      var anio = TITULAR_ANIO + PERSONA_ANIO * (n - 1);
      var mesAMes = mes * 12;
      var ahorro  = mesAMes - anio;
      var pct = (ahorro / mesAMes * 100).toFixed(1);

      el("calcMes").textContent  = pesos(mes);
      el("calcAnio").textContent = pesos(anio);
      el("calcMesPie").textContent = n === 1
        ? "por mes" : "por mes · " + pesos(mes) + " por " + n + " personas";
      el("calcAhorro").textContent =
        "ahorras " + pesos(ahorro) + " · " + pct + "% menos que pagando mes a mes";
    };

    calc.addEventListener("click", function(ev){
      var b = ev.target.closest ? ev.target.closest(".calc__n") : null;
      if (!b) return;
      Array.prototype.forEach.call(calc.querySelectorAll(".calc__n"), function(x){
        x.setAttribute("aria-pressed", x === b ? "true" : "false");
      });
      pintar(+b.getAttribute("data-n"));
    });

    pintar(1);
  }

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
