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
          <p> <img id="roleIcon" src="${agent.role.displayIcon}" alt=""> ${agent.role.displayName}</p>
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
getValorantAgents();



