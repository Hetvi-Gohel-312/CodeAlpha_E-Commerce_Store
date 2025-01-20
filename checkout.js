document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;

    // Send the checkout data to the backend
    fetch('http://localhost:5500/api/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, address, city, state, zip })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        localStorage.removeItem('cart'); // Clear the cart after purchase
        window.location.href = 'index.html'; // Redirect to home after checkout
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
});