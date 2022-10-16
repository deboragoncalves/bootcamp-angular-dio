let messageInput, nameInput, emailInput, subjectInput;

let changeName = nameValue => {
    nameInput = nameValue;
}

let changeEmail = emailValue => {
    emailInput = emailValue;
}

let changeSubject = subjectValue => {
    subjectInput = subjectValue;
}

let changeMessage = messageValue => {
    messageInput = messageValue;
}

let clearForm = () => {
    document.querySelector("#email").value = "";
    document.querySelector("#name").value = "";
    document.querySelector("#subject").value = "";
    document.querySelector("#message").value = "";
}

let sendMessage = () => {
    let validForm = messageInput.length > 3 && subjectInput.length > 3 && nameInput.length > 3 && emailInput.length > 3;
    validForm ? alert("Mensagem enviada com sucesso") : alert("Campos inválidos. Tente novamente");
}