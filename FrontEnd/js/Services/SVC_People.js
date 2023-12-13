import * as Domain from '../Domain/Domain_People.js'
import * as UI from '../ui/Ui_People.js'
import * as Name from '../GetUserSource.js';

export async function LoadStudents(){
    const userListContainer = document.getElementById('userList');
    const APIURL = 'https://1810pspanchig.azurewebsites.net/UserInfo';
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
export async function LoadCoursesForUser(){
    
    const dropdown = document.getElementById('dropdown');
    const APIURL = 'https://1810pspanchig.azurewebsites.net/ClassInfo';
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

export async function CreateGroupAPI() {
    const APIEndpoint = 'https://1810pspanchig.azurewebsites.net/NewGroup';
    
    const Course = document.getElementById('dropdown').value;
    const Title = document.getElementById('groupName').value;
    const Description = document.getElementById('DescriptionofGroup').value;

    for (let index = 0; index < Domain.NewOwners().length; index++) {
        const owner = Domain.NewOwners()[index];
        const NewGroup = {
            Title: Title,
            Class: Course,
            Students: Domain.NewOwners(),
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
export async function LoadGroups(){
    const APIURL = 'https://1810pspanchig.azurewebsites.net/GroupInfo';
    const response = await fetch(APIURL);
    const Groups = await response.json();
    const currentUser = Name.getCurrentUser();
    const username = currentUser.username; 
    const UserGroup = Groups.filter(group => group.owner === username);
    UserGroup.forEach(group =>{
        UI.CreateGroup(group.class, group.title, group.students, group.info);
    })

    
    Groups.forEach(Group => {
        console.log(Group.class)
    })
}

let students = [];
let classes = [];
let owners = [];

export async function loadStudentsForClass() {    
    const classId = document.getElementById('dropdown').value;
    const studentsList = document.getElementById('students');
    
    const APIS = 'https://1810pspanchig.azurewebsites.net/UserInfo';
    const responseS = await fetch(APIS);
    students = await responseS.json();
    
    const APIURL = 'https://1810pspanchig.azurewebsites.net/ClassInfo';
    const response = await fetch(APIURL);
    classes = await response.json();
    
    studentsList.innerHTML = '';
    const Title = document.createElement('h3');                
    Title.textContent = 'Choose the students';

    const displayedStudentNames = [];
    studentsList.appendChild(Title);
    students.forEach(student => {
        classes.forEach(classe => {
            if (student && student.name == classe.owner && classId == classe.title) {
                const studentCheckbox = document.createElement('input');

                studentCheckbox.addEventListener('click', () => {                   
                    Domain.SaveStudentsbyClick(classes, owners);
                });                
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
                }
            }
        })
    });    
}