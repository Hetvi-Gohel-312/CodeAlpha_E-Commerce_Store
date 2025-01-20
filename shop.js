const conversionRate = 82; // Conversion rate from USD to INR

        const products = [
            {
                id: 1,
                name: "Floor-Length Anarkali",
                price: 19.99 * conversionRate,
                image: "https://i.pinimg.com/564x/5e/52/4b/5e524b015cfba8e36e8312769a296fb2.jpg"
            },
            {
                id: 2,
                name: "Elegant Georgette Lehenga",
                price: 30 * conversionRate,
                image: "https://i.pinimg.com/736x/8d/35/5f/8d355f6fa40d5b503d248d697bdf9124.jpg"
            },
            {
                id: 3,
                name: "Accesories",
                price: 18 * conversionRate,
                image: "https://i.pinimg.com/736x/f3/8a/09/f38a090684d1022de854b36a0a4d0c55.jpg" 
            },
            {
                id: 4,
                name: "High Black Heels",
                price: 8 * conversionRate,
                image: "https://i.pinimg.com/564x/23/b6/cb/23b6cb9b22f266382dbdc2036d46c7eb.jpg"
            },
            {
                id: 5,
                name: "Golden Sandals",
                price: 10 * conversionRate,
                image: "https://i.pinimg.com/564x/b3/93/aa/b393aa5b016b1458aa055481a90702d4.jpg" 
            },
            {
                id: 6,
                name: "Casual Outfit",
                price: 11.99 * conversionRate,
                image: "https://i.pinimg.com/736x/85/4e/d7/854ed74ff59cc0271c479f81950687d0.jpg" 
            },
            {
                id: 7,
                name: "Collar Waist Rushed Jacket",
                price: 11.99 * conversionRate,
                image: "https://i.pinimg.com/736x/b4/a8/30/b4a8304dcd9b48776a5ead9173b04075.jpg" 
            },
            {
                id: 8,
                name: "Frock",
                price: 11.99 * conversionRate,
                image: "https://i.pinimg.com/736x/71/77/fc/7177fc04400ce80adcd1ba264ff40fbe.jpg" 
            },
            {
                id: 9,
                name: "Urban Explorer Cargo Pants",
                price: 12 * conversionRate,
                image: "https://i.pinimg.com/564x/9f/b9/77/9fb977b483f641fc174f937f59b4f85d.jpg"
            },
            {
                id: 10,
                name: "Classic Fit Denim Jacket",
                price: 12.50 * conversionRate,
                image: "https://i.pinimg.com/736x/a8/06/7d/a8067def99c3779d049969f15360cbcc.jpg"
            },
            {
                id: 11,
                name: "Digital Smartwatch with Fitness Tracker",
                price: 9 * conversionRate,
                image: "https://i.pinimg.com/564x/fc/bc/06/fcbc061ce686872bfcfbef2d763f7fdd.jpg"
            },
            {
                id: 12,
                name: "Classic White Sneakers",
                price: 9.99 * conversionRate,
                image: "https://i.pinimg.com/564x/8c/ee/5f/8cee5f6f5a916709ffb5327f200c60d5.jpg" 
            },
            {
                id: 13,
                name: "Classic Leather Loafers",
                price: 11.99 * conversionRate,
                image: "https://i.pinimg.com/564x/69/1c/0c/691c0cc0dce312f83174b0e02162ccbe.jpg" 
            },
            {
                id: 14,
                name: "Green Suit",
                price: 11.99 * conversionRate,
                image: "https://i.pinimg.com/736x/0b/d6/f2/0bd6f2d1249731204c8cb58d6c872d66.jpg" 
            },
            {
                id: 15,
                name: "Fresher Party Outfit",
                price: 11.99 * conversionRate,
                image: "https://i.pinimg.com/736x/14/40/92/144092270f7b5d2645c0e5a96c1f2ad0.jpg" 
            },
            {
                id: 16,
                name: "Jacket",
                price: 11.99 * conversionRate,
                image: "https://i.pinimg.com/236x/67/7a/f1/677af17e39b07c24480d907736a74948.jpg" 
            },
        ];

        const productContainer = document.getElementById('product-list');
        const cartPopup = document.getElementById('cart-popup');
        const cartItemsList = document.getElementById('cart-items');

        function displayProducts() {
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>₹${product.price.toFixed(2)}</p> <!-- Price in Rupees -->
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                productContainer.appendChild(productDiv);
            });
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProductIndex = cart.findIndex(p => p.id === productId);
            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += 1; // Increase quantity if already in cart
            } else {
                cart.push({ ...product, quantity: 1 }); // Add new product with quantity
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product.name} has been added to your cart!`);
        }

        function toggleCartPopup() {
            cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
            displayCartItems();
        }

        function displayCartItems() {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cartItemsList.innerHTML = '';
            cart.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = `${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}`;
                cartItemsList.appendChild(listItem);
            });
        }

        function proceedToCheckout() {
            // You can add checkout logic here
            alert("Proceeding to checkout...");
        }

        // Initial display of products
        displayProducts();