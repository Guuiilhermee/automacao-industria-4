document.addEventListener('DOMContentLoaded', () => {
    exigiAdm()
    renderizarNavbar('delPeca')

    const formExcluir = document.getElementById('form_excluir')
    const resposta = document.getElementById('resposta')
    const idInput = document.getElementById('id')

    const urlParams = new URLSearchParams(window.location.search)
    const idUrl = urlParams.get('id')
    if (idUrl) {
        idInput.value = idUrl
    }

    formExcluir.addEventListener('submit', (e) => {
        e.preventDefault()

        const id = idInput.value.trim()
        const token = obterToken()

        if (!id) {
            resposta.innerHTML = `<div class="alert alert-danger fw-bold"><i class="bi bi-exclamation-triangle me-1"></i> Informe o código da peça!</div>`
            return
        }

        if (!confirm(`Tem certeza que deseja subtrair 1 unidade da peça #${id}?`)) {
            return
        }

        fetch(`http://localhost:3000/peca/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(async res => {
            const contentType = res.headers.get('content-type')
            let data
            if (contentType && contentType.includes('application/json')) {
                data = await res.json()
            } else {
                const text = await res.text()
                data = { message: text || `Erro no servidor (código ${res.status})` }
            }
            return { status: res.status, body: data }
        })
        .then(res => {
            if (res.status === 200) {
                resposta.innerHTML = `<div class="alert alert-success fw-bold"><i class="bi bi-check-circle me-1"></i> ${res.body.message}</div>`
                formExcluir.reset()
            } else {
                resposta.innerHTML = `<div class="alert alert-danger fw-bold"><i class="bi bi-exclamation-triangle me-1"></i> ${res.body.message || 'Erro ao remover unidade!'}</div>`
            }
        })
        .catch(err => {
            console.error('Erro ao remover unidade da peça:', err)
            resposta.innerHTML = `<div class="alert alert-danger fw-bold"><i class="bi bi-exclamation-triangle me-1"></i> Erro de comunicação com o servidor! (${err.message})</div>`
        })
    })
})