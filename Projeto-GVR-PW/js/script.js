const sampleData = [
  {"nome":"Chile","continente":"América do Sul","tipo":"Cidade","preco":2500,"descricao":"Viagem para Santiago...","imagem":"../imagens/card1.png"},
  {"nome":"Portugal","continente":"Europa","tipo":"Cidade","preco":3800,"descricao":"Lisboa histórica...","imagem":"../imagens/card2.png"}
];

function criarCard(destino) {
  const card = document.createElement("div");
  card.className = "card-destino";
  card.innerHTML = `
    <img src="${destino.imagem}" alt="Imagem de ${destino.nome}">
    <h3 class="destino-nome">${destino.nome}</h3>
    <p class="destino-preco">Preço: R$ ${destino.preco}</p>
    <button class="toggle-btn" type="button">Ver mais detalhes</button>
    <div class="hidden-list" aria-hidden="true">
      <ul>
        <li><strong>Continente:</strong> ${destino.continente}</li>
        <li><strong>Tipo:</strong> ${destino.tipo}</li>
        <li><strong>Preço:</strong> R$ ${destino.preco}</li>
        <li><strong>Descrição:</strong> ${destino.descricao}</li>
      </ul>
    </div>
  `;
  return card;
}

function renderDestinos(destinos) {
  const container = document.getElementById("destinos");
  if(!container) {
    console.warn("Container #destinos não encontrado.");
    return;
  }
  container.innerHTML = "";
  destinos.forEach(d => container.appendChild(criarCard(d)));
  ativarBotoes();
}

/* tenta carregar JSON; se falhar (file:// ou CORS), usa sampleData */
(function loadData() {
  fetch("../js/destinos.json")
    .then(r => { if(!r.ok) throw new Error(r.status); return r.json(); })
    .then(renderDestinos)
    .catch(err => {
      console.warn("Não foi possível carregar destinos.json, usando dados locais.", err);
      renderDestinos(sampleData);
    });
})();
function criarCard(destino) {
  const card = document.createElement("div");
  card.classList.add("card-destino");

  // Card sem preço visível
  card.innerHTML = `
    <img src="${destino.imagem}" alt="Imagem de ${destino.nome}">
    <h3 class="destino-nome">${destino.nome}</h3>

    <button class="toggle-btn" type="button">Ver mais detalhes</button>

    <div class="hidden-list">
      <ul>
        <li><strong>Continente:</strong> ${destino.continente}</li>
        <li><strong>Tipo:</strong> ${destino.tipo}</li>
        <li><strong>Preço:</strong> R$ ${destino.preco}</li>
        <li><strong>Descrição:</strong> ${destino.descricao}</li>
      </ul>
    </div>
  `;

  return card;
}
function ativarBotoes() {
  const botoes = document.querySelectorAll(".toggle-btn");

  botoes.forEach(botao => {
    botao.addEventListener("click", () => {
      const lista = botao.nextElementSibling;
      lista.classList.toggle("active");

      botao.textContent = lista.classList.contains("active") 
        ? "Esconder detalhes"
        : "Ver mais detalhes";
    });
  });
}



