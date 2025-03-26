let inventory = [];

function addProduct() {
    const productName = document.getElementById("productName").value;
    const productStock = parseInt(document.getElementById("productStock").value);

    if (productName && !isNaN(productStock)) {
        const product = { id: Date.now(), name: productName, stock: productStock };
        inventory.push(product);
        document.getElementById("productName").value = "";
        document.getElementById("productStock").value = "";
        renderInventory();
    } else {
        alert("Please enter a valid product name and stock.");
    }
}

function deleteProduct(id) {
    inventory = inventory.filter(product => product.id !== id);
    renderInventory();
}

function editProduct(id) {
    const product = inventory.find(p => p.id === id);
    const newName = prompt("Edit product name:", product.name);
    const newStock = parseInt(prompt("Edit product stock:", product.stock));

    if (newName && !isNaN(newStock)) {
        product.name = newName;
        product.stock = newStock;
        renderInventory();
    } else {
        alert("Invalid input.");
    }
}

function renderInventory() {
    const inventoryBody = document.getElementById("inventoryBody");
    inventoryBody.innerHTML = "";

    inventory.forEach(product => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.stock}</td>
            <td class="availability ${product.stock > 100 ? "available" : "not-available"}">
                ${product.stock > 100 ? "Available" : "Not Available"}
            </td>
            <td>
                <button onclick="editProduct(${product.id})">Edit</button>
                <button onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;

        inventoryBody.appendChild(row);
    });
}
