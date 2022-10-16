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
    if (messageInput.length > 3 && subjectInput.length > 3 && nameInput.length > 3 && emailInput.length > 3) {
        alert("Mensagem enviada com sucesso");
    } else {
        alert("Campos inválidos. Tente novamente");
        return;
    }
}