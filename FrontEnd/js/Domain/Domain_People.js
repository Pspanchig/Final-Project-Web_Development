import * as SVC from '../Services/SVC_People.js'

export function toggleSelectAll() {
    const studentsCheckboxes = document.querySelectorAll('#studentsList input[type="checkbox"]');
    studentsCheckboxes.forEach(checkbox => checkbox.checked = this.checked);
}
let localOwners = []
export function SaveStudentsbyClick(classes, owners) {
    // console.log('Working');
    const classId = document.getElementById('dropdown').value; 
    const selectedClasses = classes.filter(classObject => classObject.title === classId);

    const studentChecked = selectedClasses.filter(classObject => {
        const studentCheckBox = document.getElementById("checkBox" + classObject.owner);
        return studentCheckBox && studentCheckBox.checked;
    });

    owners = studentChecked.map(classObject => classObject.owner);
    console.log("11" + owners);
    const listStudents = new Map();
    studentChecked.forEach(classObject => {
        console.log(classObject.owner);
        listStudents.set(classObject.owner, classObject);
    });    
    localOwners = owners;
}
export function NewOwners(){
    return localOwners;
}

export function LoadFunctions(){
    // document.getElementById('dropdown').addEventListener('change', SVC.loadStudentsForClass);
    // document.getElementById('checkAll').addEventListener('change', Domain.toggleSelectAll);
    SVC.loadStudentsForClass();
    SVC.LoadCoursesForUser();
    SVC.LoadStudents();
    SVC.LoadGroups();
    document.getElementById('CreateGrooup').addEventListener('submit', function(e){
        e.preventDefault();
        SVC.CreateGroupAPI();
    })

}
