//Validação formulario
const inputs = [document.getElementById("nome"),
document.getElementById("telefone"),
document.getElementById("email"),
document.getElementById("endereco")]

function addRequiredPopup(input, label) {
    input.addEventListener("focus", () => {
        label.classList.add("required-popup");
    });
}

function removeRequiredPopup(input, label) {
    input.addEventListener("blur", () => {
        label.classList.remove("required-popup");
    });
}

function correct(input) {
    input.classList.remove("error");
    input.classList.add("correct");
}

function error(input) {
    input.classList.remove("correct")
    input.classList.add("error")
}

function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.classList.add('custom-alert');
    alertBox.innerHTML = `<div class="custom-alert-content">${message}</div>`;
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.classList.add('custom-alert-show');
    }, 10);

    setTimeout(() => {
        alertBox.classList.remove('custom-alert-show');
        setTimeout(() => {
            document.body.removeChild(alertBox);
        }, 300);
    }, 3000);
}

function showAlertAndCloseModal(message) {
    showAlert(message);
    document.getElementById('form-cadastro').reset();
}

function validationForm(input, helper) {
    var nomeRegex = /^[a-zA-Z\s]+$/;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var tlfRegex = /^[0-9]+$/;
    var enderecoRegex = /^[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/;

    document.getElementById("enviar").addEventListener('click', function (event) {
        showAlert('Você deve preencher os campos obrigatórios para se cadastrar.');
    })

    input.addEventListener("input", (evento) => {
        const value = evento.target.value;
        if ((input === inputs[0] && nomeRegex.test(value) && value.length >= 6 && value.split(' ').length > 2) ||
            (input === inputs[1] && tlfRegex.test(value) && value.length === 11) ||
            (input === inputs[2] && emailRegex.test(value)) ||
            (input === inputs[3] && value.length >= 20 && value.split(' ').length > 4 && enderecoRegex.test(value))) {
            correct(input);
            helper.classList.remove("visible");
            document.getElementById("enviar").addEventListener('click', function () {
                input.classList.remove("correct")
                showAlert('Seu cadastro foi concluído com sucesso, em breve entraremos em contato para indicar os hemocentros de sua cidade!');
                document.getElementById('form-cadastro').reset();
            })
        }
        else {
            error(input);
            helper.classList.add("visible");
            input.style.marginBottom = '0';
            helper.style.marginBottom = '15px'
        }
    });
}

inputs.forEach(element => {
    const associatedLabel = document.querySelector(`label[for='${element.id}']`);
    const associatedHelper = document.querySelector(`#${element.id}-helper`)
    addRequiredPopup(element, associatedLabel)
    removeRequiredPopup(element, associatedLabel)
    validationForm(element, associatedHelper)
});