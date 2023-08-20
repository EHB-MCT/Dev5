
//Fetches the weapons and skins from the valorant api and displays them
async function getWeapons() {
    //Fetch the valorant api
    const response = await fetch("https://valorant-api.com/v1/weapons");
    const data = await response.json();
    const weapons = data.data;

    //Exclude some skins
    const excludedSkins = ["Random Favorite Skin"];

    //Get the target containers
    const weaponsContainer = document.getElementById("weaponContainer");
    const weaponIconsContainer = document.getElementById("weaponIcons");

    //Loops over the data from the api
    weapons.forEach(weapon => {

        //Filter out some skins
        const excludedSkinNames = new Set(excludedSkins.map(skin => skin.toLowerCase()));
        const filteredSkins = weapon.skins.filter(skin => {
            const isExcluded = excludedSkinNames.has(skin.displayName.toLowerCase());
            const hasDisplayIcon = !!skin.displayIcon;
            return !isExcluded && hasDisplayIcon;
        });

        //Display the weapon icons
        weaponIconsContainer.insertAdjacentHTML("afterbegin",
        `<div class="icon" id="${weapon.displayName}-icon">
        <img src="${weapon.displayIcon}" alt="">
        </div>`);

        //Display the weapon skins
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

        //Create icon const to save the selected weapon
        const icon = document.getElementById(`${weapon.displayName}-icon`);

        //Create weaponDetails const to display the correct data
        const weaponDetails = document.getElementById(`${weapon.displayName}-weapon`);

        //Checks the selected icon and display the correct skins
        icon.addEventListener("click", () => {
        //Hide all agent details
        const allAgentDetails = document.querySelectorAll(".weapon");
        allAgentDetails.forEach(detail => {
            detail.style.display = "none";
        });

        //Show the selected agent's details
        weaponDetails.style.display = "flex";
    });
    });
}

getWeapons();