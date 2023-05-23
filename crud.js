document.querySelector("#salvar").addEventListener("click", cadastrar)

let lista_atividades = []

window.addEventListener("load", () => {
    lista_atividades = JSON.parse(localStorage.getItem("lista_atividades")) || []
    atualizar()
})

document.querySelector("#pendentes").addEventListener("click", () => {
    lista_atividades = lista_atividades.filter(atividade => !atividade.concluida)
    atualizar()
})

document.querySelector("#concluidas").addEventListener("click", () => {
    lista_atividades = lista_atividades.filter(atividade => atividade.concluida)
    atualizar()
})

document.querySelector("#busca").addEventListener("keyup", () => {
    const titulo = document.querySelector("#busca").value
    lista_atividades = lista_atividades.filter(atividade => atividade.titulo.includes(titulo))
    atualizar()
})

function cadastrar() {
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))
    let titulo = document.querySelector("#titulo").value
    let descricao = document.querySelector("#descricao").value
    let data = document.querySelector("#data").value
    let categoria = document.querySelector("#categoria").value
    let urgente = document.querySelector("#urgente").value

    const atividade = {
        id: Date.now(),
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

    salvar()

    modal.hide()
}

function atualizar(){
    document.querySelector("#atividades").innerHTML = ""
    lista_atividades.forEach((atividade) => {
        document.querySelector("#atividades").innerHTML += gerarCard(atividade)
    })
}

function salvar() {
    localStorage.setItem("lista_atividades", JSON.stringify(lista_atividades))
}


function apagar(id) {
    lista_atividades = lista_atividades.filter(atividade => atividade.id != id)
    salvar()
    atualizar()
}

function concluir(id) {
    let atividade_encontrada = lista_atividades.find(atividade => atividade.id == id)
    atividade_encontrada.concluida = true
    salvar()
    atualizar()
}

function gerarCard(atividade) {
    const disabled = (atividade.concluida) ? "disabled" : ""
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
                <a href="#" onClick="concluir(${atividade.id})" class="btn btn-success ${disabled}">
                    <i class="bi bi-check-lg"></i>
                </a>
                <a href="#" onClick="apagar(${atividade.id})" class="btn btn-danger">
                    <i class="bi bi-trash"></i>
                </a>
            </div>
        </div> <!-- card -->
    </div> <!-- col -->`
}