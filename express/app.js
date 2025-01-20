const express = require('express');
const cors = require('cors'); // Importing cors package

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware for JSON parsing

// Product Data
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
    // Add the rest of the products here...
];
// Temporary in-memory cart
let cart = [];
// API to get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// API to get a product by ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// API to update cart data
app.post('/api/cart', (req, res) => {
    const { productId, quantity } = req.body; // Expecting productId and quantity from frontend

    // Find the product by ID
    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex >= 0) {
        // If product exists, update the quantity
        cart[existingProductIndex].quantity += quantity;
        console.log('Updated cart:', cart);
    } else {
        // Otherwise, add new product to cart with the given quantity
        cart.push({ ...product, quantity });
        console.log('Added new product to cart:', cart);
    }

    res.json({ message: 'Cart updated successfully', cart });
});

// API to get the current cart
app.get('/api/cart', (req, res) => {
    res.json({ cart });
});

// API to handle contact form submission
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body; // Extract form data from request body
    console.log('Form submitted:', { name, email, message }); // Log form data for testing
    res.json({ message: "Thanks for reaching out! We’ll get back to you shortly with a reply. Stay tuned!" }); // Send a thank-you response
});

// API to handle checkout
app.post('/api/checkout', (req, res) => {
    const { name, email, address, city, state, zip } = req.body;

    // Log the checkout data (you can process this data and save to the database)
    console.log('Checkout details:', { name, email, address, city, state, zip });

    // Respond with a success message
    res.json({ message: 'Thank you for your purchase! Your order has been processed.' });
});

// Start the server
const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
