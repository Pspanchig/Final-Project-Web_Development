import * as Name from '../GetUserSource.js';
import * as UI from '../ui/Ui_Share.js';
import * as Domain from '../Domain/Domain_Share.js'


export async function loadChatFromAPI() {
    const API_URL = 'http://localhost:5006/ChatInfo';


        const response = await fetch(API_URL);
        const chats = await response.json();
        chats.forEach(chat => {
            console.log(chats);
            console.log("Hola" + chats.isProffesor);

            UI.CreateNewChat(chat.user ,chat.text, chat.isProffesor)
        });
}
export async function CreateChatAPI() {
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

        if(user.Name === Name.getCurrentUser()){
            bool = user.isProffesor;
        }
    })
    const NewChat = {
        User: Name.getCurrentUser().username,
        Text: ChatText,
        IsProffesor: bool,
        ID: Domain.getNewChatId()
    };
    console.log(NewChat);

    const APIURL = 'http://localhost:5006/NewChat';
    await fetch(APIURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(NewChat)
    });    
}