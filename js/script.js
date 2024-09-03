
const menuItemsUrl = 'menu.json';
const accountsUrl = 'accounts.json';
async function renderMenuItems(category = 'all') {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = '';

    try {
        const response = await fetch(menuItemsUrl);
        const menuItems = await response.json();

        const filteredItems = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);

        filteredItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('col-md-4');
            itemElement.innerHTML = `
                <div class="card mb-4">
                    <img src="${item.image}" class="card-img-top" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.description}</p>
                        <p class="card-text">$${item.price.toFixed(2)}</p>
                        <button class="btn btn-primary" onclick="addToCart('${item.name}', ${item.price}, '${item.image}', '${item.description}')">Add to Cart</button>
                    </div>
                </div>
            `;
            menuContainer.appendChild(itemElement);
        });
    } catch (error) {
        console.error('Error fetching menu items:', error);
    }
}


function loadCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}


function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function addToCart(name, price, image, description) {
    const cart = loadCart();
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const item = { name, price, image, description, quantity: 1 };
        cart.push(item);
    }
    saveCart(cart);
    updateCartUI(); 
}


function changeQuantity(name, increment) {
    const cart = loadCart();
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += increment;
        if (item.quantity <= 0) {
            const index = cart.indexOf(item);
            if (index > -1) {
                cart.splice(index, 1);
            }
        }
        saveCart(cart);
        updateCartUI();
    }
}

function removeItem(name) {
    const cart = loadCart();
    const index = cart.findIndex(item => item.name === name);
    if (index !== -1) {
        cart.splice(index, 1);
        saveCart(cart);
        updateCartUI();
    }
}


function clearCart() {
    localStorage.removeItem('cart');
    updateCartUI();
}


function updateCartUI() {
    const cartItemsDropdown = document.getElementById('cart-items-dropdown');
    const cartItemsPage = document.getElementById('cart-items');
    const cartCounter = document.getElementById('cart-counter');
    const cartTotal = document.getElementById('cart-total');

    const cart = loadCart();
    if (cartItemsDropdown) {
        cartItemsDropdown.innerHTML = '';
    }
    if (cartItemsPage) {
        cartItemsPage.innerHTML = '';
    }

    let total = 0;

    cart.forEach(item => {
        const itemElementDropdown = document.createElement('li');
        itemElementDropdown.classList.add('list-group-item');
        itemElementDropdown.innerHTML = `
            <img src="${item.image}" class="img-thumbnail" alt="${item.name}" style="width: 50px; height: 50px;">
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
        `;
        if (cartItemsDropdown) {
            cartItemsDropdown.appendChild(itemElementDropdown);
        }

        const itemElementPage = document.createElement('tr');
        itemElementPage.innerHTML = `
            <td><img src="${item.image}" class="img-thumbnail" alt="${item.name}" style="width: 50px; height: 50px;"></td>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-secondary" onclick="changeQuantity('${item.name}', -1)">-</button>
                ${item.quantity}
                <button class="btn btn-sm btn-secondary" onclick="changeQuantity('${item.name}', 1)">+</button>
                <button class="btn btn-sm btn-danger" onclick="removeItem('${item.name}')">Remove</button>
            </td>
        `;
        if (cartItemsPage) {
            cartItemsPage.appendChild(itemElementPage);
        }
        total += item.price * item.quantity;
    });

    if (cartCounter) {
        cartCounter.textContent = cart.length;
    }

    if (cartTotal) {
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}


async function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(accountsUrl);
        const accounts = await response.json();

        const account = accounts.find(acc => acc.username === username && acc.password === password);
        if (account) {
            alert('Login successful!');
            $('#loginModal').modal('hide');
        } else {
            alert('Invalid username or password.');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}


function toggleLoginModal() {
    $('#loginModal').modal('toggle');
}


function checkout() {
    if (loadCart().length === 0) {
        alert('Your cart is empty.');
        return;
    }
    alert('Checkout functionality is not implemented yet.');
}


document.getElementById('categoryFilter')?.addEventListener('change', (event) => {
    const category = event.target.value;
    renderMenuItems(category);
});


if (document.getElementById('menu-items')) {
    document.addEventListener('DOMContentLoaded', () => {
        renderMenuItems();
        updateCartUI(); 
    });
}


if (document.getElementById('cart-items')) {
    document.addEventListener('DOMContentLoaded', () => {
        updateCartUI();
    });
}
