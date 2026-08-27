document.addEventListener('DOMContentLoaded', () => {
    exigiAdm()
    renderizarNavbar('cadPeca')

    const formCadastrar = document.getElementById('form_cadastrar')
    const resposta = document.getElementById('resposta')

    formCadastrar.addEventListener('submit', (e) => {
        e.preventDefault()

        const nomeInput = document.getElementById('nome')
        const corInput = document.getElementById('cor')
        const tipoInput = document.getElementById('tipo')
        const qtdInput = document.getElementById('quantidade')

        const nome = (nomeInput && nomeInput.value) ? nomeInput.value.trim() : 'Bloco'
        const cor = (corInput && corInput.value) ? corInput.value.trim() : ''
        const tipo = (tipoInput && tipoInput.value) ? tipoInput.value.trim() : 'Caixa'
        const quantidade = Number(qtdInput ? qtdInput.value : 1) || 1
        const token = obterToken()

        if (!cor) {
            resposta.innerHTML = `<div class="alert alert-danger fw-bold"><i class="bi bi-exclamation-triangle me-1"></i> Por favor, selecione uma cor para a peça!</div>`
            return
        }

        const valores = { nome, cor, tipo, quantidade }

        fetch('http://localhost:3000/peca', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(valores)
        })
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                resposta.innerHTML = `<div class="alert alert-success fw-bold"><i class="bi bi-check-circle me-1"></i> ${res.body.message}</div>`
                if (corInput) corInput.value = ''
            } else if (res.status === 401 || res.status === 403) {
                resposta.innerHTML = `<div class="alert alert-danger fw-bold"><i class="bi bi-shield-lock me-1"></i> ${res.body.message || 'Sessão expirada. Faça login novamente como ADM.'}</div>`
            } else {
                resposta.innerHTML = `<div class="alert alert-danger fw-bold"><i class="bi bi-exclamation-triangle me-1"></i> ${res.body.message || 'Erro ao cadastrar peça!'}</div>`
            }
        })
        .catch(err => {
            console.error('Erro ao cadastrar Peça:', err)
            resposta.innerHTML = `<div class="alert alert-danger fw-bold"><i class="bi bi-exclamation-triangle me-1"></i> Erro de comunicação com o servidor! (${err.message})</div>`
        })
    })
})