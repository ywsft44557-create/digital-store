/* ================================================
   DigitalHub - متجر المنتجات الرقمية
   JavaScript Functions
   ================================================ */

// Products Data
const products = [
  {
    id: 1,
    title: "دليل النجاح في الأعمال",
    category: "books",
    categoryLabel: "كتب",
    icon: "📚",
    price: 49,
    originalPrice: 99,
    rating: 5
  },
  {
    id: 2,
    title: "تعلم البرمجة من الصفر",
    category: "courses",
    categoryLabel: "دورات",
    icon: "🎓",
    price: 199,
    originalPrice: 399,
    rating: 5
  },
  {
    id: 3,
    title: "حزمة المؤثرات الصوتية",
    category: "audio",
    categoryLabel: "أصوات",
    icon: "🎵",
    price: 79,
    originalPrice: 149,
    rating: 4
  },
  {
    id: 4,
    title: "نظام إدارة المشاريع",
    category: "software",
    categoryLabel: "برمجيات",
    icon: "💻",
    price: 299,
    originalPrice: 499,
    rating: 5
  },
  {
    id: 5,
    title: "كتب تطوير الذات",
    category: "books",
    categoryLabel: "كتب",
    icon: "📚",
    price: 39,
    originalPrice: 79,
    rating: 4
  },
  {
    id: 6,
    title: "دورة التسويق الرقمي",
    category: "courses",
    categoryLabel: "دورات",
    icon: "🎓",
    price: 149,
    originalPrice: 299,
    rating: 5
  },
  {
    id: 7,
    title: " مكتبة الأصوات الاحترافية",
    category: "audio",
    categoryLabel: "أصوات",
    icon: "🎵",
    price: 129,
    originalPrice: 249,
    rating: 4
  },
  {
    id: 8,
    title: "برنامج إدارة الوقت",
    category: "software",
    categoryLabel: "برمجيات",
    icon: "💻",
    price: 89,
    originalPrice: 179,
    rating: 5
  }
];

// Cart Data
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartOverlay = document.getElementById('cartOverlay');
const cartBtn = document.getElementById('cartBtn');
const cartClose = document.getElementById('cartClose');
const checkoutBtn = document.getElementById('checkoutBtn');
const totalPrice = document.getElementById('totalPrice');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  loadCart();
  initAnimations();
  initEventListeners();
});

// Render Products
function renderProducts(productsToRender) {
  productsGrid.innerHTML = productsToRender.map((product, index) => `
    <div class="product-card" data-category="${product.category}" style="animation-delay: ${index * 0.1}s">
      <div class="product-image">
        <span class="product-icon">${product.icon}</span>
        <span class="product-badge">${product.categoryLabel}</span>
      </div>
      <div class="product-info">
        <div class="product-category">${product.categoryLabel}</div>
        <h3 class="product-title">${product.title}</h3>
        <div class="product-rating">
          ${renderStars(product.rating)}
        </div>
        <div class="product-price" style="display: none;">
          <span class="price-current">${product.price} ر.س</span>
          ${product.originalPrice ? `<span class="price-original">${product.originalPrice} ر.س</span>` : ''}
        </div>
        <button class="add-to-cart" onclick="addToCart(${product.id})" style="display: none;">
          <span>🛒 إضافة للسلة</span>
        </button>
      </div>
    </div>
  `).join('');
}

// Render Stars
function renderStars(rating) {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    stars += `<span class="star">${i < rating ? '★' : '☆'}</span>`;
  }
  return stars;
}

// Add to Cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    showToast('المنتج موجود بالفعل في السلة!');
    return;
  }

  cart.push({ ...product });
  saveCart();
  updateCartUI();
  
  // Button animation
  const btn = event.target.closest('.add-to-cart');
  btn.classList.add('added');
  btn.innerHTML = '<span>✓تمت الإضافة</span>';
  
  showToast('تمت إضافة المنتج للسلة!');
  
  setTimeout(() => {
    btn.classList.remove('added');
    btn.innerHTML = '<span>🛒 إضافة للسلة</span>';
  }, 2000);
}

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  showToast('تمت إزالة المنتج من السلة!');
}

// Update Cart UI
function updateCartUI() {
  // Update cart count
  cartCount.textContent = cart.length;
  cartCount.style.display = cart.length > 0 ? 'flex' : 'none';

  // Update cart items
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <span>🛒</span>
        <p>السلة فارغة</p>
      </div>
    `;
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-image">${item.icon}</div>
        <div class="cart-item-info">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-price">${item.price} ر.س</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">🗑️</button>
      </div>
    `).join('');
  }

  // Update total
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalPrice.textContent = `${total} ر.س`;
}

// Save Cart to LocalStorage
function saveCart() {
  localStorage.setItem('digitalhub-cart', JSON.stringify(cart));
}

// Load Cart from LocalStorage
function loadCart() {
  const savedCart = localStorage.getItem('digitalhub-cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
  }
}

// Show Toast
function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Filter Products
function filterProducts(category) {
  if (category === 'all') {
    renderProducts(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

// Search Products
function searchProducts(query) {
  const searchTerm = query.toLowerCase();
  const filtered = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm) ||
    p.categoryLabel.toLowerCase().includes(searchTerm)
  );
  renderProducts(filtered);
}

// Init Event Listeners
function initEventListeners() {
  // Cart Modal
  cartBtn.addEventListener('click', () => {
    cartModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  cartClose.addEventListener('click', closeCartModal);
  cartOverlay.addEventListener('click', closeCartModal);

  function closeCartModal() {
    cartModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Checkout
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('السلة فارغة!');
      return;
    }
    showToast('شكراً لك! جاري معالجة طلبك...');
    setTimeout(() => {
      cart = [];
      saveCart();
      updateCartUI();
      closeCartModal();
      showToast('تم إتمام طلبك بنجاح!');
    }, 2000);
  });

  // Filter Buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterProducts(btn.dataset.category);
    });
  });

  // Search
  searchInput.addEventListener('input', (e) => {
    searchProducts(e.target.value);
  });

  // Smooth Scroll for Nav Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

// Init Animations
function initAnimations() {
  // Header scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.padding = '12px 0';
      header.style.background = 'rgba(8, 8, 8, 0.95)';
    } else {
      header.style.padding = '16px 0';
      header.style.background = 'rgba(8, 8, 8, 0.8)';
    }
    
    lastScroll = currentScroll;
  });

  // Stats counter animation
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const target = parseInt(stat.dataset.count);
    animateCounter(stat, target);
  });
}

// Animate Counter
function animateCounter(element, target) {
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}