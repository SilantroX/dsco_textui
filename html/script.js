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

            keyContainer.style.display = 'flex';
            playNotificationSound();
        } else if (event.data.type === 'hideTextUI') {
            keyContainer.style.display = 'none';
        }
    });

    function playNotificationSound() {
        // Intentamos reproducir el sonido. Ten en cuenta que la reproducción podría requerir interacción del usuario.
        try {
            audio.play();
        } catch (error) {
            console.error('Error al reproducir el sonido:', error);
        }
    }
});
