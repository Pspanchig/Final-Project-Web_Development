import * as Domain from '../Domain/Domain_Dashboar.js';
import * as UI from '../ui/Ui_Dashboard.js';

export async function CreateClassAPI(courseNameValue, courseNumberValue, courseDescValue) {
    const APIURL = 'http://localhost:5006/NewClass';

    for (let index = 0; index < Domain.NewOwners().length; index++) {
        const Student = Domain.NewOwners()[index];
        const NewClass = {
            Title: courseNameValue,
            Number: courseNumberValue,
            Info: courseDescValue,
            Owner: Student
        };

        const response = await fetch(APIURL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(NewClass)
        });
        const responseData = await response.json();
        console.log("Class created successfully:", responseData);
    }

}
export async function LoadCourseForUser(username) {
    const APIURL = 'http://localhost:5006/ClassInfo';
    
    const response = await fetch(APIURL);        
    const courses = await response.json();        
    const userCourses = courses.filter(course => course.owner === username);
    
    if (userCourses.length === 0) {
        console.log(`No courses found for user: ${username}`);
    } else {
        userCourses.forEach((course) => {                
            UI.AddCourseToDOM(course.title, course.number, course.info);
        });
    }    
}

export async function ShowStudentsInput() {
    const APIS = 'http://localhost:5006/UserInfo';

    const responseS = await fetch(APIS);
    const students = await responseS.json();
    const Container = document.getElementById('microstudentlist');

    students.forEach(student => {
        const studentCheckbox = document.createElement('input');
        studentCheckbox.type = 'checkbox';
        studentCheckbox.value = student.name;
        studentCheckbox.classList.add('student-checkbox');
        studentCheckbox.setAttribute('id', "checkBox" + student.name);

        studentCheckbox.addEventListener('click', () => {
            Domain.SaveStudentsbyClick(student.name, studentCheckbox.checked);
        });

        const label = document.createElement('label');
        label.textContent = student.name;
        label.setAttribute('for', "checkBox" + student.name);

        Container.appendChild(studentCheckbox);
        Container.appendChild(label);
        Container.appendChild(document.createElement('br'));
    });
}
