document.addEventListener('DOMContentLoaded', () => {
    exigiAdm()
    renderizarNavbar('cadAdm')

    const formAdm = document.getElementById('form_adm')
    const resposta = document.getElementById('resposta')

    formAdm.addEventListener('submit', (e) => {
        e.preventDefault()

        const nome = document.getElementById('nome').value.trim()
        const email = document.getElementById('email').value.trim()
        const senha = document.getElementById('senha').value.trim()
        const token = obterToken()

        if (!nome || !email || !senha) {
            resposta.innerHTML = `<div class="alert alert-danger">Preencha todos os campos!</div>`
            return
        }

        fetch('http://localhost:3000/usuario/registro-adm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nome, email, senha })
        })
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(res => {
            if (res.status === 201) {
                resposta.innerHTML = `<div class="alert alert-success">${res.body.message}</div>`
                formAdm.reset()
            } else {
                resposta.innerHTML = `<div class="alert alert-danger">${res.body.message || 'Erro ao cadastrar administrador!'}</div>`
            }
        })
        .catch(err => {
            console.error('Erro no cadastro de ADM:', err)
            resposta.innerHTML = `<div class="alert alert-danger">Erro de comunicação com o servidor!</div>`
        })
    })
})
