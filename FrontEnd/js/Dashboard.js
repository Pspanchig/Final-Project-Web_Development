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

async function createAPI(courseName1, instructor1, description1, courseObjective0, courseObjective11, courseObjective21, topic1, reading1, assignments1, project1, final1, email1, office1) {
    
    const APIURL = 'https://1810pspanchig.azurewebsites.net/NewPage';
    const coursePage = {
        CourseName: courseName1,
        Instructor: instructor1,
        Description: description1,
        CourseObjective: courseObjective0,
        CourseObjective1: courseObjective11,
        CourseObjective2: courseObjective21,
        Topic: topic1,
        Reading: reading1,
        Assignments: assignments1,
        Project: project1,
        Final: final1,
        Email: email1,
        Office: office1
    };

    await fetch(APIURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(coursePage)
    });
    
}

function AddCourseToDOM(courseNameValue, courseNumberValue, courseDescValue) {
    const subContainer = document.querySelector('.subContainer');
    
    const newElement = document.createElement('div');
    newElement.classList.add('Dashbord-Container');

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('Dashbord-Container-Item');

    const courseName = document.createElement('h2');
    courseName.innerHTML = courseNameValue;

    const courseNumber = document.createElement('h3');
    courseNumber.innerHTML = courseNumberValue;

    const courseDesc = document.createElement('p');
    courseDesc.innerHTML = courseDescValue;
    const currentUser = getCurrentUser();
    const username = currentUser.username; 
    
    const objective1Id = document.getElementById('Objective1');
    const objective2Id = document.getElementById('Objective2');
    const objective3Id = document.getElementById('Objective3');
    const week1TopicId = document.getElementById('Week1Topic');
    const chapterReadId = document.getElementById('ChapterRead');
    const projectPercentId = document.getElementById('ProjectPercent');
    const assignmentPercentId = document.getElementById('AssignmentPercent');
    const finalExamPercentId = document.getElementById('FinalExamPercent');
    const emailId = document.getElementById('Email');
    const officeHoursId = document.getElementById('OfficeHours');

    itemDiv.addEventListener('click', function() {

        alert("You are being redirected to the course page.");
        createAPI (courseName, username, courseDesc, objective1Id, objective2Id, objective3Id, week1TopicId,chapterReadId,assignmentPercentId,projectPercentId, finalExamPercentId,emailId,officeHoursId)
        window.location.href = '/FrontEnd/CoursePage.html';
    });

    itemDiv.appendChild(courseName);
    itemDiv.appendChild(courseNumber);
    itemDiv.appendChild(document.createElement('hr'));
    itemDiv.appendChild(courseDesc);

    newElement.appendChild(itemDiv);
    subContainer.appendChild(newElement);  
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('CreateClassButton').addEventListener('click', function() {
        document.getElementById('ClassForm').style.display = 'block';
    });
});
async function CreateClassAPI(courseNameValue, courseNumberValue, courseDescValue) {
    const APIURL = 'https://1810pspanchig.azurewebsites.net/NewClass';
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
    const responseData = await response.json();
    console.log("Class created successfully:", responseData);

}

async function LoadCourseForUser(username) {
    const APIURL = 'https://1810pspanchig.azurewebsites.net/ClassInfo';
    
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
    