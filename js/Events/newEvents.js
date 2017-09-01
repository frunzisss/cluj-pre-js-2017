const EventsNew = function(){
    const dataObject = {};
    const buttonEval = document.getElementById('evaluationButton');
    const formNew = document.getElementById('formNew');


    const evalButtonListener = function(event){
        event.preventDefault();
        RedirectTo('evaluations');

    };

    const iterateOver = function(array){
        array.forEach(function(textInput){
            let name = textInput.name;
            let value = textInput.value;
            dataObject[name] = value;

        });

    };

    const getDataFromForm = function(){
        const textInputsNewForm = [];
        const inputsNewForm = document.querySelectorAll('input');
        const textAreas = document.querySelectorAll('textarea');
        const selectInputs = document.querySelectorAll('select');

        inputsNewForm.forEach(function(el){
            if(el.type === "text" || el.type === "date"){
                textInputsNewForm.push(el);
            }
            if(el.type === "radio" && el.checked){
                textInputsNewForm.push(el);
            }
            
        });

        iterateOver(textInputsNewForm);
        iterateOver(textAreas);
        iterateOver(selectInputs);

        //ADD OBJECT TO LOCALSTORAGE
        dataObject.id = (dataObject.candidate + dataObject.date + (new Date).getTime()).replace(/\s/g, '');
        const localStorageLength = localStorage.length;
        var evaluations = [];
        if(localStorageLength !== 0){
             evaluations = JSON.parse(localStorage.getItem("evaluations"));
        }
        evaluations.push(dataObject);
        localStorage.setItem("evaluations", JSON.stringify(evaluations));
        RedirectTo('evaluations');
  
    };

    const isCandidateEmpty = function() {
        const candidate = document.getElementsByName('candidate')[0]; 
        if(!!candidate.value.trim()){
            return false;
        }else{
            
            return candidate;
        }
        
    };

    const checkEmptyFields = function() {
        const arr = [];
        const candidate = isCandidateEmpty();
        const date = isDateEmpty();

        candidate && arr.push(candidate);
        date && arr.push(date);
        return arr;
      
    }

    const displayAlertEmpty = function(fields) {
        window.scrollTo(0,0);
        fields.forEach(function(field){
            field.className += ' empty';
        });

    };

    

    

    const isDateEmpty = function() {
        const date = document.getElementsByName('date')[0]; 
        if(!!date.value.trim()){
            return false;
        }else{
            return date;
        }
    };
    
    
    const submitNewFormListener = function(event) {
        event.stopPropagation();
        event.preventDefault();
        !!checkEmptyFields().length ? displayAlertEmpty(checkEmptyFields()) : getDataFromForm();
       
    };

    const candidate =  document.getElementsByName('candidate')[0];
    const date = document.getElementsByName('date')[0];

    const candidateListener = function(event) {

        event.target.classList.remove('empty');
        
    }; 

    const dateListener = function(event) {
        event.target.classList.remove('empty');
    }; 


    
    
    const addEventsNew = function() { 
        buttonEval.addEventListener('click', evalButtonListener);
        formNew.addEventListener('submit', submitNewFormListener);
        candidate.addEventListener('focus', candidateListener);
        date.addEventListener('focus', dateListener);    
    };
    
    const removeEventsNew = function(){
        buttonEval &&  buttonEval.removeEventListener('click', evalButtonListener);
        formNew && formNew.removeEventListener('submit', submitNewFormListener);
        candidate && candidate.removeEventListener('focus', candidateListener);
        date && date.removeEventListener('focus', dateListener);
    }
    return {
        add: addEventsNew,
        remove: removeEventsNew
    }
};
