
const btnProducto = document.getElementById("btnAdd");

document.getElementById('addProductForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const datosAnteriores = JSON.parse(localStorage.getItem("productos")) || []

    const formData = new FormData(event.target);

    const datosFormulario = {
        id: datosAnteriores.length + 1,
        name: formData.get('nombre'),
        price: formData.get('precio'),
        category: formData.get('categoria'),
        quantity: formData.get('cantidad'),
        image: formData.get('imagen')
    };

    datosAnteriores.push(datosFormulario);
    localStorage.setItem("productos", JSON.stringify(datosAnteriores))

    event.target.reset();

    window.location.href = 'index.html';

});

