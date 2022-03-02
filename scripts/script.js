const res = document.querySelector('.res');
const user = document.querySelector('#username');
const containerSearch = document.querySelector('.container__title');

const showInfos = (name, repos, followers, following, avatar) => {
    const container = document.createElement('div');
    container.classList.add('github__info');
    container.innerHTML = `
    <div class="btn-close" onclick='handleContainer()'>
                        <i class="fa-solid fa-square-xmark"></i>
                    </div>
    <div class="github__avatar">
                    <img src="${avatar}" alt="">
                    </div>
                    <h1 class="github__username">${name}</h1>
                    <div class="github__stats">
                    <div class="github__stat">
                    <span class="n__">${repos}</span>
                    <span>Repositórios</span>
                    </div>
                    <div class="github__stat">
                    <span class="n__">${followers}</span>
                    <span>Seguidores</span>
                    </div>
                    <div class="github__stat">
                    <span class="n__">${following}</span>
                    <span>Seguindo</span>
                    </div>
                    </div>`;
    res.appendChild(container);
};

const clearRes = () => {
    res.innerHTML = '';
};

const handleContainer = () => {
    clearRes();
    containerSearch.classList.toggle('off');
};

const getInfos = async (event) => {
    event.preventDefault();
    clearRes();
    handleContainer();
    if (!!user.value) {
        const url = `https://api.github.com/users/${user.value}`;
        const response = await fetch(url);
        const data = await response.json();
        showInfos(
            data.name,
            data.public_repos,
            data.followers,
            data.following,
            data.avatar_url
        );

        return;
    }
    // alert('Digite um nome de usuário')
};
