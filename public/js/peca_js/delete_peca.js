let resposta = document.getElementById('resposta')
let btn_apagar = document.getElementById('btn_apagar')

btn_apagar.addEventListener('click', (e)=>{
    e.preventDefault()
    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/peca/${id}`,{
        method: 'DELETE'
    })

    .then(res => res.json())
    .then(dados =>{
        console.log(dados.message)
        resposta.innerHTML = ''
        resposta.innerHTML += `<p>${dados.message}</p>`
        document.querySelector('form').reset()
    })
    .catch((err)=>{
        console.error('Erro ao excluir Peça',err)
    })
})