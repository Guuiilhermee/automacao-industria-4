document.addEventListener('DOMContentLoaded', () => {
    exigiAutenticacao()
    renderizarNavbar('consultar')

    const formConsultar = document.getElementById('form_consultar')
    const resposta = document.getElementById('resposta')

    formConsultar.addEventListener('submit', (e) => {
        e.preventDefault()

        const id = document.getElementById('id').value.trim()
        if (!id) {
            resposta.innerHTML = `<div class="alert alert-warning">Informe o código da peça!</div>`
            return
        }

        fetch(`http://localhost:3000/peca/${id}`)
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(res => {
            if (res.status === 200) {
                const dados = res.body
                let badgeCor = 'bg-secondary'
                const corLower = (dados.cor || '').toLowerCase()
                if (corLower.includes('vermelh') || corLower.includes('red')) badgeCor = 'bg-danger'
                else if (corLower.includes('verd') || corLower.includes('green')) badgeCor = 'bg-success'
                else if (corLower.includes('azu') || corLower.includes('blue')) badgeCor = 'bg-primary'

                resposta.innerHTML = `
                    <div class="card border-primary border-opacity-25 bg-light p-3">
                        <h5 class="fw-bold text-primary mb-3"><i class="bi bi-box-seam me-2"></i>Detalhes da Peça #${dados.codPeca}</h5>
                        <ul class="list-group list-group-flush rounded">
                            <li class="list-group-item d-flex justify-content-between">
                                <span class="text-muted">Nome:</span> <span class="fw-bold">${dados.nome}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <span class="text-muted">Cor:</span> <span class="badge ${badgeCor} fs-6">${dados.cor}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <span class="text-muted">Tipo:</span> <span>${dados.tipo}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <span class="text-muted">Quantidade em Estoque:</span> <span class="fw-bold fs-5 text-success">${dados.quantidade}</span>
                            </li>
                        </ul>
                    </div>
                `
            } else {
                resposta.innerHTML = `<div class="alert alert-danger">${res.body.message || 'Peça não encontrada!'}</div>`
            }
        })
        .catch(err => {
            console.error('Erro ao consultar peça:', err)
            resposta.innerHTML = `<div class="alert alert-danger">Erro de comunicação com o servidor!</div>`
        })
    })
})