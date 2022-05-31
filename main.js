import "./scss/main.scss";
import axios from "axios";
let url = `https://restcountries.com/v3.1/all`;

// Theme changer with local storage
let themeChangerBtn = document.querySelector("[data-themeSwitch]");
let container = document.body;
const dataTheme = localStorage.getItem("data-theme");
container.setAttribute("data-theme", "light");

themeChangerBtn.addEventListener("click", () => {
    let dataAttribute = container.getAttribute("data-theme");

    if (dataAttribute === "light") {
        container.setAttribute("data-theme", "dark");
        localStorage.setItem("data-theme", "dark");
    }
    if (dataAttribute === "dark") {
        container.setAttribute("data-theme", "light");
        localStorage.setItem("data-theme", "light");
    }
});

if (dataTheme === "dark") {
    container.setAttribute("data-theme", "dark");
} else if (dataTheme === "light") {
    container.setAttribute("data-theme", "light");
}

// Options List toggle

let FilterButton = document.querySelector("[data-optionsButton]");
let FilterButtonText = document.querySelector("[data-optionsButton] > span");
let optionsList = document.querySelector("[data-optionsList]");
let optionButtons = document.querySelectorAll(
    "[data-optionsList] > li > button"
);

FilterButton.addEventListener("click", () => {
    optionsList.classList.toggle("opened");
});

console.log(optionButtons);

optionButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        optionsList.classList.toggle("opened");

        if(e.target.innerText === 'Reset'){
            FilterButtonText.innerText = 'Filter by region'
            axios({
                method: "get",
                url: url,
            }).then((response) => {
                populateData(response.data);
            });
        }else{
            
            FilterButtonText.innerText = e.target.innerText
            
            axios({
                method: "get",
                url: `https://restcountries.com/v3.1/region/${e.target.innerText}`,
            }).then((response) => {
                populateData(response.data);
            });
            
        }
    });
});

// Populate data
function populateData(data) {
    let content = document.querySelector("[data-content]");
    content.innerHTML = "";
    console.log(data);

    for (let i = 0; i <= data.length; i++) {
        let r = i;
        let card = document.createElement("a");
        card.classList.add("card");

        let cardImgContainer = document.createElement("div");
        cardImgContainer.classList.add("cardImage");

        let cardImg = document.createElement("img");

        let cardInfo = document.createElement("div");
        cardInfo.classList.add("cardInformation");

        let countryName = document.createElement("h2");
        let Population = document.createElement("p");
        let Region = document.createElement("p");
        let Capital = document.createElement("p");
        let capitalName =
            data[r].hasOwnProperty("capital") === true
                ? data[r].capital[0]
                : "none";

        countryName.innerText = data[r].name.common;
        Population.innerHTML = `Population: <span>${data[r].population}</span>`;
        Region.innerHTML = `Region: <span>${data[r].region}</span>`;
        Capital.innerHTML = `Capital: <span>${capitalName}</span>`;
        cardImg.src = `${data[r].flags.png}`;
        // cardImgContainer.style = ` background-image: url('${data[r].flags.png}')`
        cardImg.alt = data[r].name.common + "'s flag";

        cardInfo.appendChild(countryName);
        cardInfo.appendChild(Population);
        cardInfo.appendChild(Region);
        cardInfo.appendChild(Capital);

        cardImgContainer.appendChild(cardImg);

        card.appendChild(cardImgContainer);
        card.appendChild(cardInfo);

        content.appendChild(card);
    }
}

// getting request from api


axios({
    method: "get",
    url: url,
}).then((response) => {
    populateData(response.data);
});

let inputBox = document.querySelector("[data-input]");

inputBox.addEventListener("input", (e) => {
    axios({
        method: "get",
        url: `https://restcountries.com/v3.1/name/${e.target.value}`,
    }).then((response) => {
        populateData(response.data);
    });
});
