const perguntas = document.querySelectorAll(".perguntas button")

function ativarPergunta(event) {
    const pergunta = event.currentTarget;
    const controls = pergunta.getAttribute("aria-controls");
    const resposta = document.getElementById(controls);

    const ativa = resposta.classList.toggle("ativa");
    pergunta.setAttribute("aria-expanded", ativa);
}

function eventosPerguntas(pergunta) {
    pergunta.addEventListener("click", ativarPergunta)
}

perguntas.forEach(eventosPerguntas)

//Validação formulario de pergunta
const inputs = [document.getElementById("nome"),
document.getElementById("email"),
document.getElementById("texto-pergunta")]

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
    document.getElementById('formularioPergunta').reset();
}

function validationForm(input, helper) {
    console.log("pasó por aqui")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const modal = document.getElementById('modal');
    document.querySelector('.modal-btn-enviar').href ='#modal'

    document.querySelector('.modal-btn-enviar').addEventListener('click', function (event) {
        showAlert('Você deve preencher os campos obrigatórios para enviar sua pergunta.');
    })

    input.addEventListener("input", (evento) => {
        const value = evento.target.value;
        console.log(value)
        if ((input === inputs[0] && value.length >= 5) ||
            (input === inputs[1] && emailRegex.test(value)) ||
            (input === inputs[2] && value.length >= 30)) {
            correct(input);
            helper.classList.remove("visible");
           
            if (inputs[0].value.length >= 5 &&
                emailRegex.test(inputs[1].value) &&
                inputs[2].value.length >= 30) {
                    document.querySelector('.modal-btn-enviar').href ='#'
                document.querySelector('.modal-btn-enviar').addEventListener('click', function (event) {
                    inputs.forEach(element => {
                        element.classList.remove("correct")
                        element.value = null;
                        document.querySelector('.modal-btn-enviar').addEventListener('click', function (event) {
                            showAlert('Você deve preencher os campos obrigatórios para enviar sua pergunta.');
                            document.querySelector('.modal-btn-enviar').href ='#modal'   
                        })                                      
                    });
                    showAlertAndCloseModal('Sua pergunta foi enviada com sucesso, em breve você receberá uma resposta por e-mail');
                })
            }
        }
        else {
            error(input);
            helper.classList.add("visible")
            document.querySelector('.modal-btn-enviar').href ='#modal'
            document.querySelector('.modal-btn-enviar').addEventListener('click', function (event) {
                if (inputs[0].value === '' ||
                    inputs[1].value === '' ||
                    inputs[2].value === '') {
                    showAlert('Você deve preencher os campos obrigatórios para enviar sua pergunta.');         
                }
                else {
                    showAlert('É necessário preencher os campos corretamente para enviar sua pergunta');           
                }
            })
            document.querySelector('.modal-btn-close').addEventListener('click', function (event) {
                input.classList.remove("error")
                helper.classList.remove("visible");
                document.getElementById('formularioPergunta').reset();
            })
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