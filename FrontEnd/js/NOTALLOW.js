function checkAuthentication() {
    const currentUserData = localStorage.getItem('currentUser');
    
    if (!currentUserData) {
        document.body.style.filter = 'blur(5px)';
        setTimeout(() => {
            alert('You are not logged in and will be redirected to the login page.');
            window.location.href = 'index.html'; 
        }, 100);
    } else {
        const user = JSON.parse(currentUserData);
        const UserNameDashboard = document.getElementById('WelcomeID');
        UserNameDashboard.textContent = `Welcome back ${user.username}!`;
    }
}
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html'; 
}
const LogOutButton = document.getElementById('LogOut');
if (LogOutButton) {
    LogOutButton.addEventListener('click', logout);
}

checkAuthentication();