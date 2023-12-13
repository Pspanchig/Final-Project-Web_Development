import { registerUser } from "./Services/SVC_Register.js";

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    registerUser();
    window.location.href = 'index.html';

});
document.getElementById('option1').addEventListener('change', function() {
    document.getElementById('codeSection').style.display = 'block';
});
document.getElementById('option2').addEventListener('change', function() {
    document.getElementById('codeSection').style.display = 'none';
});

