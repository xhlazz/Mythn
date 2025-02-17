document.addEventListener('DOMContentLoaded', () => {
    const keys = ['ElderOwnerKey', 'JesusFriendMeme'];
    const keyInput = document.getElementById('key-input');
    const submitKey = document.getElementById('submit-key');
    const message = document.getElementById('message');
    const keyEntryContainer = document.getElementById('key-entry-container');
    const mainContent = document.getElementById('main-content');

    // Validate the entered key
    submitKey.addEventListener('click', () => {
        const enteredKey = keyInput.value.trim();
        if (keys.includes(enteredKey)) {
            message.textContent = "Welcome Elder's friends!";
            keyEntryContainer.style.display = 'none';
            mainContent.style.display = 'block';
            displayGames();
        } else {
            message.textContent = 'Invalid key. Please try again.';
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
            title: "Action Game",
            category: "Action",
            imageUrl: "https://img.gamemonetize.com/clv3nosn3zr04fn92j8oa70q18nqpkbe/512x340.jpg",
            gameUrl: "https://html5.gamemonetize.co/clv3nosn3zr04fn92j8oa70q18nqpkbe/"
        }
    ];

    function displayGames() {
        gameList.innerHTML = '';
        games.forEach(game => {
            const gameItem = document.createElement('div');
            gameItem.classList.add('game-item');
            gameItem.innerHTML = `
                <img src="${game.imageUrl}" alt="${game.title}">
                <h3>${game.title}</h3>
                <p>Category: ${game.category}</p>
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
            const matchesCategory = selectedCategory === 'all' || game.category.toLowerCase().includes(selectedCategory);
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

    searchBar.addEventListener('input', () => filterGames());

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            filterGames();
        });
    });

    displayGames();
});