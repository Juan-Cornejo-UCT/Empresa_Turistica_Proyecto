document.addEventListener('DOMContentLoaded', function() {
    const forms = {
        registro: document.getElementById('registroForm'),
        reserva: document.getElementById('reservaForm')
    };

    const urls = {
        registro: 'phpRegistroUsuarioCode.php',
        reserva: 'phpReservas.php'
    };

    function enviarFormulario(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const url = urls[this.id.replace('Form', '')];

        console.log('Enviando solicitud a:', url); // Depuración

        fetch(url, { 
            method: 'POST', 
            body: formData 
        })
        .then(response => {
            console.log('Respuesta recibida:', response); // Depuración
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor: ' + response.status);
            }
            return response.text();
        })
        .then(data => {
            console.log('Datos recibidos:', data); // Depuración
            alert(data);
            this.reset();
        })
        .catch(error => {
            console.error('Error detallado:', error); // Depuración mejorada
            alert('Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.');
        });
    }

    Object.values(forms).forEach(form => form.addEventListener('submit', enviarFormulario));
});

function mostrarPromocion() {
    alert("¡Oferta especial! 20% de descuento en todas nuestras excursiones este mes. ¡Reserva ahora!");
}