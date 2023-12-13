import * as UI from "../ui/Ui_Share.js";
import * as SVC from "../Services/SVC_Share.js";

export function LoadDOM(){
    document.addEventListener('DOMContentLoaded', function(){
        UI.SetName();
        SVC.loadChatFromAPI()
    
    })
}
export function CreateAPI(){
    document.getElementById('button').addEventListener('click', function(e){
        e.preventDefault();
        SVC.CreateChatAPI();
    });
}
export function getNewChatId() {
    const lastId = parseInt(localStorage.getItem('lastTaskId') || '0', 10);
    const newId = lastId + 1;
    localStorage.setItem('lastTaskId', newId.toString()); 
    return newId;
}