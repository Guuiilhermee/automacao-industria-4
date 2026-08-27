document.addEventListener('DOMContentLoaded', () => {
    exigiAdm()
    renderizarNavbar('attPeca')

    const formAtualizar = document.getElementById('form_atualizar')
    const btnCarregar = document.getElementById('btn_carregar_peca')
    const resposta = document.getElementById('resposta')
    const codPecaInput = document.getElementById('codPeca')

    const urlParams = new URLSearchParams(window.location.search)
    const idUrl = urlParams.get('id')
    if (idUrl) {
        codPecaInput.value = idUrl
        carregarDadosPeca(idUrl)
    }

    btnCarregar.addEventListener('click', () => {
        const codPeca = codPecaInput.value.trim()
        if (!codPeca) {
            resposta.innerHTML = `<div class="alert alert-danger fw-bold"><i class="bi bi-exclamation-triangle me-1"></i> Digite um código de peça válido!</div>`
            return
        }
        carregarDadosPeca(codPeca)
    })

    function carregarDadosPeca(id) {
        fetch(`http://localhost:3000/peca/${id}`)
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(res => {
            if (res.status === 200) {
                const dados = res.body
                if (document.getElementById('nome')) document.getElementById('nome').value = dados.nome || ''
                if (document.getElementById('cor')) document.getElementById('cor').value = dados.cor || ''
                if (document.getElementById('tipo')) document.getElementById('tipo').value = dados.tipo || ''
                if (document.getElementById('quantidade')) document.getElementById('quantidade').value = dados.quantidade || 0
                resposta.innerHTML = `<div class="alert alert-success fw-bold"><i class="bi bi-check-circle me-1"></i> Dados da peça #${id} carregados com sucesso!</div>`
            } else {
                resposta.innerHTML = `<div class="alert alert-danger fw-bold"><i class="bi bi-exclamation-triangle me-1"></i> ${res.body.message || 'Peça não encontrada!'}</div>`
            }
        })
        .catch(err => {
            console.error('Erro ao carregar dados da peça:', err)
            resposta.innerHTML = `<div class="alert alert-danger fw-bold"><i class="bi bi-exclamation-triangle me-1"></i> Erro ao buscar peça no servidor!</div>`
        })
    }

    formAtualizar.addEventListener('submit', (e) => {
        e.preventDefault()

        const codPeca = codPecaInput.value.trim()
        const nome = document.getElementById('nome').value
        const cor = document.getElementById('cor').value
        const tipo = document.getElementById('tipo').value
        const quantidade = Number(document.getElementById('quantidade').value)
        const token = obterToken()

        if (!codPeca) {
            resposta.innerHTML = `<div class="alert alert-danger fw-bold"><i class="bi bi-exclamation-triangle me-1"></i> Informe o código da peça a ser atualizada!</div>`
            return
        }

        const pecaAtualizada = { nome, cor, tipo, quantidade }

        fetch(`http://localhost:3000/peca/${codPeca}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(pecaAtualizada)
        })
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(res => {
            if (res.status === 200) {
                resposta.innerHTML = `<div class="alert alert-success fw-bold"><i class="bi bi-check-circle me-1"></i> ${res.body.message}</div>`
            } else {
                resposta.innerHTML = `<div class="alert alert-danger fw-bold"><i class="bi bi-exclamation-triangle me-1"></i> ${res.body.message || 'Erro ao atualizar peça!'}</div>`
            }
        })
        .catch(err => {
            console.error('Erro ao atualizar peça:', err)
            resposta.innerHTML = `<div class="alert alert-danger fw-bold"><i class="bi bi-exclamation-triangle me-1"></i> Erro de comunicação com o servidor!</div>`
        })
    })
})