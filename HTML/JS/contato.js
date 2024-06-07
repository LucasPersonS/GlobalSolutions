document.getElementById('formulario-contato').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let email = document.getElementById('email').value;
    if (validarEmail(email)) {
        mostrarPopup();
        setTimeout(() => {
            esconderPopup();
            document.getElementById('contactForm').reset();
        }, 3000);
    } else {
        alert('Por favor, insira um email válido.');
    }
});

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function mostrarPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
}

function esconderPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}