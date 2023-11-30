export function getCurrentUser() {
    const userDataJson = localStorage.getItem('currentUser');
    return userDataJson ? JSON.parse(userDataJson) : null;
}
