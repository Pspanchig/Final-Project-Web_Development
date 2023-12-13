import * as Name from '../GetUserSource.js';
import * as UI from '../ui/Ui_Share.js';
import * as Domain from '../Domain/Domain_Share.js'


export async function loadChatFromAPI() {
    const API_URL = 'https://1810pspanchig.azurewebsites.net/ChatInfo';


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

    const APIUser = 'https://1810pspanchig.azurewebsites.net/UserInfo';
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

    const APIURL = 'https://1810pspanchig.azurewebsites.net/NewChat';
    await fetch(APIURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(NewChat)
    });    
}