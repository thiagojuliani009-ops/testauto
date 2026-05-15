class navbar {
    constructor(menuIcon, navLinks) {
        this.menuIcon = menuIcon;
        this.navLinks = navLinks;
    }
}

const API_BASE_URL = 'http://127.0.0.1:8000';
let authToken = '';

function logOutput(message) {
    const output = document.getElementById('api-output');
    if (!output) return;
    output.textContent = message;
}

async function apiRequest(path, options = {}) {
    const headers = options.headers ?? {};
    headers['Content-Type'] = 'application/json';
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
    });

    const data = await response.text();
    try {
        return { status: response.status, data: JSON.parse(data) };
    } catch {
        return { status: response.status, data };
    }
}

async function login() {
    const userId = document.getElementById('userId').value || '1';
    const { status, data } = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ user_id: parseInt(userId, 10) }),
    });

    if (status === 200 && data.access_token) {
        authToken = data.access_token;
        logOutput(`Login bem-sucedido. Token:
${data.access_token}`);
        document.getElementById('btnGetPosts').disabled = false;
        document.getElementById('btnCreatePost').disabled = false;
    } else {
        logOutput(`Erro no login (${status}):\n${JSON.stringify(data, null, 2)}`);
    }
}

async function getPosts() {
    const published = document.getElementById('publishedOnly').checked;
    const limit = parseInt(document.getElementById('limit').value, 10) || 10;
    const { status, data } = await apiRequest(`/post?published=${published}&limit=${limit}`);

    if (status === 200) {
        logOutput(JSON.stringify(data, null, 2));
    } else {
        logOutput(`Erro ao buscar posts (${status}):\n${JSON.stringify(data, null, 2)}`);
    }
}

async function createPost() {
    const title = document.getElementById('newTitle').value || 'Novo post via JS';
    const content = document.getElementById('newContent').value || 'Conteúdo gerado a partir do frontend.';
    const published = document.getElementById('newPublished').checked;

    const { status, data } = await apiRequest('/post', {
        method: 'POST',
        body: JSON.stringify({ title, content, published }),
    });

    if (status === 201) {
        logOutput(`Post criado com sucesso:\n${JSON.stringify(data, null, 2)}`);
    } else {
        logOutput(`Erro ao criar post (${status}):\n${JSON.stringify(data, null, 2)}`);
    }
}

addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const navBar = new navbar(menuIcon, navLinks);
    navBar.menuIcon.addEventListener('click', () => {
        navBar.navLinks.classList.toggle('active');
    });

    const btnLogin = document.getElementById('btnLogin');
    const btnGetPosts = document.getElementById('btnGetPosts');
    const btnCreatePost = document.getElementById('btnCreatePost');

    if (btnLogin) btnLogin.addEventListener('click', login);
    if (btnGetPosts) btnGetPosts.addEventListener('click', getPosts);
    if (btnCreatePost) btnCreatePost.addEventListener('click', createPost);
});

