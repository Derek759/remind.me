document.querySelector("#salvar").addEventListener("click", cadastrar)

let lista_atividades = []

window.addEventListener("load", () => {
    lista_atividades = JSON.parse(localStorage.getItem("lista_atividades"))
    if (lista_atividades!=null) {
        lista_atividades.forEach((atividade) => {
            document.querySelector("#atividades").innerHTML += gerarCard(atividade)
        })
    }
})

function cadastrar() {
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))
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

    if (atividade.titulo.length == 0) {
        document.querySelector("#titulo").classList.add("is-invalid")
        return
    }

    if (lista_atividades==null) {
        lista_atividades = []
    }

    lista_atividades.push(atividade)

    document.querySelector("#atividades").innerHTML += gerarCard(atividade)

    document.querySelector("#titulo").value = ""
    document.querySelector("#descricao").value = ""


    localStorage.setItem("lista_atividades", JSON.stringify(lista_atividades))

    modal.hide()
}

function apagar(botao) {
    botao.parentNode.parentNode.parentNode.remove()
}

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
                <a onclick="apagar(this)" href="#" class="btn btn-danger">
                    <i class="bi bi-trash"></i>
                </a>
            </div>
        </div> <!-- card -->
    </div> <!-- col -->`
}