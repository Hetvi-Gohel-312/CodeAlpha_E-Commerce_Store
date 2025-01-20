// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalDisplay = document.getElementById('subtotal');
    const grandTotalDisplay = document.getElementById('grand-total');
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    // Loop through the cart and create the HTML for each item
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Price: $${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-container">
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
            <span>Total: $${itemTotal.toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    subtotalDisplay.textContent = `$${subtotal.toFixed(2)}`;
    grandTotalDisplay.textContent = `$${(subtotal + 5).toFixed(2)}`; // Add $5 shipping fee
}

// Update the quantity of a cart item
function updateQuantity(index, quantity) {
    if (quantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = parseInt(quantity);
        localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
        updateCartInBackend();  // Send updated cart data to the backend
        updateCartDisplay();
    }
}

// Remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
    updateCartInBackend();  // Send updated cart data to the backend
    updateCartDisplay();
}

// Send the updated cart data to the backend
function updateCartInBackend() {
    cart.forEach(item => {
        fetch('http://localhost:5500/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId: item.id, quantity: item.quantity }) // Send individual item data to the backend
        })
        .then(response => response.json())
        .then(data => {
            console.log('Cart updated:', data.cart); // Log success message from backend
        })
        .catch(error => console.error('Error updating cart:', error));
    });
}

// Checkout function for the button
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Add items to proceed.');
    } else {
        alert('Proceeding to checkout...');
        window.location.href = 'checkout.html'; // Replace with your checkout page URL
    }
}

// Call the function to update the cart display when the page loads
updateCartDisplay();
function emptyCart() {
    if (confirm('Are you sure you want to empty the cart?')) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        alert('Cart has been emptied.');
    }
}

updateCartDisplay();