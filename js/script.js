// 1. Datos del catálogo
const servicios = [
    { id: 1, nombre: "Sitio Web Corporativo", desc: "Desarrollo de páginas web estáticas y dinámicas.", cat: "Desarrollo Web", precio: "$300 USD" },
    { id: 2, nombre: "Tienda Online (E-commerce)", desc: "Plataformas de venta online con pasarela de pago.", cat: "Desarrollo Web", precio: "$600 USD" },
    { id: 3, nombre: "Auditoría UX", desc: "Evaluación de usabilidad de tu plataforma actual.", cat: "Diseño UI/UX", precio: "$150 USD" },
    { id: 4, nombre: "Diseño de App Móvil", desc: "Prototipado y diseño de interfaces para iOS y Android.", cat: "Diseño UI/UX", precio: "$400 USD" },
    { id: 5, nombre: "Gestión de Redes", desc: "Creación de contenido para Instagram y Facebook.", cat: "Marketing Digital", precio: "$200 / mes" },
    { id: 6, nombre: "Google Ads", desc: "Campañas de posicionamiento SEM efectivas.", cat: "Marketing Digital", precio: "$250 / mes" }
];

const gridServicios = document.getElementById('grid-servicios');
const botonesFiltro = document.querySelectorAll('.btn-filtro');

// 2. Renderizado dinámico
function renderizarCatalogo(lista) {
    gridServicios.innerHTML = '';
    lista.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <span class="badge">${item.cat}</span>
            <h3>${item.nombre}</h3>
            <p>${item.desc}</p>
            <p class="precio">${item.precio}</p>
            <button class="btn-primary">Me interesa</button>
        `;
        gridServicios.appendChild(div);
    });
}
renderizarCatalogo(servicios);

// 3. Lógica de Filtros
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

// 4. Interacción Menú Móvil
document.getElementById('btn-menu').addEventListener('click', () => {
    document.getElementById('nav-menu').classList.toggle('activo');
});

// 5. Validación del Formulario
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

    // Validación customizada para el nombre
    if (soloNumeros.test(nombre)) {
        inputNombre.setCustomValidity('El nombre no puede ser solo números.');
        inputNombre.reportValidity();
        return;
    } else {
        inputNombre.setCustomValidity('');
    }

    if (!nombre || !correo || !tipo || !mensaje) {
        feedback.className = 'feedback-oculto error';
        feedback.textContent = 'Todos los campos son obligatorios.';
        return;
    }

    if (!formatoCorreo.test(correo)) {
        feedback.className = 'feedback-oculto error';
        feedback.textContent = 'Ingresa un correo válido.';
        return;
    }

    feedback.className = 'feedback-oculto exito';
    feedback.textContent = `¡Gracias ${nombre}! Formulario validado correctamente.`;
    formulario.reset();
});

inputNombre.addEventListener('input', () => {
    inputNombre.setCustomValidity('');
});