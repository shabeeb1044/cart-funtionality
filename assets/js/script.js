// Dessert data
const desserts = [
    {
        "image": {
            "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
            "mobile": "./assets/images/image-waffle-mobile.jpg",
            "tablet": "./assets/images/image-waffle-tablet.jpg",
            "desktop": "./assets/images/image-waffle-desktop.jpg"
        },
        "name": "Waffle with Berries",
        "category": "Waffle",
        "price": 6.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
            "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
            "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
            "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
            "mobile": "./assets/images/image-macaron-mobile.jpg",
            "tablet": "./assets/images/image-macaron-tablet.jpg",
            "desktop": "./assets/images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
            "mobile": "./assets/images/image-tiramisu-mobile.jpg",
            "tablet": "./assets/images/image-tiramisu-tablet.jpg",
            "desktop": "./assets/images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
            "mobile": "./assets/images/image-baklava-mobile.jpg",
            "tablet": "./assets/images/image-baklava-tablet.jpg",
            "desktop": "./assets/images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
            "mobile": "./assets/images/image-meringue-mobile.jpg",
            "tablet": "./assets/images/image-meringue-tablet.jpg",
            "desktop": "./assets/images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
            "mobile": "./assets/images/image-cake-mobile.jpg",
            "tablet": "./assets/images/image-cake-tablet.jpg",
            "desktop": "./assets/images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
            "mobile": "./assets/images/image-brownie-mobile.jpg",
            "tablet": "./assets/images/image-brownie-tablet.jpg",
            "desktop": "./assets/images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
            "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
            "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
            "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50
    }
];

// DOM elements
const dessertItemsContainer = document.getElementById('dessert-items');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const orderTotal = document.querySelector('.items-total h4');

// Cart state
let cart = [];

// Function to render dessert items
function renderDessertItems() {
    dessertItemsContainer.innerHTML = '';
    desserts.forEach(dessert => {
        const dessertElement = document.createElement('div');
        dessertElement.className = 'col-md-4 item-card';
        dessertElement.innerHTML = `
            <article class="item">
                <div class="item-image">
                    <img class="item-img" src="${dessert.image.desktop}" alt="${dessert.name}" class="product-img">
                    <div class="add-to-cart-btn " aria-label="Add ${dessert.name} to cart" onclick="addToCart(${desserts.indexOf(dessert)})">
                        <span class="pe-2">
                            <img src="assets/images/icon-add-to-cart.svg" alt="" class="cart-icon">
                        </span>
                        <span>Add to cart<span/>
                    </div>
                </div>
                <div class="item-details mt-4">
                    <span class="">${dessert.category}</span>
                    <span>${dessert.name}</span>
                    <span class="price">$${dessert.price.toFixed(2)}</span>
                </div>
            </article>
        `;
        dessertItemsContainer.appendChild(dessertElement);
    });
}

// Function to add item to cart
function addToCart(index) {
    const dessert = desserts[index];
    const existingItem = cart.find(item => item.name === dessert.name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...dessert, quantity: 1 });
    }
    updateCart();
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Function to update cart display
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item pb-3';
        itemElement.innerHTML = `
            <h6>${item.name}</h6>
            <div class="cart-item-details">
                <span class="pe-4 cart-item-count">${item.quantity}x</span>
                <span class="pe-2 text-muted cart-item-price">$${item.price.toFixed(2)}</span>
                <span class="cart-item-total-price">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <button onclick="removeFromCart(${index})">
                <span class="cart-item-remove-btn"><i class="fa-sharp fa-solid fa-xmark"></i></span>
            </button>
        `;


        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    const hr = document.createElement('hr');
    cartItemsContainer.appendChild(hr);

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    orderTotal.textContent = `$${total.toFixed(2)}`;

    

}

renderDessertItems();
updateCart();



