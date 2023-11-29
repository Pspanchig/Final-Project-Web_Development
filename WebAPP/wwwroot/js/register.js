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


    var user = {
        username: username,
        password: password,
        isOptionOne: isOptionOne
    };

    localStorage.setItem(username, JSON.stringify(user));
    alert('Usuario registrado con éxito');
    window.location.href = 'Page1h'; // Cambia a tu URL real
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