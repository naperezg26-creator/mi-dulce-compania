const productos = [
    {
        nombre: "Suéter",
        precio: 25.00,
        imagen: "assets/perrosueter.png",
        descripcion: "Ideal para los días fríos."
    },
    {
        nombre: "Corbatín",
        precio: 12.00,
        imagen: "assets/perrocorbatin.png",
        descripcion: "Para eventos especiales."
    },
    {
        nombre: "Impermeable",
        precio: 30,
        imagen: "assets/perroimpermeable.png",
        descripcion: "Que la lluvia no detenga."
    },
    {
        nombre: "Nube",
        precio: 45,
        imagen: "assets/perronube.png",
        descripcion: "El mejor descanso."
    }
];

function cargarTienda() {
    const contenedor = document.getElementById('contenedor-productos');
    
    if (!contenedor) return;

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];


        

        // Creamos el HTML de la tarjeta (Card de Bootstrap)
        const htmlProducto = `
            <div class="col-12 col-md-6 col-lg-3 mb-4">
                <div class="card h-100 shadow-sm border-0">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height: 200px; object-fit: cover;">
                    <div class="card-body text-center">
                        <h5 class="card-title text-pastel-blue">${producto.nombre}</h5>
                        <p class="card-text text-muted">${producto.descripcion}</p>
                        <p class="fw-bold">$${producto.precio}</p>
                        <button class="btn btn-pastel w-100">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        `;

        // Inyectamos el HTML en el contenedor
        contenedor.innerHTML += htmlProducto;
    }
}

// Ejecutamos la función cuando carga la página
cargarTienda();