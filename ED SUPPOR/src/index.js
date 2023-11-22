document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.LogIn');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        const NewID = document.querySelector('.LogIn input[type="text"]').value;
        const NewPassw = document.querySelector('.LogIn input[type="password"]').value;

        const Data = {
            ID: NewID,
            Password: NewPassw
        };

        console.log(Data); // For demonstration purposes

        // Here you can handle the Data, e.g., send it to a server
    });
});
const Password = document.getElementById('Passw');
const ConfirmPass = document.getElementById('ConfirmPassw');


