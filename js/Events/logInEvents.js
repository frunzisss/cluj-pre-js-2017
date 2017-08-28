const addEventsLogIn = function (){

    const submitFormEvent = function (event) {
    
    event.stopPropagation();
   event.preventDefault();

    const userNameInput = document.querySelector('#userNameInput');
    const passwordInput = document.querySelector('#passwordInput');

    const userNameValue = userNameInput.value;
    const passwordValue = passwordInput.value;

    if(checkCredentials(userNameValue, passwordValue)){
        const app = document.querySelector('#app');
        app.innerHTML = EvaluationsPage();
        addEventsEvaluations();
    } else {
        displayAlert(event.target, "Wrong username or password!");
    }
    
        
};

const displayAlert = function(parent, message) {
    var alert = document.querySelector('.alert');
    if(!alert){
        const alertLabel = document.createElement('p');
        alertLabel.className = "alert";
        alertLabel.innerHTML = message;
        parent.appendChild(alertLabel);
    }
    
};

const checkCredentials = function(username, password){
    var logInObj = getLogInData();
    if(username === logInObj.username && password === logInObj.password){
        return true;
    } else {
        return false;
    }
};

const logInForm = document.querySelector('#logInForm');
logInForm.addEventListener('submit',submitFormEvent);

};