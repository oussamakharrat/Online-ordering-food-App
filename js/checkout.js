
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}


function updateNavbar() {
    if (isLoggedIn()) {
        document.getElementById('userInfo').style.display = 'block';
        document.getElementById('loginLinkContainer').style.display = 'none';
        document.getElementById('registerLinkContainer').style.display = 'none';
        document.getElementById('usernameDisplay').textContent = 'Welcome, ' + localStorage.getItem('username') + '!'; // Display username
    } else {
        document.getElementById('userInfo').style.display = 'none';
        document.getElementById('loginLinkContainer').style.display = 'block';
        document.getElementById('registerLinkContainer').style.display = 'block';
    }
}

document.getElementById('checkout-form').addEventListener('submit', function (event) {
    event.preventDefault(); 


    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;


    console.log('Order placed:', {
        name,
        email,
        address,
        cardNumber,
        expiryDate,
        cvv
    });

    document.getElementById('checkout-form').reset();


    alert('Order placed successfully!');
});


window.onload = function() {
    updateNavbar();
};