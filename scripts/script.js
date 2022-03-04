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
    return container;
};

const getRepos = async () => {
    clearRes();

    const url = `https://api.github.com/users/${user.value}/repos`;
    const response = await fetch(url);
    const data = await response.json();
    showRepos(data);
};

const showRepos = (repositories) => {
    const container = document.createElement('div');
    container.classList.add('github__info', 'repositories');
    container.innerHTML = `   
    <div class="btn-close" onclick=showInfos(data)>
        <i class="fa-solid fa-square-xmark"></i>
    </div>`;

    const infosContainer = document.createElement('div');
    infosContainer.classList.add('infos__container');

    repositories.forEach((repository) => {
        const repositoryElement = document.createElement('div');
        repositoryElement.classList.add('infos__item', 'repository');
        if (!!repository.description) {
            repositoryElement.innerHTML = `
            <h1 class="repositories__title">${repository.name}</h1>
            <p class="repositories__description">${repository.description}</p>
            <div class="repositories__link>
            <a href="${repository.html_url}" target="_blank">See on Github</a>
            </div>
            `;
        } else {
            repositoryElement.innerHTML = `
            <h1 class="repositories__title">${repository.name}</h1>
            <p class="repositories__description">Without description</p>
            <div class="repositories__link>
            <a href="${repository.html_url}" target="_blank">See on Github</a>
            </div>
            `;
        }

        infosContainer.appendChild(repositoryElement);
    });

    container.appendChild(infosContainer);
    res.appendChild(container);
};

const getFollowers = async () => {
    clearRes();

    const url = `https://api.github.com/users/${user.value}/followers`;
    const response = await fetch(url);
    const data = await response.json();
    showFollowers(data);
};

const showFollowers = (data) => {
    const container = document.createElement('div');
    container.classList.add('github__info', 'followers');
    container.innerHTML = `   
    <div class="btn-close" onclick=showInfos(data)>
        <i class="fa-solid fa-square-xmark"></i>
    </div>`;

    const infosContainer = document.createElement('div');
    infosContainer.classList.add('infos__container');

    data.forEach((follower) => {
        const followersElement = document.createElement('div');
        followersElement.classList.add('infos__item', 'followers');
        followersElement.innerHTML = `
        <div class="follower__avatar">
            <img src="${follower.avatar_url}" alt=""/>
        </div>
        <div class="follower__name">${follower.login}</div>
        <div class="follower__profile">
        <a href="${follower.html_url}" target="_blank">
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        </div>
        `;
        infosContainer.appendChild(followersElement);
    });

    container.appendChild(infosContainer);
    res.appendChild(container);
};

const getInfos = async (event) => {
    event.preventDefault();

    const url = `https://api.github.com/users/${user.value}`;
    const response = await fetch(url);

    if (response.status == 404) {
        res.innerHTML = 'User not found!'
        return;
    }

    const { name, bio, public_repos, followers, following, avatar_url } =
        await response.json();
    data = {
        name: name,
        bio: bio,
        repositories: public_repos,
        followers: followers,
        followings: following,
        avatar: avatar_url,
    };

    if(!data.name) {
        res.innerHTML = 'User not found!'
        return
    }

    handleContainer();
    showInfos(data);
};

const showInfos = (data) => {
    clearRes();
    const container = document.createElement('div');
    container.classList.add('github__info');
    if (!!data.bio) {
        container.innerHTML = `
    <div class="btn-close" onclick='returnHome()'>
    <i class="fa-solid fa-square-xmark"></i>
    </div>
    <div class="github__avatar">
    <img src="${data.avatar}" alt="">
    </div>
    <h1 class="github__username">${data.name}</h1>
    <div class="github__bio">
    <h2 class="github__bio__title">Bio</h2>
    <p class="github__bio__description">${data.bio}.</p>
    </div>
    <div class="github__statistics">
    <div class="github__statistic" onclick="getRepos()">
    <span class="github__statistic__item">${data.repositories}</span>
    <span>Repositories</span>
    </div>
    <div class="github__statistic" onclick="getFollowers()">
    <span class="github__statistic__item">${data.followers}</span>
    <span>Followers</span>
    </div>
    <div class="github__statistic" onclick="getFollowing()">
    <span class="github__statistic__item">${data.followings}</span>
    <span>Followed</span>
    </div>
    </div>`;
    } else {
        container.innerHTML = `
    <div class="btn-close" onclick='returnHome()'>
    <i class="fa-solid fa-square-xmark"></i>
    </div>
    <div class="github__avatar">
    <img src="${data.avatar}" alt="">
    </div>
    <h1 class="github__username">${data.name}</h1>
    <div class="github__bio">
    <h2 class="github__bio__title">Bio</h2>
    <p class="github__bio__description">Without bio.</p>
    </div>
    <div class="github__statistics">
    <div class="github__statistic" onclick="getRepos()">
    <span class="github__statistic__item">${data.repositories}</span>
    <span>Repositórios</span>
    </div>
    <div class="github__statistic" onclick="getFollowers()">
    <span class="github__statistic__item">${data.followers}</span>
    <span>Seguidores</span>
    </div>
    <div class="github__statistic" onclick="getFollowing()">
    <span class="github__statistic__item">${data.followings}</span>
    <span>Seguindo</span>
    </div>
    </div>`;
    }
    res.appendChild(container);
};

const getFollowing = async () => {
    clearRes();
    const url = `https://api.github.com/users/${user.value}/following`;
    const response = await fetch(url);
    const data = await response.json();
    showFollowing(data);
};

const showFollowing = (data) => {
    const container = document.createElement('div');
    container.classList.add('github__info', 'following');
    container.innerHTML = `   
    <div class="btn-close" onclick=showInfos(data)>
        <i class="fa-solid fa-square-xmark"></i>
    </div>`;

    const infosContainer = document.createElement('div');
    infosContainer.classList.add('infos__container');

    data.forEach((following) => {
        const followingElement = document.createElement('div');
        followingElement.classList.add('infos__item', 'followers');
        followingElement.innerHTML = `
        <div class="follower__avatar">
            <img src="${following.avatar_url}" alt=""/>
        </div>
        <div class="follower__name">${following.login}</div>
        <div class="follower__profile">
        <a href="${following.html_url}" target="_blank">
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        </div>
        `;
        infosContainer.appendChild(followingElement);
    });

    container.appendChild(infosContainer);
    res.appendChild(container);
};

const clearRes = () => {
    res.innerHTML = '';
};

const handleContainer = () => {
    clearRes();
    containerSearch.classList.toggle('off');
};

const returnHome = () => {
    clearRes();
    containerSearch.classList.toggle('off');
    user.value = '';
};
