document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("faseMaxima")) {
    localStorage.setItem("faseMaxima", "1");
  }
  actualizarNavegacion();
});

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

function completarFase(faseActual) {
  const siguienteFase = faseActual + 1;
  const faseMaxima = parseInt(localStorage.getItem("faseMaxima") || "1");

  if (siguienteFase > faseMaxima) {
    localStorage.setItem("faseMaxima", siguienteFase.toString());
  }
  
  actualizarNavegacion();

  if (faseActual < 5) {
    window.location.href = `fase${siguienteFase}.html`;
  } else {
    alert("¡Has finalizado exitosamente todos los módulos!");
  }
}

function descargarRecursos(nombreModulo) {
  const contenido = `Universidad de San Carlos de Guatemala\nCentro Universitario de Oriente - CUNORI\nPlataforma MÉTRICA - Material y Recursos de la ${nombreModulo}.`;
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