let meuchart = null
let intervaloAtualizacao = null

document.addEventListener('DOMContentLoaded', () => {
    exigiAdm()
    renderizarNavbar('dashboard')
    carregarDashboard()

    // Atualização em tempo real (Polling a cada 3 segundos) para ler leituras do ESP32 automaticamente
    intervaloAtualizacao = setInterval(carregarDashboard, 3000)
})

function carregarDashboard() {
    fetch('http://localhost:3000/pecas')
    .then(res => res.json())
    .then(dados => {
        atualizarCards(dados)
        renderizarTabela(dados)
        renderizarGrafico(dados)

        const statusElem = document.getElementById('status_atualizacao')
        if (statusElem) {
            const agora = new Date()
            statusElem.textContent = `Atualizado às ${agora.toLocaleTimeString()}`
        }
    })
    .catch(err => {
        console.error('Erro ao carregar dados do dashboard:', err)
    })
}

function atualizarCards(pecas) {
    let total = 0
    let vermelha = 0
    let verde = 0
    let azul = 0

    pecas.forEach(p => {
        const qtd = Number(p.quantidade) || 0
        total += qtd

        const corLower = (p.cor || '').toLowerCase()
        if (corLower.includes('vermelh') || corLower.includes('red')) {
            vermelha += qtd
        } else if (corLower.includes('verd') || corLower.includes('green')) {
            verde += qtd
        } else if (corLower.includes('azu') || corLower.includes('blue')) {
            azul += qtd
        }
    })

    document.getElementById('card_total').textContent = total
    document.getElementById('card_vermelha').textContent = vermelha
    document.getElementById('card_verde').textContent = verde
    document.getElementById('card_azul').textContent = azul
}

function renderizarTabela(pecas) {
    const tbody = document.getElementById('tabela_pecas')
    tbody.innerHTML = ''

    if (pecas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted py-4">Nenhuma peça cadastrada ou detectada no sistema.</td>
            </tr>
        `
        return
    }

    pecas.forEach(p => {
        let badgeCor = 'bg-secondary'
        const corLower = (p.cor || '').toLowerCase()
        if (corLower.includes('vermelh') || corLower.includes('red')) badgeCor = 'bg-danger'
        else if (corLower.includes('verd') || corLower.includes('green')) badgeCor = 'bg-success'
        else if (corLower.includes('azu') || corLower.includes('blue')) badgeCor = 'bg-primary'

        tbody.innerHTML += `
            <tr>
                <td class="fw-bold">#${p.codPeca}</td>
                <td>${p.nome}</td>
                <td><span class="badge ${badgeCor}">${p.cor}</span></td>
                <td>${p.tipo}</td>
                <td><span class="fw-semibold fs-6 text-primary">${p.quantidade}</span></td>
                <td class="text-end">
                    <a href="./attPeca.html?id=${p.codPeca}" class="btn btn-sm btn-outline-warning me-1" title="Editar">
                        <i class="bi bi-pencil-square"></i>
                    </a>
                    <a href="./delPeca.html?id=${p.codPeca}" class="btn btn-sm btn-outline-danger" title="Excluir">
                        <i class="bi bi-trash"></i>
                    </a>
                </td>
            </tr>
        `
    })
}

function renderizarGrafico(pecas) {
    const ctx = document.getElementById('graficoPecas').getContext('2d')

    // Agrupar quantidade por cor
    const coresQtd = {}
    pecas.forEach(p => {
        const cor = p.cor || 'Outra'
        coresQtd[cor] = (coresQtd[cor] || 0) + Number(p.quantidade)
    })

    const labels = Object.keys(coresQtd)
    const data = Object.values(coresQtd)

    // Mapear cores para estilizar as barras
    const backgroundColors = labels.map(c => {
        const cLower = c.toLowerCase()
        if (cLower.includes('vermelh') || cLower.includes('red')) return 'rgba(220, 53, 69, 0.8)'
        if (cLower.includes('verd') || cLower.includes('green')) return 'rgba(25, 135, 84, 0.8)'
        if (cLower.includes('azu') || cLower.includes('blue')) return 'rgba(13, 110, 253, 0.8)'
        return 'rgba(108, 117, 125, 0.8)'
    })

    if (meuchart) {
        // Atualizar dados no gráfico existente sem destruí-lo se a estrutura for a mesma
        meuchart.data.labels = labels.length ? labels : ['Sem Dados']
        meuchart.data.datasets[0].data = data.length ? data : [0]
        meuchart.data.datasets[0].backgroundColor = backgroundColors.length ? backgroundColors : ['rgba(108, 117, 125, 0.8)']
        meuchart.update()
        return
    }

    meuchart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels.length ? labels : ['Sem Dados'],
            datasets: [{
                label: 'Quantidade em Estoque',
                data: data.length ? data : [0],
                backgroundColor: backgroundColors.length ? backgroundColors : ['rgba(108, 117, 125, 0.8)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 500
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    })
}
