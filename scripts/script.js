const user = document.querySelector('#username');
const res = document.querySelector('.res');
const containerSearch = document.querySelector('.container__title');
let data;

const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('github__info');
    container.innerHTML = `   
    <div class="btn-close" onclick=showInfos(data)>
        <i class="fa-solid fa-square-xmark"></i>
    </div>`;
    return container
}

const getInfos = async (event) => {
    event.preventDefault();
    try {
        if (!!user.value) {
            handleContainer();
            const url = `https://api.github.com/users/${user.value}`;
            const response = await fetch(url);
            const { name, public_repos, followers, following, avatar_url } =
                await response.json();
            data = {
                name: name,
                repositories: public_repos,
                followers: followers,
                followings: following,
                avatar: avatar_url,
            };

            showInfos(data);

            return;
        }
    } catch (error) {
        console.log(error);
    }
};

const getRepos = async () => {
    clearRes();
    try {
        const url = `https://api.github.com/users/${user.value}/repos`;
        const response = await fetch(url);
        const data = await response.json();
        showRepos(data);
    } catch (error) {
        console.log(error);
    }
};

const showRepos = (repositories) => {
    console.log(repositories);
    const container = document.createElement('div');
    container.classList.add('github__info');
    container.innerHTML = `   
    <div class="btn-close" onclick=showInfos(data)>
        <i class="fa-solid fa-square-xmark"></i>
    </div>`;

    const infosContainer = document.createElement('div');
    infosContainer.classList.add('infos__container');

    repositories.forEach((repository) => {
        const repositoryElement = document.createElement('div');
        repositoryElement.classList.add('infos__item');
        repositoryElement.innerHTML = `
        <h1 class="repositories__title">${repository.name}</h1>
            <p class="repositories__description">${repository.description}</p>
        <a href="${repository.html_url}" class="repositories__link" target="_blank">See on Github</a>
        `;

        infosContainer.appendChild(repositoryElement);
    });

    container.appendChild(infosContainer);
    res.appendChild(container);
};

const getFollowers = async () => {
    clearRes();
    try {
        const url = `https://api.github.com/users/${user.value}/followers`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        showFollowers()
    } catch (error) {
        console.log(error);
    }
};

const showFollowers = () => {
    const container = document.createElement('div');
    container.classList.add('github__info');
    container.innerHTML = `   
    <div class="btn-close" onclick=showInfos(data)>
        <i class="fa-solid fa-square-xmark"></i>
    </div>`;

    const infosContainer = document.createElement('div');
    infosContainer.classList.add('infos__container');

    container.appendChild(infosContainer);
    res.appendChild(container);
}

const showInfos = (data) => {
    clearRes();
    const container = document.createElement('div');
    container.classList.add('github__info');
    container.innerHTML = `
    <div class="btn-close" onclick='handleContainer()'>
        <i class="fa-solid fa-square-xmark"></i>
    </div>
    <div class="github__avatar">
        <img src="${data.avatar}" alt="">
    </div>
        <h1 class="github__username">${data.name}</h1>
    <div class="github__statistics">
        <div class="github__statistic" onclick="getRepos()">
            <span class="github__statistic__item">${data.repositories}</span>
            <span>Repositórios</span>
        </div>
    <div class="github__statistic" onclick="getFollowers()">
        <span class="github__statistic__item">${data.followers}</span>
        <span>Seguidores</span>
    </div>
    <div class="github__statistic">
        <span class="github__statistic__item">${data.followings}</span>
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
