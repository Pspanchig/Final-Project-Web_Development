import * as SVC from '../Services/SVC_To_Do.js'
export function searchInput() {
    console.log('Running searchInput');
    const filter = document.getElementById("find").value.toUpperCase();
    const tasks = document.querySelectorAll(".task");
    
    tasks.forEach(task => {
        let h2 = task.querySelector('h3'); 
        if (h2) {
            let text = h2.textContent; 
            if (text.toUpperCase().indexOf(filter) > -1) {
                task.style.display = "block";
            } else {
                task.style.display = "none";
            }
        }
    });
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
        await SVC.RemoveElementFromAPI(id);
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
export function createElement(taskTitle, taskDescription, id, courseName) {
    const taskElement = createTaskElement(taskTitle, taskDescription, id, courseName);
    addDragEvents(taskElement, id);
    addTaskToContainer('taskListLeft', taskElement);
    initializeDragAndDrop();
}
