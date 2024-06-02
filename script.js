document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#inventoryTable tbody");
    const lowStockTableBody = document.querySelector("#lowStockTable tbody");
    const supplierTableBody = document.querySelector("#supplierTable tbody");

    const suppliersData = JSON.parse(localStorage.getItem("suppliers")) || [];
    const inventoryData = JSON.parse(localStorage.getItem("productos"));


    const renderSuppliersTable = () => {
        supplierTableBody.innerHTML = ""; // Limpiar la tabla antes de renderizar
        suppliersData.forEach((supplier) => {
            const row = document.createElement("tr");

            const idCell = document.createElement("td");
            idCell.textContent = supplier.id;
            row.appendChild(idCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = supplier.name;
            row.appendChild(nameCell);

            const productsCell = document.createElement("td");
            productsCell.textContent = supplier.products.join(", ");
            row.appendChild(productsCell);

            const phoneCell = document.createElement("td");
            phoneCell.textContent = supplier.phone;
            row.appendChild(phoneCell);

            const addressCell = document.createElement("td");
            addressCell.textContent = supplier.address;
            row.appendChild(addressCell);

            supplierTableBody.appendChild(row);
        });
    };


    renderSuppliersTable();

    const supplierForm = document.getElementById("supplierForm");
    if (supplierForm) {
        supplierForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("supplierName").value;
            const products = document.getElementById("productsSupplied").value.split(",").map(product => product.trim());
            const phone = document.getElementById("supplierPhone").value;
            const address = document.getElementById("supplierAddress").value;

            const newSupplier = {
                id: suppliersData.length + 1,
                name,
                products,
                phone,
                address
            };

            suppliersData.push(newSupplier);
            localStorage.setItem("suppliers", JSON.stringify(suppliersData));
            renderSuppliersTable();

            supplierForm.reset();
        });
    }

    // Código previo para el manejo del inventario y productos bajos...
    if (tableBody) {
        inventoryData.forEach((item) => {
            const row = document.createElement("tr");

            const idCell = document.createElement("td");
            idCell.textContent = item.id;
            row.appendChild(idCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = item.name;
            row.appendChild(nameCell);

            const categoryCell = document.createElement("td");
            categoryCell.textContent = item.category;
            row.appendChild(categoryCell);

            const quantityCell = document.createElement("td");
            quantityCell.textContent = item.quantity;
            row.appendChild(quantityCell);

            const priceCell = document.createElement("td");
            priceCell.textContent = `$${item.price}`;
            row.appendChild(priceCell);

            const imageCell = document.createElement("td");
            const imageElement = document.createElement("img");



            imageElement.src = item.image;
            imageElement.alt = item.name;
            imageElement.style.maxWidth = "100px"; // Establece el ancho máximo de la imagen
            imageElement.style.maxHeight = "100px";
            imageCell.appendChild(imageElement);
            row.appendChild(imageCell);

            const acciones = document.createElement("td");
            // acciones.textContent = "$Acciones";
            acciones.innerHTML = `<a href="/edit-producto.html?id=${item.id}">Editar</a>`
            row.appendChild(acciones);

            tableBody.appendChild(row);
        });

        const totalProducts = inventoryData.reduce(
            (total, item) => total + parseInt(item.quantity),
            0
        );
        console.log(totalProducts);
        document.getElementById("total-products").textContent = totalProducts;

        const lowStockProducts = inventoryData.filter(
            (item) => item.quantity < 10

        ).length;
        document.getElementById("low-stock-products").textContent = lowStockProducts;

        const monthlySales = inventoryData.reduce(
            (total, item) => total + item.quantity * item.price,
            0
        );
        document.getElementById("monthly-sales").textContent = `$${monthlySales}`;

        document.getElementById("low-stock-card").addEventListener("click", () => {
            window.location.href = "low-stock.html";
        });
        document.getElementById("inventarios").addEventListener("click", () => {
            window.location.href = "add-product.html";
        });
    }

    if (lowStockTableBody) {
        const lowStockData = inventoryData.filter((item) => item.quantity < 10);
        lowStockData.forEach((item) => {
            const row = document.createElement("tr");

            const idCell = document.createElement("td");
            idCell.textContent = item.id;
            row.appendChild(idCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = item.name;
            row.appendChild(nameCell);

            const categoryCell = document.createElement("td");
            categoryCell.textContent = item.category;
            row.appendChild(categoryCell);

            const quantityCell = document.createElement("td");
            quantityCell.textContent = item.quantity;
            row.appendChild(quantityCell);

            const priceCell = document.createElement("td");
            priceCell.textContent = `$${item.price}`;
            row.appendChild(priceCell);

            lowStockTableBody.appendChild(row);
        });
    }

    //   const addProductForm = document.getElementById("addProductForm");


});
