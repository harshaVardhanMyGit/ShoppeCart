const products = [
    { id: 1, name: "Apple", price: 250 },
    { id: 2, name: "Banana", price: 60 },
    { id: 3, name: "Orange", price: 120 }
];

let cart = [];

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
        cartDiv.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
        <div class="cart-item-content">
            <span><strong>${item.name}</strong> × ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">
            <i class="fas fa-trash"></i> Remove
        </button>
    `;
        cartDiv.appendChild(cartItem);
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartDiv.innerHTML += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
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

// Add event listeners after DOM is loaded
window.onload = function () {
    displayProducts();
    displayCart();
    document.getElementById("checkout-btn").onclick = showCheckout;
    document.getElementById("home-btn").onclick = goHome;
};

// Login logic
document.getElementById("login-form").onsubmit = function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("login-error");
    if (username === "HarshaTest" && password === "TESTMANUAL") {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("cart-section").style.display = "block";
        document.querySelector('.info-section').style.display = "none"; // Hide info-section
        displayProducts();
        displayCart();
        errorMsg.style.display = "none";
    } else {
        errorMsg.textContent = "Invalid username or password!";
        errorMsg.style.display = "block";
    }
};

document.getElementById("show-password").onchange = function () {
    const pwdInput = document.getElementById("password");
    pwdInput.type = this.checked ? "text" : "password";
};

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