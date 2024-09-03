document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    
    usernameError.textContent = '';
    passwordError.textContent = '';

    
    if (username.trim() === '') {
        usernameError.textContent = 'Please enter your username.';
        return;
    }

    if (password.trim() === '') {
        passwordError.textContent = 'Please enter your password.';
        return;
    }

    
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const user = accounts.find(acc => acc.username === username && acc.password === password);

    if (user) {
        alert('Login successful!');

        
        const loginLink = document.getElementById('loginLink');
        const registerLink = document.getElementById('registerLink');
        
        
        loginLink.textContent = 'Logout';
        loginLink.href = '#'; 
        registerLink.style.display = 'none'; 

        
        localStorage.setItem('loggedInUser', username);

        
        window.location.href = 'index.html'; 
    } else {
        alert('Invalid username or password.');
    }
});


document.getElementById('loginLink').addEventListener('click', function() {
    if (this.textContent === 'Logout') {
        alert('Logged out successfully!');
        this.textContent = 'Login';
        this.href = 'login.html'; // Redirect to login page
        document.getElementById('registerLink').style.display = 'inline-block'; 
        localStorage.removeItem('loggedInUser'); 
    }
});

function login() {
    localStorage.setItem('isLoggedIn', 'true');
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
}