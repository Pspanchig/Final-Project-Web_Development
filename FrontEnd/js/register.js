export function registerUser() {
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

    

    if (localStorage.getItem(username)) {
        alert('El nombre de usuario ya está en uso. Por favor, elige otro.');
        return;
    }

    if (selectedOption === 'Opción 1' && code === "1") {
        isOptionOne = true;
    } else if (selectedOption === 'Opción 1') {
        alert('Código incorrecto para la Opción 1');
        return; 
    }
    
    CreateUserAPI(username, password, isOptionOne);    
    localStorage.setItem(username, JSON.stringify(user));
    alert('Usuario registrado con éxito');
    window.location.href = 'index.html'; 
}

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    registerUser();
});


document.getElementById('option1').addEventListener('change', function() {
    document.getElementById('codeSection').style.display = 'block';
});
document.getElementById('option2').addEventListener('change', function() {
    document.getElementById('codeSection').style.display = 'none';
});

async function CreateUserAPI(User, Passwrord, bool){
    const APIURL = 'http://localhost:5006/';
    
    const response = await fetch(APIURL);
    console.log('respons', await response.text())
    
    const NewUser ={
        Name: User,
        Password: Passwrord,
        IsProffesor: bool
    }
    
    await fetch(APIURL + "NewUser", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(NewUser)
    })
      
    const UsersResponse = await fetch(APIURL + "OtherPath")    
    console.log("UsersResponse", await UsersResponse.text());
}
