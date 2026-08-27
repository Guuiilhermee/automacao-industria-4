// Autenticação

function obterToken() {
    return localStorage.getItem('token')
}

function obterUsuarioLogado() {
    const usuarioStr = localStorage.getItem('usuario')
    if (!usuarioStr) return null
    try {
        return JSON.parse(usuarioStr)
    } catch (e) {
        return null
    }
}

function exigiAutenticacao() {
    const token = obterToken()
    if (!token) {
        window.location.href = '/html/index.html'
    }
}

function exigiAdm() {
    exigiAutenticacao()
    const usuario = obterUsuarioLogado()
    if (!usuario || usuario.tipoUsuario !== 'adm') {
        alert('Acesso negado. Esta página é exclusiva para Administradores.')
        window.location.href = '/html/pecas/listarPeca.html'
    }
}

function realizarLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    window.location.href = '/html/index.html'
}

function renderizarNavbar(paginaAtual = '') {
    const usuario = obterUsuarioLogado()
    const isAdm = usuario && usuario.tipoUsuario === 'adm'

    const navbarContainer = document.getElementById('navbar-container')
    if (!navbarContainer) return

    let navItems = ''

    if (usuario) {
        if (isAdm) {
            navItems += `
                <li class="nav-item">
                    <a class="nav-link ${paginaAtual === 'dashboard' ? 'active' : ''}" href="/html/pecas/dashboard.html">Dashboard</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ${paginaAtual === 'cadPeca' ? 'active' : ''}" href="/html/pecas/cadPeca.html">Cadastrar Peça</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ${paginaAtual === 'attPeca' ? 'active' : ''}" href="/html/pecas/attPeca.html">Atualizar Peça</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ${paginaAtual === 'delPeca' ? 'active' : ''}" href="/html/pecas/delPeca.html">Excluir Peça</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ${paginaAtual === 'cadAdm' ? 'active' : ''}" href="/html/usuario/cadAdm.html">Cadastrar ADM</a>
                </li>
            `
        }

        navItems += `
            <li class="nav-item">
                <a class="nav-link ${paginaAtual === 'listar' ? 'active' : ''}" href="/html/pecas/listarPeca.html">Listar Peças</a>
            </li>
            <li class="nav-item">
                <a class="nav-link ${paginaAtual === 'consultar' ? 'active' : ''}" href="/html/pecas/consultarPeca.html">Consultar Peça</a>
            </li>
        `
    } else {
        navItems += `
            <li class="nav-item">
                <a class="nav-link ${paginaAtual === 'login' ? 'active' : ''}" href="/html/index.html">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link ${paginaAtual === 'registro' ? 'active' : ''}" href="/html/usuario/cadUsuario.html">Criar Conta</a>
            </li>
        `
    }

    const userInfo = usuario ? `
        <div class="d-flex align-items-center gap-3">
            <span class="navbar-text text-light">
                <i class="bi bi-person-circle me-1"></i> ${usuario.nome} (${usuario.tipoUsuario.toUpperCase()})
            </span>
            <button class="btn btn-outline-light btn-sm" onclick="realizarLogout()">Sair</button>
        </div>
    ` : ''

    navbarContainer.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
            <div class="container">
                <a class="navbar-brand fw-bold" href="#">
                    <i class="bi bi-cpu me-2"></i>Indústria 4.0
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        ${navItems}
                    </ul>
                    ${userInfo}
                </div>
            </div>
        </nav>
    `
}
