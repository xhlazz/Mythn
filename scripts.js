document.addEventListener('DOMContentLoaded', () => {
    const keys = {
        'ElderOwnerKey': '',
        'JesusFriendMeme': 'Jesus va jugar 24/7 no le crea profe!',
        'JustinTontinPelonin1': 'Leandro lo llevo en matematicas eh 👀'
    };

    const keyInput = document.getElementById('key-input');
    const submitKey = document.getElementById('submit-key');
    const message = document.getElementById('message');
    const invalidKeyImage = document.getElementById('invalid-key-image');
    const keyEntryContainer = document.getElementById('key-entry-container');
    const mainContent = document.getElementById('main-content');
    const backgroundVideo = document.getElementById('background-video');
    const stopVideoButton = document.getElementById('stop-video');

    // Stop the background video
    stopVideoButton.addEventListener('click', () => {
        backgroundVideo.pause();
        backgroundVideo.style.display = 'none';
    });

    // Validate the entered key
    submitKey.addEventListener('click', () => {
        const enteredKey = keyInput.value.trim();
        if (keys.hasOwnProperty(enteredKey)) {
            message.style.display = 'none';
            message.textContent = keys[enteredKey];
            if (message.textContent) {
                message.style.display = 'block';
            }
            invalidKeyImage.style.display = 'none';
            keyEntryContainer.style.display = 'none';
            mainContent.style.display = 'block';
            displayGames();
        } else {
            message.textContent = 'Invalid key. Please try again.';
            invalidKeyImage.style.display = 'block';
        }
    });

    const gameList = document.getElementById('game-list');
    const searchBar = document.getElementById('search-bar');
    const categoryItems = document.querySelectorAll('#categories li');
    const gameDisplay = document.getElementById('game-display');
    const gameFrame = document.getElementById('game-frame');
    const closeGame = document.getElementById('close-game');
    const games = [
        {
            title: "Shoot Some Fish",
            category: "Action",
            imageUrl: "https://img.gamemonetize.com/clv3nosn3zr04fn92j8oa70q18nqpkbe/512x340.jpg",
            gameUrl: "https://html5.gamemonetize.co/clv3nosn3zr04fn92j8oa70q18nqpkbe/",
            tags: ["Low Ad Rate"]
        },
        {
            title: "Mr Bullet 3D",
            category: "Action",
            imageUrl: "https://img.gamemonetize.com/lzyq41x2j1jkcuad1h07zo6uq8ymx7tj/512x512.jpg",
            gameUrl: "https://html5.gamemonetize.co/lzyq41x2j1jkcuad1h07zo6uq8ymx7tj/",
            tags: ["High Ad Rate"]
        },
        {
            title: "BasketBall Life 3D",
            category: "Sports",
            imageUrl: "https://img.gamemonetize.com/47s9m0brc0yi9uxuiox53uov9hoyy40n/512x384.jpg",
            gameUrl: "https://html5.gamemonetize.co/47s9m0brc0yi9uxuiox53uov9hoyy40n/",
            tags: ["Low Ad Rates"]
        },
        {
            title: "Roblox Simulator",
            category: "Simulator",
            imageUrl: "https://i.ytimg.com/vi/tjw27tNT0l4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCs1dQ6eIEL3xlxLip5EY7pqsQFOw",
            gameUrl: "https://now.gg/apps/a/19900/b.html",
            tags: []
        }
    ];

    function displayGames(filteredGames = games) {
        gameList.innerHTML = '';
        filteredGames.forEach(game => {
            const gameItem = document.createElement('div');
            gameItem.classList.add('game-item');
            gameItem.innerHTML = `
                <img src="${game.imageUrl}" alt="${game.title}">
                <h3>${game.title}</h3>
                <p>Category: ${game.category}</p>
                <p>Tags: ${game.tags.join(', ')}</p>
            `;
            gameItem.addEventListener('click', () => playGame(game.gameUrl));
            gameList.appendChild(gameItem);
        });
    }

    function filterGames() {
        const searchTerm = searchBar.value.toLowerCase();
        const selectedCategory = document.querySelector('#categories li.active')?.dataset.category || 'all';
        
        const filteredGames = games.filter(game => {
            const matchesSearch = game.title.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || game.category.toLowerCase() === selectedCategory;
            return matchesSearch && matchesCategory;
        });
        
        displayGames(filteredGames);
    }

    function playGame(url) {
        gameFrame.src = url;
        gameDisplay.style.display = 'flex';
    }

    closeGame.addEventListener('click', () => {
        gameFrame.src = '';
        gameDisplay.style.display = 'none';
    });

    searchBar.addEventListener('input', filterGames);

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            filterGames();
        });
    });

    displayGames();
});