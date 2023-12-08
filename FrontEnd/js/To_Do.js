import { getCurrentUser } from "./GetUserSource.js";


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
        let h2 = task.querySelector('h2'); 
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


document.getElementById("find").addEventListener('input', searchInput);

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
LoadTaskForUser();

function createElement(taskTitle, taskDescription, id,courseName) {

    const container = document.getElementById('taskListLeft');


    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.setAttribute('data-task-id', id); // Set a data attribute for the task ID
    
    const taskCourse = document.createElement('h1'); // Use h3 for task titles within the column
    taskCourse.textContent = courseName;

    const taskTitleElement = document.createElement('h3'); // Use h3 for task titles within the column
    taskTitleElement.textContent = taskTitle;

    taskDiv.setAttribute('draggable', 'true');
    taskDiv.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', id);
    });

    const taskInfoElement = document.createElement('p');
    taskInfoElement.textContent = taskDescription;

    taskDiv.appendChild(taskCourse);
    taskDiv.appendChild(taskTitleElement);
    taskDiv.appendChild(taskInfoElement);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        RemoveElementFromAPI(id).then(() => {
            container.removeChild(taskDiv);
        }).catch(error => {
            console.error("Could not delete task:", error);
        });
    };

    taskDiv.appendChild(deleteButton);
    container.appendChild(taskDiv); 

    const taskListLeft = document.getElementById('taskListLeft');
const taskListRight = document.getElementById('taskListRight');

[taskListLeft, taskListRight].forEach(dropZone => {
    dropZone.addEventListener('dragover', function(event) {
        event.preventDefault(); // Necessary to allow the drop
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



async function CreateTaskAPI(username, taskTitle, taskInfo){
    
    const Task = {
        CourseName: course,
        Title: taskTitle,
        Info: taskInfo,
        Owner: username,
        ID: getNewTaskId()
    };

    const APIURL = 'http://localhost:5006/NewTask';            
    const response = await fetch(APIURL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(Task)
    });


    const responseData = await response.json();
    console.log("Task created successfully:", responseData);
    
}

var students1 = [];
var classes = [];
async function loadStudentsForClass() {    
    const studentsList = document.getElementById('Tasks1');
    const classId = document.getElementById('dropdown1').value;

    // Clear existing content
    studentsList.innerHTML = '';

    const APIS = 'http://localhost:5006/UserInfo';
    const responseS = await fetch(APIS);
    const students1 = await responseS.json(); 
    
    const APIURL = 'http://localhost:5006/ClassInfo';
    const response = await fetch(APIURL);
    const classes = await response.json(); 
    
    const h1 = document.createElement('h3');
    h1.innerText = 'TEXTO';
    studentsList.appendChild(h1);
    console.log('Showing after dropdown');
    classes.forEach(classe => {
        students1.forEach(student1 =>{
            console.log('Student:' + classId)

            if(student1 && student1.name === classe.owner && classId === classe.title){

                const studentsinput = document.createElement('input');
                studentsinput.type = 'checkbox';
                studentsinput.classList.add('Checkbox'); // Add class to the checkbox
            
                const label = document.createElement('label');
                label.innerHTML = classe.owner; // Consider using dynamic student data
                label.classList.add('CheckboxLabel'); // Add class to the label
                
                studentsList.appendChild(studentsinput);
                studentsList.appendChild(label);
            }
        })
        
    });
}


let owners = [];
function SaveStudentsbyClick() {
    const classId = document.getElementById('dropdown1').value; 
    const selectedClasses = classes.filter(classObject => classObject.title === classId);

    const studentChecked = selectedClasses.filter(classObject => {
        const studentCheckBox = document.getElementById("checkBox" + classObject.owner);
        return studentCheckBox && studentCheckBox.checked;
    });

    owners = studentChecked.map(classObject => classObject.owner);
    console.log(owners);
    const listStudents = new Map();
    studentChecked.forEach(classObject => {
        console.log(classObject.owner);
        listStudents.set(classObject.owner, classObject);
    });    
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
var course; // Corrected variable name

LoadCoursesForUser().then(() => {
    const dropdown = document.getElementById('dropdown1');
    
    // Attach an event listener to the dropdown to handle change events
    dropdown.addEventListener('change', () => {
        course = dropdown.value; // Assign the value to 'course'
        loadStudentsForClass()
    });
});