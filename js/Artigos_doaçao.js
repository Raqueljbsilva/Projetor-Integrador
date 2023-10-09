const btn = document.getElementById("btn");

btn.addEventListener("change",(e) =>{
    document.body.classList.toggle("dark",e.target.checked)
})

//Manipulação de Slider
const slider = document.querySelector('.slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let slideIndex = 0;
const intervalTime = 2000;
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