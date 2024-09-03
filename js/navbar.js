function updateNavbar() {
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const userInfo = document.getElementById('userInfo');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const userAvatar = document.getElementById('userAvatar');

    
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        
        loginLink.textContent = 'Logout';
        loginLink.href = '#'; 
        registerLink.style.display = 'none'; 
        userInfo.style.display = 'flex'; 
        usernameDisplay.textContent = loggedInUser; 
        userAvatar.textContent = loggedInUser.charAt(0).toUpperCase(); 
    } else {
        
        loginLink.textContent = 'Login';
        loginLink.href = 'login.html';
        registerLink.style.display = 'inline-block'; 
        userInfo.style.display = 'none'; 
    }
}


document.addEventListener('DOMContentLoaded', updateNavbar);


document.getElementById('loginLink').addEventListener('click', function() {
    if (this.textContent === 'Logout') {
        alert('Logged out successfully!');
        this.textContent = 'Login';
        this.href = 'login.html'; 
        document.getElementById('registerLink').style.display = 'inline-block'; 
        localStorage.removeItem('loggedInUser'); 
        updateNavbar();
    }
});