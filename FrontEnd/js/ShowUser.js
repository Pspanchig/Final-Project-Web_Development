import { getCurrentUser } from "./GetUserSource.js";

document.addEventListener('DOMContentLoaded', async () => {
    LoadFunctions();    

});

document.getElementById('dropdown').addEventListener('change', loadStudentsForClass);
document.getElementById('checkAll').addEventListener('change', toggleSelectAll);

function LoadFunctions(){
    loadStudentsForClass();
    LoadCoursesForUser();
    LoadStudents();
    LoadGroups();

}

async function LoadStudents(){
    const userListContainer = document.getElementById('userList');
    const APIURL = 'http://localhost:5006/UserInfo';
    const response = await fetch(APIURL);
    const users = await response.json();

    console.log(users);

    users.forEach(user => {
        if (user && user.name) {
            const userElement = document.createElement('div');
            userElement.classList.add('user'); // Optionally add a class for styling

            const UserTitle = document.createElement('h3');
            UserTitle.textContent = "Username"; // This looks like a title, not a variable name

            const UserName = document.createElement('p');
            UserName.textContent = `${user.name}`; // Display the user's name

            userElement.appendChild(UserTitle);
            userElement.appendChild(UserName);

            userListContainer.appendChild(userElement);
        }
    });    
}

async function LoadCoursesForUser(){
    
    const dropdown = document.getElementById('dropdown');
    const APIURL = 'http://localhost:5006/ClassInfo';
    const response = await fetch(APIURL);

    const courses = await response.json();
    courses.forEach(course => {
        // Assuming each course has a title property
        const option = document.createElement('option');
        option.value = course.title; // If you need to submit the form, use a unique identifier like course.id
        option.textContent = course.title;
        dropdown.appendChild(option);
    });    
}

var students = [];
var classes = [];

async function loadStudentsForClass() {    
    const classId = document.getElementById('dropdown').value;
    const studentsList = document.getElementById('students');
    
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
            if (student && student.name == classes.owner && classId == classes.title) {
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
    // console.log('Working');
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

async function LoadGroups(){
    const APIURL = 'http://localhost:5006/GroupInfo';
    const response = await fetch(APIURL);
    const Groups = await response.json();
    const currentUser = getCurrentUser();
    const username = currentUser.username; 
    const UserGroup = Groups.filter(group => group.owner === username);
    UserGroup.forEach(group =>{
        CreateGroup(group.class, group.title, group.students, group.info);
    })

    
    Groups.forEach(Group => {
        console.log(Group.class)
    })
}

function CreateGroup(classe,title,students,info) {
    const container = document.getElementById('Groups-Conainer'); 

    const card = document.createElement('div');


    card.classList.add('Groups');
    const courseElement = document.createElement('h4');
    courseElement.textContent = students;
    const People = document.createElement('h3');
    People.textContent = students;
    const courseName = document.createElement('h2');
    courseName.textContent = classe;
    const titleElement = document.createElement('h1');
    titleElement.textContent = title;
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = info;
    
    card.appendChild(courseName);
    card.appendChild(titleElement);
    card.appendChild(courseElement);
    card.appendChild(descriptionElement);
    
    container.appendChild(card);
}

document.getElementById('CreateGrooup').addEventListener('submit', function(e){
    e.preventDefault();
    CreateGroupAPI()
})

async function CreateGroupAPI() {
    const APIEndpoint = 'http://localhost:5006/NewGroup';
    
    const Course = document.getElementById('dropdown').value;
    const Title = document.getElementById('groupName').value;
    const Description = document.getElementById('DescriptionofGroup').value;

    for (let index = 0; index < owners.length; index++) {
        const owner = owners[index];
        const NewGroup = {
            Title: Title,
            Class: Course,
            Students: owners,
            Owner: owner,
            Info: Description
        };

        await fetch(APIEndpoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(NewGroup)
        });
    }
    
}
function toggleSelectAll() {
    const studentsCheckboxes = document.querySelectorAll('#studentsList input[type="checkbox"]');
    studentsCheckboxes.forEach(checkbox => checkbox.checked = this.checked);
}