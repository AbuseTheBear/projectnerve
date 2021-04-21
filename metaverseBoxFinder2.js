const icons = {
  "1200769":
    "https://cdn.glitch.com/ef668cb9-778b-4910-8af9-55fecb88da82%2FRoblox_player_icon_black.svg",
  "4199740":
    "https://cdn.glitch.com/ef668cb9-778b-4910-8af9-55fecb88da82%2Fstar_black_24dp.svg",
  dev:
    "https://cdn.glitch.com/3fea768e-991e-4ba9-86b6-d8defa18c1e9%2FHammer_icon.svg"
};

window.addEventListener("DOMContentLoaded", async event => {
  let presenceContainer = document.getElementsByClassName("inner")[0];

  let statusRequest = await fetch("getOnline");
  let groupStatuses = await statusRequest.json();
  let foundOne = false;
  for (let groupId in groupStatuses) {
    let statuses = groupStatuses[groupId];
    for (let statusKey in statuses) {
      let status = statuses[statusKey];
      if (status.placeId == 6674394294) {
        /*
        <div class="presence">
          <img
            class="presenceThumbnail"
            src="https://tr.rbxcdn.com/f3ddc1322d0ad5890cb7858c1a45f82b/150/150/AvatarHeadshot/Png"
          />
          <img
            class="presenceMarker"
            src="https://cdn.glitch.com/ef668cb9-778b-4910-8af9-55fecb88da82%2FRoblox_player_icon_black.svg"
          />
          <div class="presenceUsername">
            localhost_ip
          </div>
          <button class="presenceButton">
            Profile
          </button>
        </div>
      */
        if (!foundOne) {
          foundOne = true;
        }

        let presenceElement = document.createElement("div");
        presenceElement.classList.add("presence");

        let presenceThumbnailElement = document.createElement("img");
        presenceThumbnailElement.classList.add("presenceThumbnail");
        presenceThumbnailElement.src = status.user.thumbnail;

        let presenceMarkerElement = document.createElement("img");
        presenceMarkerElement.classList.add("presenceMarker");
        presenceMarkerElement.src = icons[groupId];

        let presenceUsernameElement = document.createElement("div");
        presenceUsernameElement.classList.add("presenceUsername");
        presenceUsernameElement.innerHTML = status.user.name;

        let presenceButtonElement = document.createElement("button");
        presenceButtonElement.classList.add("presenceButton");
        presenceButtonElement.innerHTML = "Profile";
        presenceButtonElement.onclick = function() {
          window.location.href =
            "https://www.roblox.com/users/" + status.user.userId + "/profile";
        };

        presenceElement.appendChild(presenceThumbnailElement);
        presenceElement.appendChild(presenceMarkerElement);
        presenceElement.appendChild(presenceUsernameElement);
        presenceElement.appendChild(presenceButtonElement);

        presenceContainer.appendChild(presenceElement);
      }
    }
  }
  if (!foundOne) {
    presenceContainer.innerHTML = "No users found."
  }
});
