document.addEventListener('DOMContentLoaded', () => {
    renderizarNavbar('login')

    const formLogin = document.getElementById('form_login')
    const resposta = document.getElementById('resposta')

    formLogin.addEventListener('submit', (e) => {
        e.preventDefault()

        const email = document.getElementById('email').value.trim()
        const senha = document.getElementById('senha').value.trim()

        if (!email || !senha) {
            resposta.innerHTML = `<div class="alert alert-danger">Preencha todos os campos!</div>`
            return
        }

        fetch('http://localhost:3000/usuario/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        })
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(res => {
            if (res.status === 200) {
                resposta.innerHTML = `<div class="alert alert-success">${res.body.message} Redirecionando...</div>`
                localStorage.setItem('token', res.body.token)
                localStorage.setItem('usuario', JSON.stringify(res.body.usuario))

                setTimeout(() => {
                    if (res.body.usuario.tipoUsuario === 'adm') {
                        window.location.href = '/html/pecas/dashboard.html'
                    } else {
                        window.location.href = '/html/pecas/listarPeca.html'
                    }
                }, 1000)
            } else {
                resposta.innerHTML = `<div class="alert alert-danger">${res.body.message || 'Erro ao realizar login!'}</div>`
            }
        })
        .catch(err => {
            console.error('Erro na requisição de login:', err)
            resposta.innerHTML = `<div class="alert alert-danger">Erro de comunicação com o servidor!</div>`
        })
    })
})
