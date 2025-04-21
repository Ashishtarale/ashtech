const products = [
  { id: 1, name: "Classic Sneakers", price: 4500, img: "https://via.placeholder.com/200x200?text=Sneakers" },
  { id: 2, name: "Leather Jacket", price: 7999, img: "https://via.placeholder.com/200x200?text=Jacket" },
  { id: 3, name: "Smart Watch", price: 9999, img: "https://via.placeholder.com/200x200?text=Watch" },
  { id: 4, name: "Wireless Earbuds", price: 3499, img: "https://via.placeholder.com/200x200?text=Earbuds" },
  { id: 5, name: "Backpack", price: 2299, img: "https://via.placeholder.com/200x200?text=Backpack" },
  { id: 6, name: "Denim Jeans", price: 1999, img: "https://via.placeholder.com/200x200?text=Jeans" },
  { id: 7, name: "Fitness Tracker", price: 2999, img: "https://via.placeholder.com/200x200?text=Tracker" },
  { id: 8, name: "Running Shoes", price: 4999, img: "https://via.placeholder.com/200x200?text=Shoes" },
  { id: 9, name: "Graphic T-shirt", price: 999, img: "https://via.placeholder.com/200x200?text=Tshirt" },
  { id: 10, name: "Bluetooth Speaker", price: 1599, img: "https://via.placeholder.com/200x200?text=Speaker" },
];

function renderProducts() {
  const list = document.getElementById('productList');
  products.forEach(prod => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${prod.img}" alt="${prod.name}">
      <h3>${prod.name}</h3>
      <p>₹${prod.price}</p>
      <button onclick="addToCart(${prod.id})">Add to Cart</button>
    `;
    list.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(product.name + " added to cart!");
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cartItems');

  cart.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `<p>${item.name} x ${item.quantity} - ₹${item.price * item.quantity}</p>`;
    cartItems.appendChild(div);
  });
}

function renderProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id'));
  const product = products.find(p => p.id === id);

  const detail = document.getElementById('productDetail');
  detail.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.img}" alt="${product.name}">
    <p>Price: ₹${product.price}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
}

function renderCheckout() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const checkoutProducts = document.getElementById('checkoutProducts');

  cart.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `<p>${item.name} x ${item.quantity} - ₹${item.price * item.quantity}</p>`;
    checkoutProducts.appendChild(div);
  });
}

function payNow() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  const options = {
    key: "rzp_test_your_test_key", // Replace with your Razorpay test key
    amount: total * 100,
    currency: "INR",
    name: "MyShop",
    description: "Test Transaction",
    handler: function (response) {
      alert('Payment Successful! ID: ' + response.razorpay_payment_id);
      localStorage.removeItem('cart');
      window.location.href = "success.html";
    },
    prefill: {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      contact: document.getElementById('phone').value
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}
