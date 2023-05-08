document.querySelector("#salvar").addEventListener("click", cadastrar)

function cadastrar() {
    let titulo = document.querySelector("#titulo").value
    let descricao = document.querySelector("#descricao").value
    let data = document.querySelector("#data").value
    let categoria = document.querySelector("#categoria").value
    let urgente = document.querySelector("#urgente").value

    const atividade = {
        titulo: titulo,
        descricao: descricao,
        data: data,
        categoria: categoria,
        urgente: urgente
    }

    document.querySelector("#atividades").innerHTML += gerarCard(atividade)
}

/* function dados(atividade) {
    if (urgente == "on") {
        urgente = "urgenteee"
        console.log(urgente)
    }
} */

function gerarCard(atividade) {
    return `
    <div class="col-12 col-md-6 col-lg-3 mb-4">
        <div class="card">
            <div class="card-header">
                ${atividade.titulo}
            </div>
            <div class="card-body">
                <p class="card-text">
                    ${atividade.descricao}
                </p>
                <p class="card-text">
                    ${atividade.data}
                </p>
                <p>
                    <span class="badge text-bg-warning">${atividade.categoria}</span>
                </p>
                <a href="#" class="btn btn-success">
                    <i class="bi bi-check-lg"></i>
                </a>
                <a href="#" class="btn btn-danger">
                    <i class="bi bi-trash"></i>
                </a>
            </div>
        </div> <!-- card -->
    </div> <!-- col -->`
}