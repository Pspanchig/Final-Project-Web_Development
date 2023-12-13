
export async function registerUser() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var code = document.getElementById('code').value;
    var isOptionOne = false;
    var selectedOptionElement = document.querySelector('input[name="option"]:checked');
    var selectedOption = selectedOptionElement ? selectedOptionElement.value : null;
    
    document.getElementById('option1').addEventListener('change', function() {
        document.getElementById('codeSection').style.display = 'block';
    });
    document.getElementById('option2').addEventListener('change', function() {
        document.getElementById('codeSection').style.display = 'none';
    });

    const APIURL = 'http://localhost:5006/';
    
    const response = await fetch(APIURL);
    console.log('respons', await response.text())


    if (localStorage.getItem(username)) {
        alert('That name is already being used, please choose other one');
        return;
    }

    if (selectedOption === 'Opción 2') {
        isOptionOne = false;
    } 
    if (selectedOption === 'Opción 1' && code === "1") {
        isOptionOne = true;
    } else if (selectedOption === 'Opción 1') {
        alert('Código incorrecto para la Opción 1');
        return; 
    }
    
    CreateUserAPI(username, password, isOptionOne);    
    localStorage.setItem(username, JSON.stringify(user));
    alert('User succesfuly created!');
    window.location.href = 'index.html';
}
async function CreateUserAPI(User, Passwrord, bool){
    const APIURL = 'http://localhost:5006/';
    
    const response = await fetch(APIURL);
    console.log('respons', await response.text())
    
    const NewUser ={
        Name: User,
        Password: Passwrord,
        IsProffesor: bool,
    }
    
    await fetch(APIURL + "NewUser", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(NewUser)
    })
      
    const UsersResponse = await fetch(APIURL + "UserInfo")    
    console.log("UsersResponse", await UsersResponse.text());
}
