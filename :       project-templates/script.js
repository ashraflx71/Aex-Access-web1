// بيانات المنتجات التجريبية
const products = [
    { id: 1, name: "سماعات لاسلكية", price: 45, image: "https://via.placeholder.com/200?text=Headphones" },
    { id: 2, name: "ساعة ذكية", price: 120, image: "https://via.placeholder.com/200?text=Smartwatch" },
    { id: 3, name: "حقيبة ظهر", price: 35, image: "https://via.placeholder.com/200?text=Backpack" },
    { id: 4, name: "شاحن سريع", price: 25, image: "https://via.placeholder.com/200?text=Charger" }
];

let cart = [];

// عرض المنتجات في الصفحة
function displayProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price} $</p>
            <button class="btn-add" data-id="${product.id}">أضف إلى السلة</button>
        `;
        grid.appendChild(card);
    });

    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            const product = products.find(p => p.id === id);
            addToCart(product);
        });
    });
}

// إضافة منتج إلى السلة
function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

// تحديث واجهة السلة
function updateCartUI() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartCountSpan = document.getElementById('cart-count');
    const cartTotalSpan = document.getElementById('cart-total');

    let total = 0;
    let itemCount = 0;
    cartItemsDiv.innerHTML = '';

    cart.forEach(item => {
        total += item.price * item.quantity;
        itemCount += item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>${item.quantity} × ${item.price} $</span>
            <button class="remove-item" data-id="${item.id}">🗑️</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    cartCountSpan.innerText = itemCount;
    cartTotalSpan.innerText = total;

    // إضافة أحداث الحذف
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            cart = cart.filter(item => item.id !== id);
            updateCartUI();
        });
    });
}

// فتح/إغلاق السلة
document.querySelector('.cart-icon').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.add('open');
});
document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.remove('open');
});

// زر إتمام الشراء – عرض توضيحي
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("السلة فارغة، أضف منتجات أولاً.");
    } else {
        alert("شكراً للتجربة! هذا متجر توضيحي، لا يتم خصم أي مبلغ حقيقي.");
        cart = [];
        updateCartUI();
        document.getElementById('cart-sidebar').classList.remove('open');
    }
});

// بدء تشغيل المتجر
displayProducts();
