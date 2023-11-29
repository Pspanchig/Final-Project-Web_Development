import { getCurrentUser } from "./GetUserSource.js";

async function IsLoged(){
    const UserNameDashboard = document.getElementById('WelcomeID');
    // console.log("Working king");
    const currentUserData = await getCurrentUser();
    if (currentUserData) {
        console.log('Logged in as:', currentUserData.username);
        UserNameDashboard.innerHTML = `Welcome back ${await currentUserData.username}!`
        // Do something with currentUserData
    } else {    
        document.body.style.filter = 'blur(5px)';
        alert('You are not logged and you will be redirected');
        window.location.href = 'Page1h'; 
    }
}

function logout() {
    const LogOutButton = document.getElementById('LogOut');
    LogOutButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Clear current user data
        localStorage.removeItem('currentUser');         
        console.log('Logged out successfully.');                
        window.location.href = 'Page1h'; 
    });
}

logout();
IsLoged();