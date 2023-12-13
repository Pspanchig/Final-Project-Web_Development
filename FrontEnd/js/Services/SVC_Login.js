export async function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const isProfessorChecked = document.getElementById('loginAsOption1').checked;
    
    const APIURL = 'https://1810pspanchig.azurewebsites.net/UserInfo';
    // const APIURL = 'https://1810pspanchig.azurewebsites.net/UserInfo';
    
    const response = await fetch(APIURL);
    const users = await response.json();
    const user = users.find(u => u.name === username);
    
    if(response.ok)
    {
        if (user && user.password === password) {
            const userData = {
                username: user.name,
                    isProfessor: user.IsProfessor
                };
                localStorage.setItem('currentUser', JSON.stringify(userData));
                
                if (isProfessorChecked && user.isProffesor) {
                    alert("Login as Professor Successfully");
                    window.location.href = 'ProfessorPage1.html'; 
                } else if (!isProfessorChecked && !user.IsProfessor) {
                    alert("Login Successfully");
                    window.location.href = '/FrontEnd/Page3.html';
                } else {
                    alert("Role does not match with our records.");
                }
            } else {
                alert("Invalid username or password.");
            }
        }
        else{
            alert(response.status)
        }
        
}
    