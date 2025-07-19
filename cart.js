let cart = JSON.parse(localStorage.getItem("cart")) || [];

function toggleCart() {
  const cartSidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("overlay");
  cartSidebar.classList.toggle("open");
  overlay.classList.toggle("show");
  displayCart();
}

function addToCart(productName, price) {
  const existing = cart.find(item => item.name === productName);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name: productName, price: price, quantity: 1 });
  }
  saveCart();
  updateCartCount();
}

function displayCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    cartItems.innerHTML += `
      <div class="cart-item">
        <h4>${item.name}</h4>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>Quantity: 
          <button onclick="changeQty(${index}, -1)">-</button> 
          ${item.quantity} 
          <button onclick="changeQty(${index}, 1)">+</button>
          <button onclick="removeItem(${index})">🗑️</button>
        </p>
      </div>
    `;
  });

  cartTotal.textContent = total.toFixed(2);
}

function changeQty(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  saveCart();
  displayCart();
  updateCartCount();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
  updateCartCount();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").textContent = count;
}

// Initialize cart count on load
window.addEventListener("DOMContentLoaded", updateCartCount);
