import { getCurrentUser } from "./GetUserSource.js";
import * as UI from './ui/Ui_To_Do.js'
import * as Domain from './Domain/Domain_To_Do.js'
import * as SVC from './Services/SVC_To_Do.js'

document.getElementById("find").addEventListener('input', UI.searchInput);
document.addEventListener('DOMContentLoaded', () => {    
    SVC.LoadTaskForUser();
    Domain.DoSomething();
});
Domain.loadCourses() 
