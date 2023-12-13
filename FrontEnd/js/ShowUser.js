import * as SVC from './Services/SVC_People.js'
import * as Domain from './Domain/Domain_People.js'


Domain.LoadFunctions();    
document.getElementById('dropdown').addEventListener('change', SVC.loadStudentsForClass);
document.getElementById('checkAll').addEventListener('change', Domain.toggleSelectAll);


