async function getWeapons() {
    const response = await fetch("https://valorant-api.com/v1/weapons");
    const data = await response.json();
    const weapons = data.data;

    const excludedSkins = ["Random Favorite Skin"];

    const weaponsContainer = document.getElementById("weaponContainer");
    const weaponIconsContainer = document.getElementById("weaponIcons");

    weapons.forEach(weapon => {
        const excludedSkinNames = new Set(excludedSkins.map(skin => skin.toLowerCase()));
        const filteredSkins = weapon.skins.filter(skin => {
            const isExcluded = excludedSkinNames.has(skin.displayName.toLowerCase());
            const hasDisplayIcon = !!skin.displayIcon;
            return !isExcluded && hasDisplayIcon;
        });

        weaponIconsContainer.insertAdjacentHTML("afterbegin",
        `<div class="icon" id="${weapon.displayName}-icon">
        <img src="${weapon.displayIcon}" alt="">
        </div>`);

        weaponsContainer.insertAdjacentHTML("afterbegin", 
        `<div class="weapon" id="${weapon.displayName}-weapon" style="display: none;">
            <h3>${weapon.displayName}</h3>
            <div id="skins">
                ${filteredSkins.map(skin => `
                <div id="skin">
                    <h4>${skin.displayName}</h4>
                    <img src="${skin.displayIcon}" alt="" style="max-height: 100px">
                </div>
                `).join("")}
            </div>
        </div>`);

        const icon = document.getElementById(`${weapon.displayName}-icon`);
        const weaponDetails = document.getElementById(`${weapon.displayName}-weapon`);

        icon.addEventListener("click", () => {
        // Hide all agent details
        const allAgentDetails = document.querySelectorAll(".weapon");
        allAgentDetails.forEach(detail => {
            detail.style.display = "none";
        });

        // Show the selected agent's details
        weaponDetails.style.display = "flex";
    });
    });
}

// Call the function to fetch and display weapons and skins when the page loads
getWeapons();