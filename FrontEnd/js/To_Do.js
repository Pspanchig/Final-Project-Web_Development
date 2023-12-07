import { getCurrentUser } from "./GetUserSource.js";


document.addEventListener('DOMContentLoaded', () => {
    
    const searchInput = document.getElementById('searchInput');
    // searchInput.addEventListener('keyup', filterTasks);
    
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
    console.log('RUning')
    const filter = document.getElementById("find").value.toUpperCase();
    const tasks = document.querySelectorAll(".task");
    
    tasks.forEach(task => {
        let h2 = task.querySelector('h2'); 
        if (h2) {
            let text = h2.textContent || h2.innerText;
            if (text.toUpperCase().indexOf(filter) > -1) {
                task.style.display = ""; 
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

var students = [];
var classes = [];
loadStudentsForClass()
async function loadStudentsForClass() {    
    const classId = document.getElementById('dropdown1').value;
    const studentsList = document.getElementById('Tasks1');
    
    const APIS = 'http://localhost:5006/UserInfo';
    const responseS = await fetch(APIS);
    students = await responseS.json();
    
    const APIURL = 'http://localhost:5006/ClassInfo';
    const response = await fetch(APIURL);
    classes = await response.json();
    
    studentsList.innerHTML = '';
    const Title = document.createElement('h3');                
    Title.textContent = 'Choose the students';
    const displayedStudentNames = [];
    studentsList.appendChild(Title);
    students.forEach(student => {
        classes.forEach(classes => {
            console.log(classId)
            if (student == classes.owner) {
                let student  = getCurrentUser().username;
                const studentCheckbox = document.createElement('input');
                studentCheckbox.addEventListener('click', SaveStudentsbyClick);
                studentCheckbox.type = 'checkbox';
                studentCheckbox.value = student.name;
                studentCheckbox.setAttribute('id', "checkBox" + student.name)                
                
                const label = document.createElement('label');
                label.textContent = student.name; 
                studentsList.appendChild(studentCheckbox);
                studentsList.appendChild(label);
                studentsList.appendChild(document.createElement('br')); 
                if(studentCheckbox.checked){
                    displayedStudentNames.push(student.name);
                    console.log("Testing");
                }
            }
        })
    });    
}

let owners = [];
function SaveStudentsbyClick() {
    const classId = document.getElementById('dropdown').value; 
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
        console.log(course); // Log 'course', not 'couser'
    });
});