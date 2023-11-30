function CreateClass() {
    const Button = document.getElementById('Create');
    const subContainer = document.querySelector('.subContainer'); 

    Button.addEventListener('click', function(e) {
        e.preventDefault(); 
        
        const newElement = document.createElement('div');
        newElement.classList.add('Dashbord-Container');
        

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('Dashbord-Container-Item');

        const courseName = document.createElement('h2');
        courseName.textContent = document.getElementById('Class').value;
        courseName.classList.add('Course-name');

        const courseNumber = document.createElement('h3');
        courseNumber.textContent = document.getElementById('Number').value; 

        const courseDesc = document.createElement('p');
        courseDesc.textContent = document.getElementById('Info').value; 
        itemDiv.appendChild(courseName);
        itemDiv.appendChild(courseNumber);
        itemDiv.appendChild(document.createElement('hr'));
        itemDiv.appendChild(courseDesc);

        newElement.appendChild(itemDiv);

        subContainer.appendChild(newElement);
    });
}

CreateClass();
