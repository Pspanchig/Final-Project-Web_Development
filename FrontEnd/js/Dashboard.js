import * as SVC from './Services/Services_Dashboard.js'
import * as Domain from './Domain/Domain_Dashboar.js'
import { getCurrentUser } from "./GetUserSource.js";

SVC.ShowStudentsInput();
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('CreateClassButton').addEventListener('click', function() {
        document.getElementById('ClassForm').style.display = 'block';
    });
});

const currentUser = getCurrentUser();
console.log(currentUser.username)
SVC.LoadCourseForUser(currentUser.username);
Domain.CreateClass();
    