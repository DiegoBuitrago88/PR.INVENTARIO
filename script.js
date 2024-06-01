// localStorage.setItem(
//   "productos",
//   JSON.stringify({
//     id: 1,
//     name: "Martillo",
//     category: "Herramientas",
//     quantity: 50,
//     price: 10,
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Esperanza_G%C3%B3mez_%2849731550047%29.jpg/640px-Esperanza_G%C3%B3mez_%2849731550047%29.jpg",
//   })
// );
document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#inventoryTable tbody");
  const lowStockTableBody = document.querySelector("#lowStockTable tbody");

  const datos = JSON.parse(localStorage.getItem("productos"));
  console.log({ datos });
  const inventoryData = [];
  if (datos) {
    console.log("si hay", { ...datos });
    inventoryData.push(...datos);
  }
  console.log({ inventoryData });

  if (tableBody) {
    console.log({ inventoryData });
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

      tableBody.appendChild(row);
    });

    const totalProducts = inventoryData.reduce(
      (total, item) => total + item.quantity,
      0
    );
    document.getElementById("total-products").textContent = totalProducts;

    const lowStockProducts = inventoryData.filter(
      (item) => item.quantity < 50
    ).length;
    document.getElementById("low-stock-products").textContent =
      lowStockProducts;

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
    const lowStockData = inventoryData.filter((item) => item.quantity < 50);
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

  const addProductForm = document.getElementById("addProductForm");

  addProductForm.addEventListener("submit", (e) => {
    console.log("Holaa");
    e.preventDefault();

    const name = document.getElementById("nombre").value;
    const category = document.getElementById("categoria").value;
    const quantity = parseInt(document.getElementById("cantidad").value);
    const price = parseFloat(document.getElementById("precio").value);
    const image = document.getElementById("imagen").value;
    console.log({ inventoryData });
    const nuevoProducto = {
      id: inventoryData.length + 1,
      name,
      category,
      quantity,
      price,
      image,
    };

    inventoryData.push(nuevoProducto);
    alert("Producto agregado exitosamente!");

    // Aquí puedes guardar en localStorage o actualizar el inventario de alguna forma
    localStorage.setItem("productos", JSON.stringify(inventoryData));

    addProductForm.reset();
  });
});
