import { getCurrentUser } from "./GetUserSource.js";

document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('addTaskButton').addEventListener('click', function() {
        const taskInputElem = document.getElementById('taskInput');
        const taskInfoInputElem = document.getElementById('InfoInput');

        const taskInput = taskInputElem.value;
        const taskInfoInput = taskInfoInputElem.value;
        const currentUser = getCurrentUser();
        
        if (currentUser) {
            createElement(taskInput, taskInfoInput); // Make sure this function is defined and works as expected
            CreateTaskAPI(currentUser.username, taskInput, taskInfoInput); // Assuming currentUser has a 'username' property
        } else {
            console.error('No current user found.');
        }

        taskInputElem.value = '';
        taskInfoInputElem.value = '';
        
    });    
});

function getNewTaskId() {
    const lastId = parseInt(localStorage.getItem('lastTaskId') || '0', 10);
    const newId = lastId + 1;
    localStorage.setItem('lastTaskId', newId.toString()); 
    return newId;
}

async function CreateTaskAPI(username, taskTitle, taskInfo){
    
    const Task = {
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

async function LoadTaskForUser() {
    const currentUser = getCurrentUser(); // Get the current user
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
            createElement(task.title, task.info, task.id); 
        });
    }
    
}
LoadTaskForUser();

function createElement(taskTitle, taskDescription, id) {

    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    
    let taskTitleElement = document.createElement('h2');
    let taskInfoElement = document.createElement('p');

    taskTitleElement.textContent = taskTitle;
    taskInfoElement.textContent = taskDescription;

    taskDiv.appendChild(taskTitleElement);
    taskDiv.appendChild(taskInfoElement);

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    deleteButton.onclick = function() {
        tasksList.removeChild(taskDiv);
        RemoveElementFromAPI(id);
    };

    taskDiv.appendChild(deleteButton);
    tasksList.appendChild(taskDiv);
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


