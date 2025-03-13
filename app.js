// Your club tag (URL encoded) and API Key
const clubTag = "%23J2CL82CU"; // Club tag for your club
const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjA1MTQyZjQzLTU1ZTktNDg1Yy1iN2ExLTI4MzY3YWI0ZjNjNiIsImlhdCI6MTc0MTgzNDI0MSwic3ViIjoiZGV2ZWxvcGVyLzJiOWI2YWQ2LTYxMGQtZWJjNS1iNWFmLTYxMTZlYjI2OTQ5MiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMC4wLjAuMCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.GQrjILi2OhGsU8MfGp7ymOWUM08ZwLOYKmIvl40j4MUybQYpcRFbR-Cu1d6l6yQNo-Xzv0UEW1rLpphtgA5LjQ"; // Your actual API token

// The URL for the Brawl Stars API
const apiUrl = `https://api.brawlstars.com/v1/clubs/${clubTag}`;

fetch(apiUrl, {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${apiKey}`
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    displayClubData(data);
  })
  .catch(error => console.error('Error fetching club data:', error));

function displayClubData(data) {
  // Display club name
  document.getElementById("club-name").textContent = data.name || "Unknown Club";
  
  // Display club trophies
  document.getElementById("trophies").textContent = `Trophies: ${data.trophies || "N/A"}`;
  
  // Display the list of members
  let membersHtml = "";
  data.members.forEach(member => {
    membersHtml += `
      <div class="member-card">
        <img src="${member.brawler.icon.url}" alt="${member.name}" class="member-icon">
        <div class="member-info">
          <h3>${member.name}</h3>
          <p>Trophies: ${member.trophies}</p>
        </div>
      </div>
    `;
  });

  document.getElementById("members-list").innerHTML = membersHtml;
}
