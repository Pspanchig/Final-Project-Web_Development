
export function CreateGroup(classe,title,students,info) {
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

