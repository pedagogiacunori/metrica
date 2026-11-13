document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("faseMaxima")) {
    localStorage.setItem("faseMaxima", "1");
  }
  actualizarNavegacion();
  actualizarBarraProgreso();
  inicializarModoOscuro();
});

// --- CÓDIGOS DE ACCESO DE 6 DÍGITOS PARA CADA FASE ---
const CODIGOS_FASES = {
  1: "482915", // Código para desbloquear la Fase 2 desde la Fase 1
  2: "739024", // Código para desbloquear la Fase 3 desde la Fase 2
  3: "158496", // Código para desbloquear la Fase 4 desde la Fase 3
  4: "926310"  // Código para desbloquear la Fase 5 desde la Fase 4
};
 
// --- RESTRICCIÓN Y NAVEGACIÓN ---
function actualizarNavegacion() {
  const faseMaxima = parseInt(localStorage.getItem("faseMaxima") || "1");
  const navLinks = document.querySelectorAll(".nav-links a[data-fase]");

  navLinks.forEach(link => {
    const faseLink = parseInt(link.getAttribute("data-fase"));
    if (faseLink > faseMaxima) {
      link.classList.add("disabled");
      link.setAttribute("tabindex", "-1");
    } else {
      link.classList.remove("disabled");
      link.removeAttribute("tabindex");
    }
  });
}

function actualizarBarraProgreso() {
  const faseMaxima = parseInt(localStorage.getItem("faseMaxima") || "1");
  const porcentaje = Math.min(Math.round(((faseMaxima - 1) / 4) * 100), 100);
  
  const fillElement = document.getElementById("progressFill");
  const textElement = document.getElementById("progressText");
  
  if (fillElement && textElement) {
    fillElement.style.width = `${porcentaje}%`;
    textElement.textContent = `${porcentaje}% Completado`;
  }
}

function completarFase(faseActual) {
  const siguienteFase = faseActual + 1;
  const faseMaxima = parseInt(localStorage.getItem("faseMaxima") || "1");

  if (faseActual >= 5) {
    alert("¡Has finalizado exitosamente todos los módulos!");
    return;
  }

  // Solicitar el código exclusivo de 6 dígitos autorizado a la Catedrática
  const codigoIngresado = prompt(
    `🔒 ACCESO RESTRINGIDO\n\n` +
    `Para desbloquear la Fase ${siguienteFase}, ingrese el código de 6 dígitos autorizado por la Catedrática en el Manual de Usuario:`
  );

  if (codigoIngresado === null) {
    return; // Si el usuario presiona cancelar
  }

  // Validar que sean exactamente 6 dígitos numéricos
  const esSoloNumeros = /^\d{6}$/.test(codigoIngresado);

  if (!esSoloNumeros) {
    alert("❌ Error: El código debe contener únicamente 6 dígitos numéricos.");
    return;
  }

  // Verificar si el código coincide con el asignado a la fase actual
  if (codigoIngresado === CODIGOS_FASES[faseActual]) {
    if (siguienteFase > faseMaxima) {
      localStorage.setItem("faseMaxima", siguienteFase.toString());
    }
    
    actualizarNavegacion();
    actualizarBarraProgreso();

    alert(`¡Código correcto! Fase ${siguienteFase} desbloqueada con éxito.`);
    window.location.href = `fase${siguienteFase}.html`;
  } else {
    alert("❌ Código incorrecto. Verifique el Código proporcionado a la Catedrática.");
  }
}

// --- MODO OSCURO / LIGHT MODE ---
function inicializarModoOscuro() {
  const themeStored = localStorage.getItem("theme");
  if (themeStored === "dark") {
    document.body.classList.add("dark-mode");
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// --- DESCARGAS Y DIPLOMA ---
function descargarRecursos(nombreModulo) {
  const contenido = `Universidad de San Carlos de Guatemala\nCentro Universitario de Oriente - CUNORI\nPlataforma MÉTRICA - Recursos Educativos de la ${nombreModulo}.`;
  const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Recursos_${nombreModulo.replace(/\s+/g, '_')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function generarDiploma() {
  const nombre = document.getElementById("nombreAlumno").value.trim();
  const carne = document.getElementById("carneAlumno").value.trim();

  if (!nombre || !carne) {
    alert("Por favor ingresa tu nombre completo y número de carné.");
    return;
  }

  const contenedorDiploma = document.getElementById("diplomaResultado");
  contenedorDiploma.innerHTML = `
    <div class="diploma-box">
      <div class="diploma-header-logos">
        <img src="images/logo_usac.jpg" alt="Logo USAC">
        <div>
          <h4 style="color: #0E25FF; font-size: 0.9rem;">UNIVERSIDAD DE SAN CARLOS DE GUATEMALA</h4>
          <h5 style="color: #173B59; font-size: 0.8rem;">CENTRO UNIVERSITARIO DE ORIENTE - CUNORI</h5>
        </div>
        <img src="images/logo_cunori.png" alt="Logo CUNORI">
      </div>
      <h2 style="color: #0E25FF; margin-top: 10px;">CONSTANCIA DE ACREDITACIÓN</h2>
      <p style="margin-top: 15px;">Se otorga la presente a:</p>
      <h3 style="color: #173B59; font-size: 1.8rem; margin: 10px 0; border-bottom: 2px solid #BDF1FF; display: inline-block; padding-bottom: 5px;">${nombre}</h3>
      <p>Carné Académico: <strong>${carne}</strong></p>
      <p style="margin-top: 15px; font-size: 0.95rem;">Por haber completado y superado de manera satisfactoria los módulos de autoformación digital implementados para el curso de <strong>Estadística Descriptiva</strong>.</p>
      <br>
      <button onclick="window.print()" class="btn-completar">Imprimir / Guardar en PDF</button>
    </div>
  `;
}

// --- 💡 CALCULADORA ESTADÍSTICA INTERACTIVA EN VIVO ---
function calcularEstadisticas() {
  const inputData = document.getElementById("datosEstadisticos").value;
  const arrayNumeros = inputData
    .split(",")
    .map(num => parseFloat(num.trim()))
    .filter(num => !isNaN(num));

  const contenedorResultados = document.getElementById("resultadosCalculadora");

  if (arrayNumeros.length === 0) {
    contenedorResultados.style.color = "#FEB501";
    contenedorResultados.innerHTML = "⚠️ Ingresa números válidos separados por comas (Ej: 12, 15, 12, 18, 20).";
    return;
  }

  // Ordenar números
  arrayNumeros.sort((a, b) => a - b);
  const n = arrayNumeros.length;

  // 1. Media Aritmética
  const suma = arrayNumeros.reduce((acc, val) => acc + val, 0);
  const media = (suma / n).toFixed(2);

  // 2. Mediana
  let mediana;
  const mitad = Math.floor(n / 2);
  if (n % 2 === 0) {
    mediana = ((arrayNumeros[mitad - 1] + arrayNumeros[mitad]) / 2).toFixed(2);
  } else {
    mediana = arrayNumeros[mitad].toFixed(2);
  }

  // 3. Moda
  const frecuencia = {};
  let maxFrec = 0;
  arrayNumeros.forEach(num => {
    frecuencia[num] = (frecuencia[num] || 0) + 1;
    if (frecuencia[num] > maxFrec) maxFrec = frecuencia[num];
  });

  let modas = [];
  for (const num in frecuencia) {
    if (frecuencia[num] === maxFrec && maxFrec > 1) {
      modas.push(num);
    }
  }

  const textoModa = modas.length > 0 ? modas.join(", ") : "Sin moda (Amodal)";

  // 4. Rango
  const minimo = arrayNumeros[0];
  const maximo = arrayNumeros[n - 1];
  const rango = (maximo - minimo).toFixed(2);

  // Desplegar Resultados
  contenedorResultados.style.color = "var(--color-texto)";
  contenedorResultados.innerHTML = `
    <div style="background: var(--color-fondo); border: 2px solid var(--color-complementario); padding: 20px; border-radius: 8px; margin-top: 15px;">
      <h4 style="color: var(--color-institucional); margin-bottom: 10px;">📊 Resultados Calculados:</h4>
      <p><strong>Total de Datos (N):</strong> ${n}</p>
      <p><strong>Datos Ordenados:</strong> ${arrayNumeros.join(", ")}</p>
      <p><strong>Media Aritmética (X̄):</strong> ${media}</p>
      <p><strong>Mediana (Me):</strong> ${mediana}</p>
      <p><strong>Moda (Mo):</strong> ${textoModa}</p>
      <p><strong>Rango (R):</strong> ${rango} (Mín: ${minimo}, Máx: ${maximo})</p>
    </div>
  `;
}