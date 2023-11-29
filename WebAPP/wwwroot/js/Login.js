
function getCurrentUser(userdata){
    const CurrentUser = userdata.username;
    return CurrentUser;
}   

function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const isProfessorChecked = document.getElementById('loginAsOption1').checked;
    var storedData = localStorage.getItem(username);
    
    if (storedData) {
        var userdata = JSON.parse(storedData);
        if (userdata.password === password) {
            localStorage.setItem('currentUser', JSON.stringify(userdata)); // Save current user data
            if (isProfessorChecked && userdata.isOptionOne) {
                alert("Login as Professor Successfully");
                window.location.href = 'Page4'; // Redirect to Page4 for professors
            } else {
                console.log(getCurrentUser((userdata)));
                alert("Login Successfully");
                window.location.href = 'Page3'; // Redirect to Page3 for normal users
            }
        } else {
            alert("Invalid Password");
        }
    } else {
        alert("Username not found");
    }
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    loginUser();
});
