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
let nomeInput = document.getElementById("nome");
let nomeLabel = document.querySelector('label[for="nome"]');
let nomeHelper = document.getElementById("nome-helper");
let sobrenomeInput = document.getElementById("sobrenome");
let sobrenomeLabel = document.querySelector('label[for="sobrenome"]');
let sobrenomeHelper = document.getElementById("sobrenome-helper");
let emailInput = document.getElementById("email");
let emailLabel = document.querySelector('label[for="email"]');
let emailHelper = document.getElementById("email-helper");
let pergunta = document.getElementById("texto-pergunta");

nomeInput.addEventListener("focus", () => {
    nomeLabel.classList.add("required-popup");
});

nomeInput.addEventListener("blur", () => {
    usernameLabel.classList.remove("required-popup");
});