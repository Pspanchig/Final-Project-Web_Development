async function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const isProfessorChecked = document.getElementById('loginAsOption1').checked;

    const APIURL = 'http://localhost:5006/OtherPath';
    try {
        const response = await fetch(APIURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();

        const user = users.find(u => u.name === username);

        if (user && user.password === password) {
            const userData = {
                username: user.name,
                isProfessor: user.IsProfessor
            };
            localStorage.setItem('currentUser', JSON.stringify(userData));

            if (isProfessorChecked && user.IsProfessor) {
                alert("Login as Professor Successfully");
                window.location.href = 'professor-page.html'; 
            } else if (!isProfessorChecked && !user.IsProfessor) {
                alert("Login Successfully");
                window.location.href = '/FrontEnd/Page3.html';
            } else {
                alert("Role does not match with our records.");
            }
        } else {
            alert("Invalid username or password.");
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert("An error occurred while trying to log in.");
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            loginUser();
        });
    }
});
