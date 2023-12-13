import { loginUser } from "../Services/SVC_Login.js";
export function DOM(){
    document.addEventListener('DOMContentLoaded', () => {
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            loginUser();
        });    
    });
}