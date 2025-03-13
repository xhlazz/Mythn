fetch('https://your-site.netlify.app/.netlify/functions/fetchClubData')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    displayClubData(data); // Update the UI
  })
  .catch(error => console.error('Error fetching club data:', error));
