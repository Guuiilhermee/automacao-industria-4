document.addEventListener('DOMContentLoaded', () => {
    exigiAutenticacao()
    renderizarNavbar('listar')

    const resposta = document.getElementById('resposta')
    const btnListar = document.getElementById('btn_listar')

    function buscarPecas() {
        fetch('http://localhost:3000/pecas')
        .then(res => res.json())
        .then(dados => {
            resposta.innerHTML = ''
            if (!Array.isArray(dados) || dados.length === 0) {
                resposta.innerHTML = `
                    <tr>
                        <td colspan="5" class="text-center text-muted py-4">Nenhuma peça encontrada.</td>
                    </tr>
                `
                return
            }

            dados.forEach(p => {
                let badgeCor = 'bg-secondary'
                const corLower = (p.cor || '').toLowerCase()
                if (corLower.includes('vermelh') || corLower.includes('red')) badgeCor = 'bg-danger'
                else if (corLower.includes('verd') || corLower.includes('green')) badgeCor = 'bg-success'
                else if (corLower.includes('azu') || corLower.includes('blue')) badgeCor = 'bg-primary'

                resposta.innerHTML += `
                    <tr>
                        <td class="fw-bold">#${p.codPeca}</td>
                        <td>${p.nome}</td>
                        <td><span class="badge ${badgeCor}">${p.cor}</span></td>
                        <td>${p.tipo}</td>
                        <td><span class="fw-semibold">${p.quantidade}</span></td>
                    </tr>
                `
            })
        })
        .catch(err => {
            console.error('Erro ao listar peças:', err)
            resposta.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center text-danger py-4">Erro ao carregar peças do servidor.</td>
                </tr>
            `
        })
    }

    btnListar.addEventListener('click', (e) => {
        e.preventDefault()
        buscarPecas()
    })

    // Carga inicial
    buscarPecas()
})