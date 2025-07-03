// =====================
// Global Data
// =====================
let products = [
  {
    name: "Cotton Kurti",
    price: 350,
    category: "Garments",
    image: "https://i.postimg.cc/qRrPzTPb/IMG20250702202249.jpg",
    qty: 1
  },
  {
    name: "Men's T-shirt",
    price: 499,
    category: "Garments",
    image: "https://i.postimg.cc/qRrPzTPb/IMG20250702202249.jpg",
    qty: 1
  },
  {
    name: "Air Pistol X1",
    price: 3499,
    category: "Air Pistols",
    image: "https://i.postimg.cc/qRrPzTPb/IMG20250702202249.jpg",
    qty: 1
  },
  {
    name: "Target Board",
    price: 899,
    category: "Air Pistols",
    image: "https://i.postimg.cc/qRrPzTPb/IMG20250702202249.jpg",
    qty: 1
  }
];
let cart = [];
let orders = [];

// =====================
// Display Products
// =====================
function showProducts(list) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";
  list.forEach((p, i) => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${i})">Add to Cart</button>
      </div>
    `;
  });
}
showProducts(products);

// =====================
// Search
// =====================
document.getElementById("searchBox").addEventListener("input", function(e) {
  const keyword = e.target.value.toLowerCase();
  const result = products.filter(p => p.name.toLowerCase().includes(keyword));
  showProducts(result);
});

// =====================
// Category Filter
// =====================
function filterByCategory(category) {
  if (category === "All") {
    showProducts(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    showProducts(filtered);
  }
}

// =====================
// Cart System
// =====================
function addToCart(index) {
  const item = { ...products[index] };
  const existing = cart.find(p => p.name === item.name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push(item);
  }
  alert(`${item.name} added to cart!`);
}

function viewCart() {
  openPopup("cartPopup");
  const list = document.getElementById("cartItems");
  const totalBox = document.getElementById("totalAmount");
  list.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price * item.qty;
    list.innerHTML += `
      <li>
        ${item.name} - ₹${item.price} x 
        <button onclick="decreaseQty(${i})">-</button> 
        ${item.qty} 
        <button onclick="increaseQty(${i})">+</button>
      </li>
    `;
  });

  totalBox.innerText = "Total: ₹" + total;
}
function increaseQty(index) {
  cart[index].qty++;
  viewCart();
}
function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty--;
  } else {
    cart.splice(index, 1);
  }
  viewCart();
}

// =====================
// Login / Register
// =====================
function submitLogin() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (u && p) {
    alert("Welcome back, " + u);
    closePopup("loginPopup");
  } else {
    alert("Enter username and password");
  }
}
function submitRegister() {
  const u = document.getElementById("newUser").value;
  const e = document.getElementById("newEmail").value;
  const p = document.getElementById("newPass").value;
  if (u && e && p) {
    alert("Thank you for registering, " + u);
    closePopup("registerPopup");
  } else {
    alert("Please fill all fields");
  }
}

// =====================
// Order System
// =====================
function placeOrder() {
  if (cart.length === 0) return alert("Cart is empty!");
  orders.push(...cart);
  alert("Your order has been placed!");
  cart = [];
  closePopup("orderPopup");
}

// =====================
// Admin Panel (Add Product)
// =====================
function addProduct() {
  const name = document.getElementById("pName").value;
  const price = parseInt(document.getElementById("pPrice").value);
  const img = document.getElementById("pImage").value;
  const cat = document.getElementById("pCategory").value;

  if (name && price && img && cat) {
    products.push({ name, price, image: img, category: cat, qty: 1 });
    alert("Product added!");
    showProducts(products);
    closePopup("adminPopup");
  } else {
    alert("Fill all fields to add product.");
  }
}

// =====================
// Dark Mode Toggle
// =====================
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// =====================
// Popups
// =====================
function openPopup(id) {
  document.getElementById(id).style.display = "flex";
}
function closePopup(id) {
  document.getElementById(id).style.display = "none";
}

// =====================
// Mobile Menu Toggle
// =====================
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}