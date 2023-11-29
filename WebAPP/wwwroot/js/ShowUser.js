document.addEventListener('DOMContentLoaded', function() {
    const userListContainer = document.getElementById('userList');
    userListContainer.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const user = JSON.parse(localStorage.getItem(key));

        // Asegúrate de que solo se muestran objetos de usuario
        if (user && user.username) {
            const userElement = document.createElement('div');
            userElement.textContent = `Nombre de usuario: ${user.username}`;
            userListContainer.appendChild(userElement);
        }
    }
});
