import * as Name from '../GetUserSource.js';
import * as UI from '../ui/Ui_To_Do.js'
import * as Domain from '../Domain/Domain_To_Do.js'

export async function LoadCoursesForUser() {
    const dropdown = document.getElementById('dropdown1');
    const APIURL = 'https://1810pspanchig.azurewebsites.net/ClassInfo';
    const response = await fetch(APIURL);
    const courses = await response.json();
    
    courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.title; 
        option.textContent = course.title;
        dropdown.appendChild(option);
    });    
}
export async function RemoveElementFromAPI(id) {

    const APIURL = `https://1810pspanchig.azurewebsites.net/TasksInfo/${id}`;
    await fetch(APIURL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',                
        },            
    });                
    console.log(`Element with ID ${id} was removed successfully.`);    
}
export async function LoadTaskForUser() {
    const currentUser = Name.getCurrentUser();
    const APIURL = 'https://1810pspanchig.azurewebsites.net/TasksInfo';

    if (!currentUser) {
        console.error('No current user or username not found.');
        return;
    }
    const username = currentUser.username; 
    const response = await fetch(APIURL);
    const tasks = await response.json();        
    const userTasks = tasks.filter(task => task.owner === username);    
    if (userTasks.length === 0) {
        console.log(`No tasks found for user: ${username}`);
    } else {
        userTasks.forEach((task) => {
            UI.createElement(task.title, task.info, task.id, task.courseName); 
        });
    }
    
}

var students1 = [];
var classes = [];
export async function loadStudentsForClass() {    
    const studentsList = document.getElementById('Tasks1');
    const classId = document.getElementById('dropdown1').value;

    studentsList.innerHTML = '';
    const APIS = 'https://1810pspanchig.azurewebsites.net/UserInfo';
    const responseS = await fetch(APIS);
    students1 = await responseS.json(); 
    
    const APIURL = 'https://1810pspanchig.azurewebsites.net/ClassInfo';
    const response = await fetch(APIURL);
    classes = await response.json(); 

    const UserTask = classes.filter(classe => classe.title === classId);
    console.log(UserTask)
    UserTask.forEach(student1 => {
        console.log("Here"+ classId);
        const newDiv = document.createElement('div');
        newDiv.classList.add('DIVTASK');

        const studentsinput = document.createElement('input');
        studentsinput.type = 'checkbox';
        studentsinput.value = student1.owner;
        studentsinput.setAttribute('id', "checkBox" + student1.owner);
        studentsinput.classList.add('Checkbox');
        studentsinput.addEventListener('click', Domain.SaveStudentsbyClick)
        const label = document.createElement('label');
        label.innerHTML = student1.owner;
        label.classList.add('CheckboxLabel');
        label.setAttribute('for', "checkBox" + student1.owner);
        
        studentsList.appendChild(newDiv);
        newDiv.appendChild(label);
        newDiv.appendChild(studentsinput);
    });
}

export function StudentRetunr(){
    return students1;
}

export async function CreateTaskAPI(username, taskTitle, taskInfo) {
    console.log("Esta Funcionando: " + Domain.CheckedS());

    for (let index = 0; index < Domain.CheckedS().length; index++) {
        const Student = Domain.CheckedS()[index];
        const courseName = Domain.getSelectedCourse(); // Get the selected course name

        const Task = {
            CourseName: courseName, 
            Title: taskTitle,
            Info: taskInfo,
            Owner: Student, 
            ID: Domain.getNewTaskId()
        };

        const APIURL = 'https://1810pspanchig.azurewebsites.net/NewTask';
        await fetch(APIURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Task)
        });
    }
}