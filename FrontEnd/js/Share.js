import { getCurrentUser } from "./GetUserSource.js";

function SetName(){
    const Name = getCurrentUser().username;
    const ChangeName = document.getElementById('change');    
    ChangeName.textContent = `Welcome Back ${Name}`;
}

function getNewChatId() {
    const lastId = parseInt(localStorage.getItem('lastTaskId') || '0', 10);
    const newId = lastId + 1;
    localStorage.setItem('lastTaskId', newId.toString()); 
    return newId;
}
console.log(getCurrentUser().username);

function CreateNewChat(Name, Text, bool){
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

document.getElementById('button').addEventListener('click', function(e){
    e.preventDefault();
    console.log('working');
    CreateChatAPI();
});

async function loadChatFromAPI() {
    const API_URL = 'http://localhost:5006/ChatInfo';


        const response = await fetch(API_URL);
        const chats = await response.json();
        chats.forEach(chat => {
            console.log(chats);
            console.log("Hola" + chats.isProffesor);

            CreateNewChat(chat.user ,chat.text, chat.isProffesor)
        });
}
loadChatFromAPI()

// loadChatFromAPI();
async function CreateChatAPI() {
    const ChatText = document.getElementById('ChatText').value.trim();
    if (!ChatText) {
        console.log('No text to send');
        return;
    }

    const APIUser = 'http://localhost:5006/UserInfo';
    const responseUser = await fetch(APIUser);
    const users = await responseUser.json();
    var bool = true;

    users.forEach(user => {

        if(user.Name === getCurrentUser()){
            bool = user.isProffesor;
        }
    })
    const NewChat = {
        User: getCurrentUser().username,
        Text: ChatText,
        IsProffesor: bool,
        ID: getNewChatId()
    };
    console.log(NewChat);

    const APIURL = 'http://localhost:5006/NewChat';
    await fetch(APIURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(NewChat)
    });    
}
document.addEventListener('DOMContentLoaded', function(){
    SetName();
    // loadChatFromAPI();

})
