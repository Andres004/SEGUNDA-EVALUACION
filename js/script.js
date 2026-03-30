const servicios = [
    { id: 1, nombre: "Pagina Web Basica", desc: "Hacemos tu HTML y CSS para tu tarea.", cat: "Programacion", precio: "20 Bs" },
    { id: 2, nombre: "Tienda para vender", desc: "Un sitio para vender cosas online.", cat: "Programacion", precio: "50 Bs" },
    { id: 3, nombre: "Hacer Logo", desc: "Hacemos un logo simple en Paint o Photoshop.", cat: "Graficos", precio: "10 Bs" },
    { id: 4, nombre: "Diseño de Banner", desc: "Un banner para tu Facebook o canal.", cat: "Graficos", precio: "15 Bs" },
    { id: 5, nombre: "Subir Fotos a Face", desc: "Manejamos tu pagina de Facebook.", cat: "Redes", precio: "10 Bs / semana" },
    { id: 6, nombre: "Publicidad Basica", desc: "Hacemos que mas gente vea tu pagina.", cat: "Redes", precio: "15 Bs / semana" }
];

const gridServicios = document.getElementById('grid-servicios');
const botonesFiltro = document.querySelectorAll('.btn-filtro');

function renderizarCatalogo(lista) {
    gridServicios.innerHTML = '';
    lista.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <div class="card-img">IMG_${item.id}</div>
            <span class="badge">${item.cat}</span>
            <h3>${item.nombre}</h3>
            <p>${item.desc}</p>
            <p class="precio">Costo: ${item.precio}</p>
            <button class="btn-primary">Pedir</button>
        `;
        gridServicios.appendChild(div);
    });
}
renderizarCatalogo(servicios);

botonesFiltro.forEach(btn => {
    btn.addEventListener('click', (e) => {
        botonesFiltro.forEach(b => b.classList.remove('activo'));
        e.target.classList.add('activo');
        
        const categoria = e.target.getAttribute('data-cat');
        if(categoria === 'Todos') {
            renderizarCatalogo(servicios);
        } else {
            const filtrados = servicios.filter(s => s.cat === categoria);
            renderizarCatalogo(filtrados);
        }
    });
});

document.getElementById('btn-menu').addEventListener('click', () => {
    document.getElementById('nav-menu').classList.toggle('activo');
});

const formulario = document.getElementById('formulario-contacto');
const inputNombre = document.getElementById('nombre');
const feedback = document.getElementById('mensaje-feedback');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = inputNombre.value.trim();
    const correo = document.getElementById('correo').value.trim();
    const tipo = document.getElementById('tipo-servicio').value;
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