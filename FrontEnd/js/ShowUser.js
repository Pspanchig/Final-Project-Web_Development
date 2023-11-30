document.addEventListener('DOMContentLoaded', async () => {
    const userListContainer = document.getElementById('userList');
    const APIURL = 'http://localhost:5006/OtherPath';
    const response = await fetch(APIURL);
    const users = await response.json();

    users.forEach(user => {
        if (user && user.name) {
            const userElement = document.createElement('div');
            userElement.textContent = `UserName: ${user.name}`; 
            userListContainer.appendChild(userElement);
        }
    });
});
