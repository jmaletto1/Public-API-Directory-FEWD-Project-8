const apiUrl = "https://randomuser.me/api/?results=12";
let userData = [];
const userContainer = document.querySelector(".employee__container");

fetch(apiUrl)
  .then((res) => res.json())
  .then((data) => (userData = data.results))
  .then((data) => {
    userData.push(data.results);
    console.log(userData);
    userData.map((user) => callEmail(user));
  })
  .catch((error) => console.log("There's been an error!", error));

const callEmail = (data) => {
  const userCard = `
    <div class="user__card">
        <div>
            <img src="${data.picture.medium}">
        </div>
        <div>
        <h2>${data.name.first} ${data.name.last}</h2>
        </div>
        <div>
            <p>${data.email}</p>
            <p>${data.location.city} </p>
        </div>
    </div>
  `;
  userContainer.insertAdjacentHTML("beforeend", userCard);
};
