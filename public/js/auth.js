// Autenticação e Utilitários

function obterCaminho(caminho) {
    if (!caminho) return ''
    const pathname = window.location.pathname
    const temPublic = pathname.startsWith('/public/') || pathname.includes('/public/html/')
    if (temPublic && !caminho.startsWith('/public')) {
        return '/public' + caminho
    }
    return caminho
}

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
        window.location.href = obterCaminho('/html/index.html')
    }
}

function exigiAdm() {
    exigiAutenticacao()
    const usuario = obterUsuarioLogado()
    if (!usuario || usuario.tipoUsuario !== 'adm') {
        alert('Acesso negado. Esta página é exclusiva para Administradores.')
        window.location.href = obterCaminho('/html/pecas/listarPeca.html')
    }
}

function realizarLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    window.location.href = obterCaminho('/html/index.html')
}

function renderizarNavbar(paginaAtual = '') {
    const usuario = obterUsuarioLogado()
    const isAdm = usuario && usuario.tipoUsuario === 'adm'

    const navbarContainer = document.getElementById('navbar-container')
    if (!navbarContainer) return

    let navItems = ''

    if (usuario) {
        const paginasCrud = ['cadPeca', 'attPeca', 'delPeca', 'listar', 'consultar']
        const isCrudActive = paginasCrud.includes(paginaAtual)

        if (isAdm) {
            navItems += `
                <li class="nav-item">
                    <a class="nav-link ${paginaAtual === 'dashboard' ? 'active' : ''}" href="${obterCaminho('/html/pecas/dashboard.html')}">Dashboard</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ${paginaAtual === 'cadAdm' ? 'active' : ''}" href="${obterCaminho('/html/usuario/cadAdm.html')}">Cadastrar ADM</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle ${isCrudActive ? 'active' : ''}" href="#" id="crudDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        CRUD Peças
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="crudDropdown">
                        <li><a class="dropdown-item ${paginaAtual === 'cadPeca' ? 'active' : ''}" href="${obterCaminho('/html/pecas/cadPeca.html')}">Cadastrar Peça</a></li>
                        <li><a class="dropdown-item ${paginaAtual === 'listar' ? 'active' : ''}" href="${obterCaminho('/html/pecas/listarPeca.html')}">Listar Peças</a></li>
                        <li><a class="dropdown-item ${paginaAtual === 'consultar' ? 'active' : ''}" href="${obterCaminho('/html/pecas/consultarPeca.html')}">Consultar Peça</a></li>
                        <li><a class="dropdown-item ${paginaAtual === 'attPeca' ? 'active' : ''}" href="${obterCaminho('/html/pecas/attPeca.html')}">Atualizar Peça</a></li>
                        <li><a class="dropdown-item ${paginaAtual === 'delPeca' ? 'active' : ''}" href="${obterCaminho('/html/pecas/delPeca.html')}">Excluir Peça</a></li>
                    </ul>
                </li>
            `
        } else {
            navItems += `
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle ${isCrudActive ? 'active' : ''}" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Peças
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="userDropdown">
                        <li><a class="dropdown-item ${paginaAtual === 'listar' ? 'active' : ''}" href="${obterCaminho('/html/pecas/listarPeca.html')}">Listar Peças</a></li>
                        <li><a class="dropdown-item ${paginaAtual === 'consultar' ? 'active' : ''}" href="${obterCaminho('/html/pecas/consultarPeca.html')}">Consultar Peça</a></li>
                    </ul>
                </li>
            `
        }
    } else {
        navItems += `
            <li class="nav-item">
                <a class="nav-link ${paginaAtual === 'login' ? 'active' : ''}" href="${obterCaminho('/html/index.html')}">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link ${paginaAtual === 'registro' ? 'active' : ''}" href="${obterCaminho('/html/usuario/cadUsuario.html')}">Criar Conta</a>
            </li>
        `
    }

    const userInfo = usuario ? `
        <div class="d-flex align-items-center gap-3">
            <span class="navbar-text text-light">
                ${usuario.nome} (${usuario.tipoUsuario.toUpperCase()})
            </span>
            <button class="btn btn-outline-light btn-sm" onclick="realizarLogout()">Sair</button>
        </div>
    ` : ''

    let brandHref = obterCaminho('/html/index.html')
    if (usuario) {
        if (isAdm) {
            brandHref = obterCaminho('/html/pecas/dashboard.html')
        } else {
            brandHref = obterCaminho('/html/pecas/listarPeca.html')
        }
    }

    navbarContainer.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom mb-4" data-bs-theme="dark">
            <div class="container">
                <a class="navbar-brand fw-bold" href="${brandHref}">
                    Indústria 4.0
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        ${navItems}
                    </ul>
                    ${userInfo}
                </div>
            </div>
        </nav>
    `
}
