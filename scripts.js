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
            fetchGames();
        } else {
            message.textContent = 'Invalid key. Please try again.';
        }
    });

    const gameList = document.getElementById('game-list');
    const searchBar = document.getElementById('search-bar');
    const categoryItems = document.querySelectorAll('#categories li');
    const gameDisplay = document.getElementById('game-display');
    const gameFrameContainer = document.getElementById('game-frame-container');
    const closeGame = document.getElementById('close-game');
    let games = [
        {
            title: 'Papa\'s Sushiria',
            category: 'Strategy',
            imageUrl: 'https://via.placeholder.com/150',
            gameUrl: 'http://i.notdoppler.com/files/papassushiria.swf'
        }
        // Add more games here
    ];

    function displayGames(games) {
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
        gameFrameContainer.innerHTML = `
            <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="100%" height="100%">
                <param name="movie" value="${url}">
                <param name="allownetworking" value="internal">
                <param name="quality" value="high">
                <param name="menu" value="true">
                <embed width="100%" height="100%" src="${url}" allownetworking="internal" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"></embed>
            </object>
        `;
        gameDisplay.style.display = 'flex';
    }

    closeGame.addEventListener('click', () => {
        gameFrameContainer.innerHTML = '';
        gameDisplay.style.display = 'none';
    });

    searchBar.addEventListener('input', () => filterGames(games));

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            filterGames(games);
        });
    });

    displayGames(games);
});