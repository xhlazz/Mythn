document.addEventListener('DOMContentLoaded', () => {
    const clubInfo = document.getElementById('club-info');
    const membersInfo = document.getElementById('members-info');

    async function fetchClubData() {
        try {
            const response = await fetch('/api/club');
            const data = await response.json();

            clubInfo.innerHTML = `
                <h2>Club Name: ${data.name}</h2>
                <p>Club Description: ${data.description}</p>
                <p>Members Count: ${data.members.length}</p>
            `;

            membersInfo.innerHTML = '<h3>Members:</h3>';
            data.members.forEach(member => {
                membersInfo.innerHTML += `
                    <div class="member">
                        <p>Name: ${member.name}</p>
                        <p>Trophies: ${member.trophies}</p>
                    </div>
                `;
            });
        } catch (error) {
            console.error('Error fetching club data:', error);
        }
    }

    fetchClubData();
    setInterval(fetchClubData, 60000); // Update data every 60 seconds
});
