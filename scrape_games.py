import requests
from bs4 import BeautifulSoup

def fetch_games():
    url = 'https://example.com/games'  # Replace with the actual URL
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    games = []
    for game_item in soup.select('.game-item'):
        title = game_item.select_one('.game-title').text
        category = game_item.select_one('.game-category').text
        image_url = game_item.select_one('img')['src']
        games.append({
            'title': title,
            'category': category,
            'imageUrl': image_url
        })

    return games

if __name__ == '__main__':
    games = fetch_games()
    print(games)