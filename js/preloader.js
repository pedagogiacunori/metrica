// js/preloader.js
document.addEventListener("DOMContentLoaded", function() {
    // 1. Crear el HTML del preloader
    const preloaderHTML = `
    <div id="preloader">
      <div class="preloader-content">
        <img src="images/logo.png" alt="MÉTRICA Logo" class="preloader-logo">
        <div class="spinner"></div>
      </div>
    </div>
    `;

    // 2. Insertarlo al inicio del body
    document.body.insertAdjacentHTML('afterbegin', preloaderHTML);

    // 3. Agregar los estilos CSS necesarios dinámicamente
    const styleHTML = `
    <style>
      #preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 99999;
        transition: opacity 0.6s ease, visibility 0.6s ease;
      }
      .preloader-content {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }
      .preloader-logo {
        width: 150px;
        height: auto;
        animation: pulseLogo 1.8s infinite ease-in-out;
      }
      .spinner {
        width: 42px;
        height: 42px;
        border: 4px solid #75D7F5;
        border-top: 4px solid #0E25FF;
        border-right: 4px solid #FCE609;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      #preloader.hidden {
        opacity: 0;
        visibility: hidden;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes pulseLogo {
        0%, 100% { transform: scale(1); opacity: 0.9; }
        50% { transform: scale(1.05); opacity: 1; }
      }
    </style>
    `;
    document.head.insertAdjacentHTML('beforeend', styleHTML);
});

// 4. Ocultar el preloader cuando la página termine de cargar por completo
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
    }
});