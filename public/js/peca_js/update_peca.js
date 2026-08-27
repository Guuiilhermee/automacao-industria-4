let resposta = document.getElementById('resposta')
let btn_atualizar = document.getElementById('btn_atualizar')

btn_atualizar.addEventListener('click', (e)=>{
    e.preventDefault()

    const codPeca = document.getElementById('codPeca').value
    const nome = document.getElementById('nome').value
    const cor = document.getElementById('cor').value
    const tipo = document.getElementById('tipo').value
    const quantidade = Number(document.getElementById('quantidade').value)

    if(!codPeca){
        resposta.innerHTML = '<p>Informe o Código da Peça!</p>'
        return
    }

    const pecaAtualizada = {
        nome: nome,
        cor: cor,
        tipo: tipo,
        quantidade: quantidade
    }

    fetch(`http://localhost:3000/peca/${codPeca}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pecaAtualizada)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''

        if(dados.message){
            resposta.innerHTML = `<p>${dados.message}</p>`
            return
        }

        let dadosArr = [dados]

        resposta.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dadosArr)}
            </table>
        `
        document.querySelector('form').reset()
    })
    .catch((err)=>{
        console.error('Erro ao atualizar os dados', err)
        resposta.innerHTML = '<p>Erro ao tentar atualizar a Peça!</p>'
    })
})

function criarTbody(dados) {
    let corpo = ''
    corpo += `<tbody>`
    dados.forEach(parts => {
        corpo += `<tr>`
        corpo += `<td>${parts.codPeca}</td>`
        corpo += `<td>${parts.nome}</td>`
        corpo += `<td>${parts.cor}</td>`
        corpo += `<td>${parts.tipo}</td>`
        corpo += `<td>${parts.quantidade}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead() {
    let cabecalho = ''
    cabecalho += `
        <thead>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Cor</th>
                <th>Tipo</th>
                <th>Quantidade</th>
            </tr>
        </thead>
    `
    return cabecalho
}