import * as SVC from '../Services/SVC_To_Do.js'
import * as Name from '../GetUserSource.js';

export function getNewTaskId() {
    const lastId = parseInt(localStorage.getItem('lastTaskId') || '0', 10);
    const newId = lastId + 1;
    localStorage.setItem('lastTaskId', newId.toString()); 
    return newId;
}

let NewCheckedStudents = [];

export function SaveStudentsbyClick() {
    const students1 = SVC.StudentRetunr();
    let checkedStudents = [];
    students1.forEach(student1 => {
        const studentCheckBox = document.getElementById("checkBox" + student1.name);
        if (studentCheckBox && studentCheckBox.checked) {
            checkedStudents.push(student1.name);
        }
    });
    NewCheckedStudents = checkedStudents;
    console.log("1 " + NewCheckedStudents)
}
export function CheckedS(){
    return NewCheckedStudents;
}

export function DoSomething(){
    document.getElementById('addTaskButton').addEventListener('click', function() {
        const taskInputElem = document.getElementById('taskInput');
        const taskInfoInputElem = document.getElementById('InfoInput');

        const taskInput = taskInputElem.value;
        const taskInfoInput = taskInfoInputElem.value;
        const currentUser = Name.getCurrentUser();
        
        if (currentUser) {
            SVC.CreateTaskAPI(currentUser.username, taskInput, taskInfoInput); 
        } else {
            console.error('No current user found.');
        }

        taskInputElem.value = '';
        taskInfoInputElem.value = '';
        
    });
}

var course;
export function loadCourses(){
    SVC.LoadCoursesForUser().then(() => {
        const dropdown = document.getElementById('dropdown1');
        dropdown.addEventListener('change', () => {
            course = dropdown.value; 
            SVC.loadStudentsForClass();
        });
    });
}
export function getSelectedCourse() {
    return course;
}
