document.addEventListener('DOMContentLoaded', () => {
    const inventoryData = [
        { id: 1, name: 'Martillo', category: 'Herramientas', quantity: 50, price: 10 },
        { id: 2, name: 'Tornillos', category: 'Fijaciones', quantity: 200, price: 0.05 },
        { id: 3, name: 'Llave Inglesa', category: 'Herramientas', quantity: 30, price: 15 },
        { id: 4, name: 'Taladro', category: 'Herramientas', quantity: 20, price: 100 },
        { id: 5, name: 'Cinta Métrica', category: 'Medición', quantity: 150, price: 5 },
        { id: 6, name: 'Clavos', category: 'Fijaciones', quantity: 500, price: 0.02 },
        { id: 7, name: 'Sierra', category: 'Herramientas', quantity: 25, price: 20 },
        { id: 8, name: 'Nivel', category: 'Medición', quantity: 35, price: 7 },
        // Más datos de inventario aquí
    ];

    const tableBody = document.querySelector('#inventoryTable tbody');
    const lowStockTableBody = document.querySelector('#lowStockTable tbody');

    if (tableBody) {
        // Agregar filas a la tabla en el dashboard
        inventoryData.forEach(item => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = item.id;
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;
            row.appendChild(nameCell);

            const categoryCell = document.createElement('td');
            categoryCell.textContent = item.category;
            row.appendChild(categoryCell);

            const quantityCell = document.createElement('td');
            quantityCell.textContent = item.quantity;
            row.appendChild(quantityCell);

            const priceCell = document.createElement('td');
            priceCell.textContent = `$${item.price}`;
            row.appendChild(priceCell);

            tableBody.appendChild(row);
        });

        // Calcular productos totales
        const totalProducts = inventoryData.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('total-products').textContent = totalProducts;

        // Calcular productos bajos (cantidad < 50)
        const lowStockProducts = inventoryData.filter(item => item.quantity < 50).length;
        document.getElementById('low-stock-products').textContent = lowStockProducts;

        // Calcular ventas del mes
        const monthlySales = inventoryData.reduce((total, item) => total + (item.quantity * item.price), 0);
        document.getElementById('monthly-sales').textContent = `$${monthlySales}`;

        // Evento de clic en la tarjeta de productos bajos
        document.getElementById('low-stock-card').addEventListener('click', () => {
            window.location.href = 'low-stock.html';
        });
          document.getElementById('inventarios').addEventListener('click', () => {
            window.location.href = 'add-product.html';
        });
    }

    if (lowStockTableBody) {
        // Agregar filas a la tabla de productos bajos
        const lowStockData = inventoryData.filter(item => item.quantity < 50);
        lowStockData.forEach(item => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = item.id;
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;
            row.appendChild(nameCell);

            const categoryCell = document.createElement('td');
            categoryCell.textContent = item.category;
            row.appendChild(categoryCell);

            const quantityCell = document.createElement('td');
            quantityCell.textContent = item.quantity;
            row.appendChild(quantityCell);

            const priceCell = document.createElement('td');
            priceCell.textContent = `$${item.price}`;
            row.appendChild(priceCell);

            lowStockTableBody.appendChild(row);
        });
    }
  });
const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('nombre').value;
            const category = document.getElementById('categoria').value;
            const quantity = parseInt(document.getElementById('cantidad').value);
            const price = parseFloat(document.getElementById('precio').value);
            const imagen = document.getElementById('imagen').value;
            
            const nuevoProducto = {
                id: productos.length + 1,
                name,
                category,
                quantity,
                price,
            };
            
           inventoryData.push(nuevoProducto);
            alert('Producto agregado exitosamente!');
            
            // Aquí puedes guardar en localStorage o actualizar el inventario de alguna forma
            localStorage.setItem('productos', JSON.stringify(productos));
            
            addProductForm.reset();
        });
    }
  