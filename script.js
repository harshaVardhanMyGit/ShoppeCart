const relatedProducts = [
    { id: 101, name: "Kiwi", price: 40 },
    { id: 102, name: "Papaya", price: 30 },
    { id: 103, name: "Dragon Fruit", price: 80 }
];

let cart = [];

function toggleCredentials() {
    const box = document.getElementById("credentials-box");
    box.style.display = box.style.display === "none" ? "block" : "none";
}


function renderRelatedProducts() {
    const relatedDiv = document.getElementById("related-products");
    relatedProducts.forEach(item => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <p>${item.name}</p>
            <p>₹${item.price}</p>
            <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})">Add to Cart</button>
        `;
        relatedDiv.appendChild(card);
    });
}

function goHome() {
    document.getElementById("cart-section").style.display = "none";
    document.getElementById("login-section").style.display = "flex";
}


window.onload = function () {
  document.getElementById("login-form").onsubmit = function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("login-error");

    if (username === "HarshaTest" && password === "TESTMANUAL") {
      document.getElementById("login-section").style.display = "none";
      document.getElementById("cart-section").style.display = "block";
      document.querySelector(".info-section").style.display = "none";
      displayProducts();
      displayCart();
      errorMsg.style.display = "none";
    } else {
      errorMsg.textContent = "Invalid username or password!";
      errorMsg.style.display = "block";
    }
  };

  document.getElementById("showPassword").onchange = function () {
    const pwdInput = document.getElementById("password");
    pwdInput.type = this.checked ? "text" : "password";
  };

  document.getElementById("checkout-btn").onclick = showCheckout;
  document.getElementById("home-btn").onclick = goHome;
};


function displayProducts() {
    const productsDiv = document.getElementById("products");
    productsDiv.innerHTML = "";
    products.forEach(product => {
        const item = document.createElement("div");
        item.className = "product-card";
        item.innerHTML = `
    <div class="product-info">
        <div class="product-header">
            <h3 class="product-title">${product.name}</h3>
            <span class="product-price">Price: ₹${product.price}</span>
        </div>
    <p class="product-desc">Premium quality ${product.name.toLowerCase()}</p>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
            <i class="fas fa-cart-plus"></i> Add to Cart
        </button>
    </div>
  `;

        productsDiv.appendChild(item);
    });
}

function updateCartUI() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach(item => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <span><strong>${item.name}</strong></span>
            <span>₹${item.price}</span>
        `;
        cartDiv.appendChild(div);
    });
}


function displayCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p style='text-align:center;'>🛒 Your cart is empty.</p>";
        document.getElementById("subtotal").textContent = "0";
        document.getElementById("grand-total").textContent = "0";
        return;
    }

    const table = document.createElement("table");
    table.className = "cart-table";
    table.innerHTML = `
        <thead>
            <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Remove</th>
            </tr>
        </thead>
        <tbody>
            ${cart.map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                    <td><button onclick="removeFromCart(${item.id})" class="remove-btn"><i class="fas fa-trash"></i></button></td>
                </tr>
            `).join("")}
        </tbody>
    `;
    cartDiv.appendChild(table);

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("grand-total").textContent = subtotal.toFixed(2);
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    displayCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    displayCart();
}

// Show checkout page with cart items
function showCheckout() {
    document.getElementById("cart-section").style.display = "none";
    document.getElementById("checkout-section").style.display = "block";
    const checkoutDiv = document.getElementById("checkout-items");
    checkoutDiv.innerHTML = "";
    if (cart.length === 0) {
        checkoutDiv.innerHTML = "<p>No items in cart.</p>";
        return;
    }
    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `<span>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</span>`;
        checkoutDiv.appendChild(itemDiv);
    });
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    checkoutDiv.innerHTML += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
}

// Go to home page (login)
function goHome() {
    document.getElementById("checkout-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
    document.querySelector('.info-section').style.display = "flex"; // Show info-section
    cart = [];
    displayCart();
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("login-error").style.display = "none";
}

function toggleDemoPass() {
    const passSpan = document.getElementById("demo-pass");
    const actualSpan = document.getElementById("demo-pass-actual");
    if (passSpan.style.display !== "none") {
        passSpan.style.display = "none";
        actualSpan.style.display = "inline";
    } else {
        passSpan.style.display = "inline";
        actualSpan.style.display = "none";
    }
}