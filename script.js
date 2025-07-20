const products = [
    { id: 1, name: "Apple", price: 1.2 },
    { id: 2, name: "Banana", price: 0.8 },
    { id: 3, name: "Orange", price: 1.5 }
];

let cart = [];

function displayProducts() {
    const productsDiv = document.getElementById("products");
    productsDiv.innerHTML = "";
    products.forEach(product => {
        const item = document.createElement("div");
        item.className = "product";
        item.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsDiv.appendChild(item);
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
            <span>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
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
    cart = [];
    displayCart();
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("login-error").style.display = "none";
}

// Add event listeners after DOM is loaded
window.onload = function() {
    displayProducts();
    displayCart();
    document.getElementById("checkout-btn").onclick = showCheckout;
    document.getElementById("home-btn").onclick = goHome;
};

// Login logic
document.getElementById("login-form").onsubmit = function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("login-error");
    if (username === "HarshaTest" && password === "TESTMANUAL") {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("cart-section").style.display = "block";
        displayProducts();
        displayCart();
    } else {
        errorMsg.textContent = "Invalid username or password!";
        errorMsg.style.display = "block";
    }
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