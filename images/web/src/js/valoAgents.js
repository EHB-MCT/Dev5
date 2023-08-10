async function getValorantAgents() {
  const response = await fetch("https://valorant-api.com/v1/agents");
  const data = await response.json();
  const agents = data.data.filter(agent => agent.isPlayableCharacter);

  const agentIconsContainer = document.getElementById("agentIcons");
  const agentContainer = document.getElementById("agentContainer");

  agents.forEach(agent => {
    agentIconsContainer.insertAdjacentHTML("afterbegin", 
      `<div class="icon" id="${agent.displayName}-icon">
        <img src="${agent.displayIcon}" alt="">
      </div>`);

    agentContainer.insertAdjacentHTML("afterbegin", 
      `<div class="agent" id="${agent.displayName}-agent" style="display: none;">
        <img id="agentImage" src="${agent.fullPortrait}" alt="">
        <div id="agentInfo">
          <h3>${agent.displayName}</h3>
          <br>
          <h4>Role:</h4>
          <p> <img src="${agent.role.displayIcon}" alt=""> ${agent.role.displayName}</p>
          <br>
          <h4>Description:</h4>
          <p>${agent.description}</p>
        </div>
      </div>`);

    const icon = document.getElementById(`${agent.displayName}-icon`);
    const agentDetails = document.getElementById(`${agent.displayName}-agent`);

    icon.addEventListener("click", () => {
      // Hide all agent details
      const allAgentDetails = document.querySelectorAll(".agent");
      allAgentDetails.forEach(detail => {
        detail.style.display = "none";
      });

      // Show the selected agent's details
      agentDetails.style.display = "flex";
    });
  });
}


// Function to fetch the API data and display weapons and skins
/* async function fetchAndDisplayWeapons() {
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
          <div>
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
          </div>
          `;
        weaponsContainer.appendChild(weaponDiv);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  // Call the function to fetch and display weapons and skins when the page loads
  fetchAndDisplayWeapons(); */
  

getValorantAgents();

