// ===============================
// CONFIGURAÇÕES DO SLIDER
// ===============================

const slider = document.querySelector(".terreno-slider");
const btnLeft = document.querySelector(".seta.left");
const btnRight = document.querySelector(".seta.right");

let scrollAmount = 500;
let scrollSpeed = 300;

// Detecta mobile
function ajustarParaMobile() {
  if (window.innerWidth <= 800) {
    scrollAmount = 330;
    scrollSpeed = 500;
  } else {
    scrollAmount = 500;
    scrollSpeed = 300;
  }
}

ajustarParaMobile();
window.addEventListener("resize", ajustarParaMobile);

// Ativação segura do slider
if (slider && btnLeft && btnRight) {
  btnRight.addEventListener("click", () => {
    slider.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  });

  btnLeft.addEventListener("click", () => {
    slider.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  });
}

// ===============================
// SCROLL SUAVE PARA ÂNCORAS INTERNAS
// ===============================

document
  .querySelectorAll('a[href^="#"]:not(#btn-vila-flora):not(#btn-dona-brida)')
  .forEach((link) => {
    link.addEventListener("click", function (e) {
      const alvo = document.querySelector(this.getAttribute("href"));
      if (!alvo) return; // protege caso o ID não exista

      e.preventDefault();

      window.scrollTo({
        top: alvo.offsetTop - 120,
        behavior: "smooth",
      });
    });
  });

// ===============================
// PERGUNTAS FREQUENTES (FAQ)
// ===============================

const perguntas = document.querySelectorAll(".perguntas button");

function ativarPergunta(event) {
  const pergunta = event.currentTarget;
  const controls = pergunta.getAttribute("aria-controls");
  const resposta = document.getElementById(controls);

  resposta.classList.toggle("ativa");
  const ativa = resposta.classList.contains("ativa");
  pergunta.setAttribute("aria-expanded", ativa);
}

// Ativação segura
if (perguntas.length > 0) {
  perguntas.forEach((pergunta) => {
    pergunta.addEventListener("click", ativarPergunta);
  });
}

document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault(); // impede o envio tradicional

  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const mensagem = document.getElementById("mensagem").value;

  const numero = "5545984015226";

  const texto = `
*Novo contato pelo site!*

*Nome:* ${nome}
*Telefone:* ${telefone}
*Email:* ${email}

*Mensagem:* 
${mensagem}
    `;

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

  window.open(url, "_blank");
});
