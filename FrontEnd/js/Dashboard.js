import { getCurrentUser } from "./GetUserSource.js";

function CreateClass() {
    const Button = document.getElementById('Create');    
    
    Button.addEventListener('click',function(e) {
        const courseNameValue = document.getElementById('Class').value;
        const courseNumberValue = document.getElementById('Number').value;
        const courseDescValue = document.getElementById('Info').value;
        e.preventDefault(getCurrentUser());   
        // console.log("TEXT" + courseNameValue + "USER" + getCurrentUser().text());
        AddCourseToDOM(courseNameValue, courseNumberValue,courseDescValue);
        CreateClassAPI(courseNameValue,courseNumberValue, courseDescValue);
    });
}

function AddCourseToDOM(courseNameValue, courseNumberValue,courseDescValue){
    const subContainer = document.querySelector('.subContainer');
    
    const newElement = document.createElement('div');
    newElement.classList.add('Dashbord-Container');

    const anchor = document.createElement('a');
    anchor.href = '/FrontEnd/CoursePage.html';

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('Dashbord-Container-Item');

    const courseName = document.createElement('h2');
    courseName.innerHTML = courseNameValue;

    const courseNumber = document.createElement('h3');
    courseNumber.innerHTML = courseNumberValue;

    const courseDesc = document.createElement('p');
    courseDesc.innerHTML = courseDescValue;

    itemDiv.appendChild(courseName);
    itemDiv.appendChild(courseNumber);
    itemDiv.appendChild(document.createElement('hr'));
    itemDiv.appendChild(courseDesc);

    newElement.appendChild(itemDiv);
    anchor.appendChild(newElement);
    subContainer.appendChild(anchor);  
}

async function CreateClassAPI(courseNameValue, courseNumberValue, courseDescValue) {
    const APIURL = 'http://localhost:5006/NewClass';
    const currentUser = getCurrentUser();
    const NewClass = {
        Title: courseNameValue,
        Number: courseNumberValue,
        Info: courseDescValue,
        Owner: currentUser ? currentUser.username : null 
    };

    const response = await fetch(APIURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(NewClass)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log("Class created successfully:", responseData);

}

async function LoadCourseForUser(username) {
    const APIURL = 'http://localhost:5006/ClassInfo';
    
    const response = await fetch(APIURL);        
    const courses = await response.json();        
    const userCourses = courses.filter(course => course.owner === username);
    
    if (userCourses.length === 0) {
        console.log(`No courses found for user: ${username}`);
    } else {
        userCourses.forEach((course) => {                
            AddCourseToDOM(course.title, course.number, course.info);
        });
    }    
}


const currentUser = getCurrentUser();
console.log(currentUser.username)
LoadCourseForUser(currentUser.username);

CreateClass();
    