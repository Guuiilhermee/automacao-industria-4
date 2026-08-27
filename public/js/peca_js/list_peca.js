let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e)=>{
    e.preventDefault()

    fetch('http://localhost:3000/pecas')
    .then(res => res.json())
    .then(dados =>{
        console.log(dados)
        resposta.innerHTML = ''
        resposta.innerHTML += `
            <table>
                ${thead()}
                ${tbody(dados)}
            </table>
        `
    })
    .catch((err)=>{
        console.error('Erro ao listar Peças',err)
    })
})

function thead(){
    let headerTabela = `
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
    return headerTabela
}

function tbody(dados){
    let bodyTabela = `<tbody>`
    dados.forEach(parts =>{
        bodyTabela += `
            <tr>
                <td>${parts.codPeca}</td>
                <td>${parts.nome}</td>
                <td>${parts.cor}</td>
                <td>${parts.tipo}</td>
                <td>${parts.quantidade}</td>
            </tr>
        `
    })
    bodyTabela += `</tbody>`
    return bodyTabela
}