const email = document.getElementById('formGroupEmailInput');
const subject = document.getElementById('formGroupSubjectInput');
const message = document.getElementById('formGroupMessageInput');
const btnSend = document.getElementById('btnSend');
addEventListeners();


//adds event listeners for each element
function addEventListeners() {

    document.addEventListener('DOMContentLoaded', () => {
        btnSend.disabled
    });

    email.addEventListener('blur', () => {
        validateInputEmail(email);
    });

    subject.addEventListener('blur', () => {
        validateInputText(subject);
    });

    message.addEventListener('blur', () => {
        validateInputText(message);
    });

    document.getElementById('btnSend').addEventListener('click', e => {
        e.preventDefault();
        result = validateInputs(email, subject, message);
        if(result){
            showElement(document.getElementById('formGroupSpinner'), 2000).then( () => {
                showElement(document.getElementById('formGroupSuccessImg'), 2000).then( () => {
                    resetForm();
                });
            });
        }
    });

    document.getElementById('btnReset').addEventListener('click', resetForm);
}

//expects a string, validates if it a valid email via a regular expression
function validateInputEmail(e) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(e.value).toLowerCase())){
        addClassSuccess(e);
        return true;
    } else {
        addClassError(e);
        return false;
    }
}

//expects a string and checks if it is '';
function validateInputText(input) {
    if(input.value === '') {
        addClassError(input);
        return false;
    } else {
        addClassSuccess(input);
        return true;
    }
}

//validates all inputs in the form, expects three strings, one for each input.
function validateInputs(email, subject, message) {
    if(validateInputEmail(email) && validateInputText(subject) && validateInputText(message)){
        return true;
    } else {
        return false;
    }
}
//expects an html element and a number representing miliseconds. Shows the html element for that amount of time.
function showElement(element, mSeconds) {
    return new Promise( (resolve) => {
        element.classList.remove('d-none');
        element.classList.add('d-block');
        setTimeout( () => {
            element.classList.remove('d-block');
            element.classList.add('d-none');
            resolve();
        }, mSeconds);
    })
}

//resets the forms inputs values and classes.
function resetForm() {
    let inputs = document.getElementsByClassName('form-control');
    Array.from(inputs).forEach( e => {
        e.classList.remove('border', 'border-danger', 'border-success');
    });
    document.getElementById('mainForm').reset();
}

//expects an html element to add the success class to and remove the class danger(error)
function addClassSuccess(e) {
    e.classList.remove('border', 'border-danger');
    e.classList.add('border', 'border-success');
}

//expects an html element to add the danger(error) class to and remove the success class
function addClassError(e) {
    e.classList.remove('border', 'border-success');
    e.classList.add('border', 'border-danger');
}