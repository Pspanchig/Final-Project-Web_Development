import * as Name from '../GetUserSource.js';
import * as UI from '../ui/Ui_Dashboard.js'
import * as SVC from '../Services/Services_Dashboard.js'

export function CreateClass() {
    const Button = document.getElementById('Create');    
    
    Button.addEventListener('click',function(e) {
        const courseNameValue = document.getElementById('Class').value;
        const courseNumberValue = document.getElementById('Number').value;
        const courseDescValue = document.getElementById('Info').value;
        e.preventDefault(Name.getCurrentUser());   
        // console.log("TEXT" + courseNameValue + "USER" + getCurrentUser().text());
        UI.AddCourseToDOM(courseNameValue, courseNumberValue,courseDescValue);
        SVC.CreateClassAPI(courseNameValue,courseNumberValue, courseDescValue);
    });
}

let localOwners = []
export function SaveStudentsbyClick(studentName, isChecked) {
    if (isChecked) {
        if (!localOwners.includes(studentName)) {
            localOwners.push(studentName);
        }
    } else {
        localOwners = localOwners.filter(name => name !== studentName);
    }
}

export function NewOwners() {
    return localOwners;
}
