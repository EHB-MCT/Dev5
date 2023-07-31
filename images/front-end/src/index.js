
async function getValorantAgents(){
    const response = await fetch("https://valorant-api.com/v1/agents");
    const data = await response.json();
    const agents = data.data.filter(agent => agent.isPlayableCharacter);

    agents.forEach(agent => {
        document.getElementById("agent").insertAdjacentHTML("afterend", 
        `<h2>${agent.displayName}</h2>
        <p>Role: ${agent.role.displayName}</p>
        <img src="${agent.fullPortrait}" alt="" style="max-height: 100px">
        <p>Description: ${agent.description}</p>`
        );
    });
}

// Function to fetch the API data and display weapons and skins
async function fetchAndDisplayWeapons() {
    const apiUrl = "https://valorant-api.com/v1/weapons";
    const excludedSkins = ["Random Favorite Skin", "Standard"];
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const weapons = data.data;
  
      const weaponsContainer = document.getElementById("weapons");
  
      weapons.forEach(weapon => {
        const excludedSkinNames = new Set(excludedSkins.map(skin => skin.toLowerCase()));
        const filteredSkins = weapon.skins.filter(skin => !excludedSkinNames.has(skin.displayName.toLowerCase()));
  
        const weaponDiv = document.createElement("div");
        weaponDiv.innerHTML = `
        <h2>${weapon.displayName}</h2>
        <p>Category: ${weapon.category}</p>
        <img src="${weapon.displayIcon}" alt="" style="max-height: 100px">
        <h3>Skins:</h3>
        <ul>
          ${filteredSkins.map(skin => `
          <li>${skin.displayName}</li>
          <img src="${skin.displayIcon}" alt="" style="max-height: 100px">
          `).join("")}
        </ul>
        <hr>
      `;
        weaponsContainer.appendChild(weaponDiv);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  // Call the function to fetch and display weapons and skins when the page loads
  fetchAndDisplayWeapons();
  

getValorantAgents();

