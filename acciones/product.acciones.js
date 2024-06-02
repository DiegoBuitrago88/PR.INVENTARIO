
const params = new URLSearchParams(window.location.search);

// Obtiene los valores de los parámetros
const id = params.get('id');
const productos = JSON.parse(localStorage.getItem("productos"));
const producto = productos.find(producto => producto.id == id);
const formulario = document.getElementById("addProductForm");
const productoIndex = productos.findIndex(producto => producto.id == id);

formulario.nombre.value = producto.name;
formulario.categoria.value = producto.category;
formulario.precio.value = producto.price;
formulario.cantidad.value = producto.quantity;
formulario.imagen.value = producto.image;


document.getElementById('addProductForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const datosAnteriores = JSON.parse(localStorage.getItem("productos")) || []

    const formData = new FormData(event.target);


    datosAnteriores[productoIndex].name = formData.get('nombre')
    datosAnteriores[productoIndex].price = formData.get('precio')
    datosAnteriores[productoIndex].category = formData.get('categoria')
    datosAnteriores[productoIndex].quantity = formData.get('cantidad')
    datosAnteriores[productoIndex].image = formData.get('imagen')


    localStorage.setItem("productos", JSON.stringify(datosAnteriores))

    event.target.reset();

    window.location.href = 'index.html';

});


