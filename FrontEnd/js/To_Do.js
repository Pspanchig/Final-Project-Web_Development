document.addEventListener('DOMContentLoaded', () => {
    const currentUser = getCurrentUser();
    const username = currentUser && currentUser.username;

    if (username) {
        console.log(`Loading tasks for user: ${username}`);
        loadTasksFromLocalStorage(username);
        
        document.getElementById('addTaskButton').addEventListener('click', function() {
            let taskInput = document.getElementById('taskInput');
            let taskInfoInput = document.getElementById('InfoInput');
            let tasksList = document.getElementById('tasksList');
        
            let taskObject = createObject(taskInput, taskInfoInput, username);
            if (taskObject) {
                createElement(taskObject.TitleTask, taskObject.DescriptionTask, tasksList, taskObject.id, username);
                taskInput.value = '';
                taskInfoInput.value = '';
            }
        });
    } else {
        console.error('No valid user found.');
    }
});

function getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        return JSON.parse(userData);
    } else {
        return null;
    }
}

function createObject(taskInput, taskInfoInput, currentUser) {
    let taskTitle = taskInput.value.trim();
    let taskDescription = taskInfoInput.value.trim();

    if (taskTitle && taskDescription) {
        let taskId = "task-" + new Date().getTime();
        let taskObject = {
            TitleTask: taskTitle,
            DescriptionTask: taskDescription,
            id: taskId
        };

        saveTaskToLocalStorage(taskObject, currentUser);
        return taskObject;
    } else {
        return null;
    }
}

function saveTaskToLocalStorage(taskObject, currentUser) {
    try {
        let tasks = JSON.parse(localStorage.getItem('tasks_' + currentUser)) || [];
        tasks.push(taskObject);
        localStorage.setItem('tasks_' + currentUser, JSON.stringify(tasks));
        console.log(`Saved tasks for ${currentUser}:`, tasks);
    } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
    }
}



function loadTasksFromLocalStorage(username) {
    let tasksList = document.getElementById('tasksList');
    if (tasksList) {
        tasksList.innerHTML = ''; // Clear current tasks
        let tasksKey = 'tasks_' + username;
        console.log(`Retrieving tasks from localStorage with key: ${tasksKey}`);
        let tasks = JSON.parse(localStorage.getItem(tasksKey)) || [];
        console.log('Loaded tasks:', tasks); // Should show the array of tasks

        tasks.forEach(task => {
            console.log('Creating element for:', task); // Log each task before rendering
            createElement(task.TitleTask, task.DescriptionTask, tasksList, task.id, username);
        });
    } else {
        console.error('tasksList element not found in the DOM.');
    }
}

function deleteTaskFromLocalStorage(taskId, currentUser) {
    let tasks = JSON.parse(localStorage.getItem('tasks_' + currentUser)) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks_' + currentUser, JSON.stringify(tasks));
}

function createElement(taskTitle, taskDescription, tasksList, taskId, currentUser) {
    console.log(`Creating element for task: ${taskId}`);

    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.id = taskId; // Use the provided taskId
    
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
        deleteTaskFromLocalStorage(taskId, currentUser);
    };

    taskDiv.appendChild(deleteButton);
    tasksList.appendChild(taskDiv);
}
