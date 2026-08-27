let resposta = document.getElementById('resposta')
let btn_consultar = document.getElementById('btn_consultar')

btn_consultar.addEventListener('click', (e)=>{
    e.preventDefault()
    const id = document.getElementById('id').value

    fetch(`htpp://localhost:3000/peca/${id}`)
    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ''
        if(dados.message){
            resposta.innerHTML = `<p>${dados.message}</p>`
        }else{
            resposta.innerHTML += `<p>Nome: ${dados.nome}</p>`
            resposta.innerHTML += `<p>Cor: ${dados.cor}</p>`
            resposta.innerHTML += `<p>Tipo: ${dados.tipo}</p>`
            resposta.innerHTML += `<p>Quantidade: ${dados.quantidade}</p>`
        }
        document.querySelector('form').reset()
    })
    .catch((err)=>{
        console.error('Erro ao consultar Peça',err)
    })
})