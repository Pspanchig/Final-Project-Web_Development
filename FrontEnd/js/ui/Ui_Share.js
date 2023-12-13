import * as Name from '../GetUserSource.js';

export function SetName(){
    const currentUser = Name.getCurrentUser();
    const username = currentUser.username; 
    const ChangeName = document.getElementById('change');    
    ChangeName.textContent = `Welcome Back ${username}`;
}
export function CreateNewChat(Name, Text, bool){
    const MainDiv = document.getElementById('subcontainer');
    const NewCard = document.createElement('div');
    NewCard.classList.add('Chat');

    const NewName = document.createElement('h3');
    console.log(bool)
    NewName.innerHTML = Name;
    
    const NewInfo = document.createElement('p');
    NewInfo.textContent = Text;
    if(bool === false){
        const studentornot = document.createElement('h4')
        studentornot.innerHTML = 'Student'
        
        NewCard.appendChild(NewName);
        NewCard.appendChild(studentornot);
        NewCard.appendChild(NewInfo);
        MainDiv.appendChild(NewCard);
        console.log('student')
    }
    else{        
        const studentornot = document.createElement('h4')

        studentornot.innerHTML = 'Professor';
        
        NewCard.appendChild(NewName);
        NewCard.appendChild(studentornot);
        NewCard.appendChild(NewInfo);
        MainDiv.appendChild(NewCard);
        console.log('Profesor')
    }
    console.log('Successfully created');
}
export function Try1(){    

    console.log(username)
}