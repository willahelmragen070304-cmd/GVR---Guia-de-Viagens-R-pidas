// ===============================
// MAPA
// ===============================
var map = L.map('mapa').setView([-15.788497, -47.879873], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);

var marcador = null;

function moverMapa(lat, lng, nome) {
    map.setView([lat, lng], 10);

    if (marcador) map.removeLayer(marcador);

    marcador = L.marker([lat, lng])
        .addTo(map)
        .bindPopup(nome)
        .openPopup();
}


// ===============================
// RENDERIZAR DESTINOS
// ===============================

function renderDestinos(destinos) {
    const container = document.getElementById("destinos");
    container.innerHTML = "";

    destinos.forEach(destino => {
        const card = document.createElement("div");
        card.classList.add("card-destino");

        card.innerHTML = `
            <img src="${destino.imagem}" alt="${destino.nome}">
            <h3>${destino.nome}</h3>

            <button class="toggle-btn">Ver mais detalhes</button>

            <div class="hidden-list">
                <ul>
                    <li><strong>Continente:</strong> ${destino.continente}</li>
                    <li><strong>Tipo:</strong> ${destino.tipo}</li>
                    <li><strong>Preço:</strong> R$ ${destino.preco}</li>
                    <li><strong>Descrição:</strong> ${destino.descricao}</li>
                    <li><strong>Hotéis:</strong> ${destino.hoteis}</li>
                </ul>
            </div>
        `;

        container.appendChild(card);

        const botao = card.querySelector(".toggle-btn");
        const lista = card.querySelector(".hidden-list");

        botao.addEventListener("click", () => {
            lista.classList.toggle("active");

            botao.textContent = lista.classList.contains("active")
                ? "Esconder detalhes"
                : "Ver mais detalhes";

            moverMapa(destino.lat, destino.lng, destino.nome);
        });
    });
}


// ===============================
// INICIAR APP
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    renderDestinos(window.destinos);
});
