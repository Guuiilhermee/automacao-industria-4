document.addEventListener('DOMContentLoaded', () => {
    renderizarNavbar('registro')

    const formRegistro = document.getElementById('form_registro')
    const resposta = document.getElementById('resposta')

    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault()

        const nome = document.getElementById('nome').value.trim()
        const email = document.getElementById('email').value.trim()
        const senha = document.getElementById('senha').value.trim()

        if (!nome || !email || !senha) {
            resposta.innerHTML = `<div class="alert alert-danger">Preencha todos os campos!</div>`
            return
        }

        fetch('http://localhost:3000/usuario/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, senha })
        })
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(res => {
            if (res.status === 201) {
                resposta.innerHTML = `<div class="alert alert-success">${res.body.message} Redirecionando para login...</div>`
                formRegistro.reset()
                setTimeout(() => {
                    window.location.href = '/html/index.html'
                }, 1500)
            } else {
                resposta.innerHTML = `<div class="alert alert-danger">${res.body.message || 'Erro ao realizar cadastro!'}</div>`
            }
        })
        .catch(err => {
            console.error('Erro no cadastro:', err)
            resposta.innerHTML = `<div class="alert alert-danger">Erro de comunicação com o servidor!</div>`
        })
    })
})
