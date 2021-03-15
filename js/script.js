const apiUrl = "https://randomuser.me/api/?results=12";
let userData = [];
let currentUser = 0;
const userContainer = document.querySelector(".employee__container");

fetch(apiUrl)
  .then((res) => res.json())
  .then((data) => (userData = data.results))
  .then((data) => {
    userData.push(data.results);
    if (userData.length > 12) {
      userData.pop();
    }
    displayUsers(data);
  })
  .catch((error) => console.log("There's been an error!", error));

function displayUsers(data) {
  for (let x = 0; x < data.length; x++) {
    let userCard = `
    <div class="user__card" id="${x}">
        <div class="user__image">
            <img src="${data[x].picture.medium}">
        </div>
        <div>
        <h2>${data[x].name.first} ${data[x].name.last}</h2>
            <p>${data[x].email}</p>
            <p>${data[x].location.city} </p>
        </div>
    </div>
  `;
    userContainer.insertAdjacentHTML("beforeend", userCard);
  }
  const userCards = document.querySelectorAll(".user__card");
  userCards.forEach((item) => {
    item.addEventListener("click", (e) => {
      currentUser = e.target.closest("div.user__card").id;
      displayModalUser(currentUser, data);
    });
  });

  // Search Button Function
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("keyup", (e) => {
    let searchResults = [];
    let search = e.target.value.toLowerCase();
    if (search) {
      for (let x = 0; x < userData.length; x++) {
        const firstName = userData[x].name.first.toLowerCase();
        const lastName = userData[x].name.last.toLowerCase();

        if (firstName.includes(search) || lastName.includes(search)) {
          searchResults.push(userData[x]);
        }
      }
      if (searchResults) {
        $(userContainer).empty();
        displayUsers(searchResults);
      }
    } else {
      $(userContainer).empty();
      displayUsers(userData);
    }
  });
}

function displayModalUser(user, data) {
  currentUser = parseInt(currentUser);
  // Select the necessary DOM elements.
  const modalContainer = document.querySelector(".modal__container");
  const modalCloseButton = document.querySelector(".modal__close__button");
  const modalContainerUser = document.querySelector(".modal__container__user");

  // Close the modal window if the user clicks outside of it.
  window.onclick = function (e) {
    if (e.target == modalContainer) {
      modalContainer.style.display = "none";
    }
  };

  // Add listener to open the modal window

  modalContainer.style.display = "block";
  modalCloseButton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  // Display Modal Window user Data
  const modalUser = data[user];

  // Split the birthday into a usable format
  const modalDOB = modalUser.dob.date.split("T");

  const modalUserData = `
    <img src="${modalUser.picture.large}">
    <h2>${modalUser.name.first} ${modalUser.name.last}</h2>
    <p>${modalUser.email}</p>
    <p>${modalUser.location.state}</p>
    <div class="separator"></div>
    <p class="modal--p">${modalUser.phone}</p>
    <p class="modal--p">${modalUser.location.street.number} ${modalUser.location.street.name}
    <p class="modal--p">Birthday: ${modalDOB[0]}</p>
    <button id="prev-button" class="modal--button">Previous</button> <button id="next-button" class="modal--button">Next</button>
  `;
  modalContainerUser.innerHTML = modalUserData;

  // Modal User Scroll Buttons
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  prevButton.addEventListener("click", () => {
    if (currentUser === 0) {
      modalContainer.style.display = "none";
    } else {
      currentUser -= 1;
      displayModalUser(currentUser, data);
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentUser === data.length - 1) {
      modalContainer.style.display = "none";
    } else {
      currentUser += 1;
      displayModalUser(currentUser, data);
    }
  });
}
