//Manipulação de Slider
const slider = document.querySelector('.slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let slideIndex = 0;
const intervalTime = 3000;
let slideInterval;

function showSlides() {
  const slides = document.querySelectorAll('.slider img');

  if (slideIndex >= slides.length) {
    slideIndex = 0;
  } else if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  slides[slideIndex].style.display = 'block';
  slideIndex++;
}

function nextSlide() {
  showSlides();
}

function prevSlide() {
  slideIndex -= 2;
  showSlides();
}

function startSlider() {
  slideInterval = setInterval(nextSlide, intervalTime);
}

function pauseSlider() {
  clearInterval(slideInterval);
}

startSlider();

prevBtn.addEventListener('click', () => {
  pauseSlider();
  prevSlide();
  startSlider();
});

nextBtn.addEventListener('click', () => {
  pauseSlider();
  nextSlide();
  startSlider();
});

slider.addEventListener('mouseover', () => {
  pauseSlider();
});

slider.addEventListener('mouseout', () => {
  startSlider();
});

showSlides();
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);


//Renderização dinâmica dos artigos
const conteudoHTML = [
  `<img class="imagem-artigo" src="./assets/imagens/Por que doar sangue.jpg"
alt="Imagem pessoa doando sangue">
<h2>Por que doar Sangue?</h2>
<p>Conheça alguns dos benefícios da doação de sangue que podem ajudá-lo a reconsiderar a doação
</p>
<div class="data-e-botao">
<i class="fa-regular fa-calendar-days"><time datetime="2023-09-01">01/09/2023</time></i>
<a href="./html/porque-doar-sangue.html" target="_blank">Leia artigo completo</a>
</div>`,
  `<img class="imagem-artigo" src="./assets/imagens/Desmistificando mitos.jpg" alt="Desmistificando Mitos">
<h2>Desmistificando mitos</h2>
<p>Esses são alguns dos mitos que temos que desfazer com mais frequência</p>
<div class="data-e-botao">
  <i class="fa-regular fa-calendar-days"><time datetime="2023-09-01">01/09/2023</time></i>
  <a href="./html/desmistificando-mitos.html" target="_blank">Leia artigo completo</a>
</div>`,
  ` <img class="imagem-artigo" src="./assets/imagens/Tres coracoes.jpg" alt="Três corações">
<h2>Você sabe por que seu sangue salva três vidas?</h2>
<p>Conheça os três componentes básicos do sangue</p>
<div class="data-e-botao">
  <i class="fa-regular fa-calendar-days"><time datetime="2023-09-01">01/09/2023</time></i>
  <a href="./html/salva-tres-vidas.html" target="_blank">Leia artigo completo</a>
</div>`
]

conteudoHTML.push(`<img class="imagem-artigo" src="./assets/imagens/Dicas para o dia da doação.jpg"
alt="Dicas para o dia da doação">
<h2>Dicas para o dia da doação</h2>
<p>Saiba mais sobre as recomendações antes, durante e depois da doação de sangue</p>
<div class="data-e-botao">
<i class="fa-regular fa-calendar-days"><time datetime="2023-09-01">01/09/2023</time></i>
<a href="./html/dicas-doacao.html" target="_blank">Leia artigo completo</a>
</div>`)

function addArtigo(conteudoHTML) {
  const artigo = document.createElement("div");
  artigo.innerHTML = conteudoHTML
  const containerArtigos = document.querySelector(".artigos")
  containerArtigos.appendChild(artigo)
  artigo.classList = "artigo"
}

conteudoHTML.forEach(element => {
  addArtigo(element)
});
