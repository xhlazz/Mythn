fetch('/.netlify/functions/fetchClub')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('club-name').innerText = data.name;  // Example usage
    })
    .catch(error => console.error("Error fetching club data:", error));
