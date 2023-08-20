
//Fetches the agents from the valorant api and displays them
async function getValorantAgents() {
  //Fetch the valorant api
  const response = await fetch("https://valorant-api.com/v1/agents");
  const data = await response.json();
  const agents = data.data.filter(agent => agent.isPlayableCharacter);

  //Get the target containers
  const agentIconsContainer = document.getElementById("agentIcons");
  const agentContainer = document.getElementById("agentContainer");

  //Loops over the data from the api
  agents.forEach(agent => {

    //Display the Icons
    agentIconsContainer.insertAdjacentHTML("afterbegin", 
      `<div class="icon" id="${agent.displayName}-icon">
        <img src="${agent.displayIcon}" alt="">
      </div>`);

    //Display the Info
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

    //Create icon const to save the selected agent
    const icon = document.getElementById(`${agent.displayName}-icon`);

    //Create agentDetails const to display the correct data
    const agentDetails = document.getElementById(`${agent.displayName}-agent`);

    //Checks the selected icon and display the correct agentinfo
    icon.addEventListener("click", () => {
      //Hide all agent details
      const allAgentDetails = document.querySelectorAll(".agent");
      allAgentDetails.forEach(detail => {
        detail.style.display = "none";
      });

      //Show the selected agent's details
      agentDetails.style.display = "flex";
    });
  });
}

getValorantAgents();



