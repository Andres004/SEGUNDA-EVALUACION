const botonesFiltro = document.querySelectorAll('.btn-filtro');
const tarjetas = document.querySelectorAll('.card');

botonesFiltro.forEach(btn => {
    btn.addEventListener('click', (e) => {
        botonesFiltro.forEach(b => b.classList.remove('activo'));
        e.target.classList.add('activo');
        
        const categoria = e.target.getAttribute('data-cat');
        
        tarjetas.forEach(tarjeta => {
            if(categoria === 'Todos' || tarjeta.getAttribute('data-cat') === categoria) {
                tarjeta.style.display = 'flex';
            } else {
                tarjeta.style.display = 'none';
            }
        });
    });
});

document.getElementById('btn-menu').addEventListener('click', () => {
    document.getElementById('nav-menu').classList.toggle('activo');
});

const formulario = document.getElementById('formulario-contacto');
const inputNombre = document.getElementById('nombre');
const feedback = document.getElementById('mensaje-feedback');
const selectServicio = document.getElementById('tipo-servicio');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = inputNombre.value.trim();
    const correo = document.getElementById('correo').value.trim();
    const tipo = selectServicio.value;
    const mensaje = document.getElementById('mensaje').value.trim();
    
    const soloNumeros = /^\d+$/;
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (soloNumeros.test(nombre)) {
        inputNombre.setCustomValidity('No pongas solo numeros en el nombre.');
        inputNombre.reportValidity();
        return;
    } else {
        inputNombre.setCustomValidity('');
    }

    if (!nombre || !correo || !tipo || !mensaje) {
        feedback.className = 'feedback-oculto error';
        feedback.textContent = 'Faltan datos obligatorios.';
        return;
    }

    if (!formatoCorreo.test(correo)) {
        feedback.className = 'feedback-oculto error';
        feedback.textContent = 'Ese correo esta mal escrito.';
        return;
    }

    feedback.className = 'feedback-oculto exito';
    feedback.textContent = `Bien! Se envio el mensaje de ${nombre}.`;
    formulario.reset();
});

inputNombre.addEventListener('input', () => {
    inputNombre.setCustomValidity('');
});

const botonesPedir = document.querySelectorAll('.card .btn-primary');
botonesPedir.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const tarjeta = e.target.closest('.card');
        const categoria = tarjeta.getAttribute('data-cat');
        
        selectServicio.value = categoria;
        
        document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
    });
});