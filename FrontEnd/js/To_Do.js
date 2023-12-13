import { getCurrentUser } from "./GetUserSource.js";


LoadTaskForUser();
document.getElementById("find").addEventListener('input', searchInput);
document.addEventListener('DOMContentLoaded', () => {
        
    document.getElementById('addTaskButton').addEventListener('click', function() {
        const taskInputElem = document.getElementById('taskInput');
        const taskInfoInputElem = document.getElementById('InfoInput');

        const taskInput = taskInputElem.value;
        const taskInfoInput = taskInfoInputElem.value;
        const currentUser = getCurrentUser();
        
        if (currentUser) {
            createElement(taskInput, taskInfoInput, 0); 
            CreateTaskAPI(currentUser.username, taskInput, taskInfoInput); 
        } else {
            console.error('No current user found.');
        }

        taskInputElem.value = '';
        taskInfoInputElem.value = '';
        
    });    
});
function searchInput() {
    console.log('Running searchInput');
    const filter = document.getElementById("find").value.toUpperCase();
    const tasks = document.querySelectorAll(".task");
    
    tasks.forEach(task => {
        let h2 = task.querySelector('h3'); 
        if (h2) {
            let text = h2.textContent; // Using textContent for consistency
            if (text.toUpperCase().indexOf(filter) > -1) {
                task.style.display = "block"; // Set this to your default display style
            } else {
                task.style.display = "none";
            }
        }
    });
}
function getNewTaskId() {
    const lastId = parseInt(localStorage.getItem('lastTaskId') || '0', 10);
    const newId = lastId + 1;
    localStorage.setItem('lastTaskId', newId.toString()); 
    return newId;
}
async function LoadTaskForUser() {
    const currentUser = getCurrentUser();
    const APIURL = 'http://localhost:5006/TasksInfo';

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
            createElement(task.title, task.info, task.id, task.courseName); 
        });
    }
    
}

function createTaskElement(taskTitle, taskDescription, id, courseName) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.setAttribute('data-task-id', id); 
    
    const taskCourse = document.createElement('h1');
    taskCourse.textContent = courseName;
    taskDiv.appendChild(taskCourse);

    const taskTitleElement = document.createElement('h3');
    taskTitleElement.textContent = taskTitle;
    taskDiv.appendChild(taskTitleElement);

    const taskInfoElement = document.createElement('p');
    taskInfoElement.textContent = taskDescription;
    taskDiv.appendChild(taskInfoElement);

    taskDiv.appendChild(createDeleteButton(id, taskDiv));
    taskDiv.appendChild(createMoveToRightButton(id, taskDiv));

    return taskDiv;
}
function addDragEvents(taskDiv, id) {
    taskDiv.setAttribute('draggable', 'true');
    taskDiv.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', id);
    });
}
function createDeleteButton(id, taskDiv) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Complete';
    
    deleteButton.addEventListener('click', async () => {
        await RemoveElementFromAPI(id);
        taskDiv.remove();
    });
    return deleteButton;
}
function createMoveToRightButton(id, taskDiv) {
    const moveToRightButton = document.createElement('button');
    moveToRightButton.textContent = 'Move to Right';

    moveToRightButton.addEventListener('click', () => {
        const taskListRight = document.getElementById('taskListRight');
        taskListRight.appendChild(taskDiv);
    });
    return moveToRightButton;
}
function addTaskToContainer(containerId, taskElement) {
    const container = document.getElementById(containerId);
    container.appendChild(taskElement);
}
function initializeDragAndDrop() {
    const taskListLeft = document.getElementById('taskListLeft');
    const taskListRight = document.getElementById('taskListRight');

    [taskListLeft, taskListRight].forEach(dropZone => {
        dropZone.addEventListener('dragover', function(event) {
            event.preventDefault(); 
        });

        dropZone.addEventListener('drop', function(event) {
            event.preventDefault();
            const taskId = event.dataTransfer.getData('text/plain');
            const taskDiv = document.querySelector(`[data-task-id="${taskId}"]`);
            if (taskDiv) {
                dropZone.appendChild(taskDiv);
            }
        });
    });
}
function createElement(taskTitle, taskDescription, id, courseName) {
    const taskElement = createTaskElement(taskTitle, taskDescription, id, courseName);
    addDragEvents(taskElement, id);
    addTaskToContainer('taskListLeft', taskElement);
    initializeDragAndDrop();
}

async function RemoveElementFromAPI(id) {

    const APIURL = `http://localhost:5006/TasksInfo/${id}`;
    await fetch(APIURL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',                
        },            
    });                
    console.log(`Element with ID ${id} was removed successfully.`);    
}
async function CreateTaskAPI(username, taskTitle, taskInfo) {
    console.log("Esta Funcionando: " + CreateStudent);

    for (let index = 0; index < CreateStudent.length; index++) {
        const Student = CreateStudent[index];

        const Task = {
            CourseName: course, 
            Title: taskTitle,
            Info: taskInfo,
            Owner: Student, 
            ID: getNewTaskId()
        };

        const APIURL = 'http://localhost:5006/NewTask';
        await fetch(APIURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Task)
        });
    }
}
var students1 = [];
var classes = [];
async function loadStudentsForClass() {    
    const studentsList = document.getElementById('Tasks1');
    const classId = document.getElementById('dropdown1').value;

    studentsList.innerHTML = '';

    const APIS = 'http://localhost:5006/UserInfo';
    const responseS = await fetch(APIS);
    students1 = await responseS.json(); 
    
    const APIURL = 'http://localhost:5006/ClassInfo';
    const response = await fetch(APIURL);
    classes = await response.json(); 

    const currentUser = getCurrentUser();
    const username = currentUser.username; 
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
        studentsinput.addEventListener('click', SaveStudentsbyClick)
        const label = document.createElement('label');
        label.innerHTML = student1.owner;
        label.classList.add('CheckboxLabel');
        label.setAttribute('for', "checkBox" + student1.owner);
        
        studentsList.appendChild(newDiv);
        newDiv.appendChild(label);
        newDiv.appendChild(studentsinput);
    });
}

let CreateStudent = [];
function SaveStudentsbyClick() {
    let checkedStudents = [];

    students1.forEach(student1 => {
        const studentCheckBox = document.getElementById("checkBox" + student1.name);
        if (studentCheckBox && studentCheckBox.checked) {
            checkedStudents.push(student1.name);
        }
    });

    CreateStudent = checkedStudents;
    console.log("Students checked:", checkedStudents);    
}


async function LoadCoursesForUser() {
    const dropdown = document.getElementById('dropdown1');
    const APIURL = 'http://localhost:5006/ClassInfo';
    const response = await fetch(APIURL);
    const courses = await response.json();
    
    courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.title; 
        option.textContent = course.title;
        dropdown.appendChild(option);
    });    
}
var course;
LoadCoursesForUser().then(() => {
    const dropdown = document.getElementById('dropdown1');
        dropdown.addEventListener('change', () => {
        course = dropdown.value; // Assign the value to 'course'
        loadStudentsForClass()
    });
});