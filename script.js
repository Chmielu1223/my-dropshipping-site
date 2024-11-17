// Scroll to products
function scrollToProducts() {
    document.querySelector("#products").scrollIntoView({ behavior: "smooth" });
}

// Add to cart
function addToCart(button) {
    const product = button.parentElement;
    const id = product.getAttribute("data-id");
    const name = product.getAttribute("data-name");
    const price = parseFloat(product.getAttribute("data-price"));

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ id, name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.querySelector("#cart-items");
    const totalElement = document.querySelector("#total");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ${item.price.toFixed(2)} zł`;
        cartItems.appendChild(li);
        total += item.price;
    });

    totalElement.textContent = `Łączna suma: ${total.toFixed(2)} zł`;
}

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", updateCartUI);


// Firebase konfiguracja w `script.js`
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Logowanie użytkownika
document.querySelector('#loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Zalogowano pomyślnie!");
        })
        .catch((error) => {
            alert(error.message);
        });
});


const axios = require('axios');

const createOrder = async (productId, quantity, customerInfo) => {
    const response = await axios.post('https://api.aliexpress.com/orders', {
        productId: productId,
        quantity: quantity,
        customer: customerInfo
    }, {
        headers: {
            'Authorization': 'Bearer YOUR_API_KEY'
        }
    });

    return response.data;
};

// Wywołanie po zatwierdzeniu płatności
createOrder('123456', 1, { name: 'Jan Kowalski', address: 'Warszawa' });