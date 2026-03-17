// html/script.js
document.addEventListener('DOMContentLoaded', function () {
    const keyContainer = document.getElementById('keyContainer');
    const audio = document.getElementById('audio');

    window.addEventListener('message', function (event) {
        if (event.data.type === 'showTextUI') {
            const tecla = event.data.tecla;
            const accion = event.data.accion;

            const keyBox = document.querySelector('.key-box');
            keyBox.innerHTML = `
                <div class="key">${tecla}</div>
                <div class="text">${accion}</div>
            `;

            // Reinicia animación de entrada
            keyContainer.classList.remove('hiding', 'visible');
            void keyContainer.offsetWidth; // fuerza reflow
            keyContainer.classList.add('visible');

            playNotificationSound();

        } else if (event.data.type === 'hideTextUI') {
            // Cambia a animación de salida
            keyContainer.classList.remove('visible');
            keyContainer.classList.add('hiding');

            // Al terminar la animación, oculta el elemento
            keyContainer.addEventListener('animationend', function handler() {
                keyContainer.classList.remove('hiding');
                keyContainer.removeEventListener('animationend', handler);
            });
        }
    });

    function playNotificationSound() {
        try {
            audio.play();
        } catch (error) {
            console.error('Error al reproducir el sonido:', error);
        }
    }
});