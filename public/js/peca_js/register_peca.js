let resposta = document.getElementById('resposta')
let btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const cor = document.getElementById('cor').value
    const tipo = document.getElementById('tipo').value
    const quantidade = Number(document.getElementById('quantidade').value)

    const valores = {
        nome: nome,
        cor: cor,
        tipo: tipo,
        quantidade: quantidade
    }
    console.log(valores)

    fetch('http://localhost:3000/peca',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ''
        resposta.innerHTML += `<p>${dados.message}</p>`
        document.querySelector('form').reset()
    })
    .catch((err)=>{
        console.error('Erro ao cadastrar Peça',err)
    })
})