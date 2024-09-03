function validateForm() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    let isValid = true;

    
    fullNameError.textContent = '';
    emailError.textContent = '';
    usernameError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';

    
    if (fullName.trim() === '') {
        fullNameError.textContent = 'Please enter your full name.';
        isValid = false;
    }

    if (email.trim() === '') {
        emailError.textContent = 'Please enter your email address.';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    if (username.trim() === '') {
        usernameError.textContent = 'Please enter a username.';
        isValid = false;
    }

    if (password.trim() === '') {
        passwordError.textContent = 'Please enter a password.';
        isValid = false;
    }

    if (confirmPassword.trim() === '') {
        confirmPasswordError.textContent = 'Please confirm your password.';
        isValid = false;
    } else if (confirmPassword !== password) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        isValid = false;
    }

    
    if (isValid) {
        saveAccount({ username, password });
        alert('Registration successful!');
        document.getElementById('registerForm').reset(); 
    }

    return isValid;
}

function saveAccount(account) {
    
    let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    
    const existingUser = accounts.find(acc => acc.username === account.username);
    if (existingUser) {
        alert('Username already exists. Please choose a different username.');
        return;
    }

    
    accounts.push(account);

    
    localStorage.setItem('accounts', JSON.stringify(accounts));
}


document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    validateForm(); 
});