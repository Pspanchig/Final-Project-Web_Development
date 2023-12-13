export function AddCourseToDOM(courseNameValue, courseNumberValue,courseDescValue){
    const subContainer = document.querySelector('.subContainer');
    
    const newElement = document.createElement('div');
    newElement.classList.add('Dashbord-Container');

    const anchor = document.createElement('a');
    anchor.href = 'CoursePage.html';

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
