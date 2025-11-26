function getDestinos() {
    return JSON.parse(localStorage.getItem("destinos")) || [];
}

function saveDestinos(lista) {
    localStorage.setItem("destinos", JSON.stringify(lista));
}
function adicionarDestino(destino) {
    const lista = getDestinos();
    destino.id = Date.now(); // gera ID único
    lista.push(destino);
    saveDestinos(lista);
}
