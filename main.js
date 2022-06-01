import "./scss/main.scss";
import axios from "axios";
// import { info } from "sass";
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
            }).catch(error=>{
                console.log(error)
            })
            
            
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
        let dataCountryName = document.createAttribute('data-countryName')
        dataCountryName.value = data[r].name.common
        card.setAttributeNode(dataCountryName)
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
        Population.innerHTML = `Population: <span>${(data[r].population).toLocaleString()}</span>`;
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
        card.addEventListener('click', (e)=>{
            openPage(e.target.attributes[0].nodeValue)
        })

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

// Overlay page
let exitBtn = document.querySelector('[data-exit]')
let overlay = document.querySelector('.overlay')
let infoInjectorParent = document.querySelector('.overlayInfo')

function openPage(country){
    axios({
        method: "get",
        url: `https://restcountries.com/v3.1/name/${country}?fullText=true`,
    }).then((response) => {
        appendData(response.data)
        
    }).catch(error =>{
        alert(error)
        console.log(error)
    });
}

function appendData (data){
    infoInjectorParent.innerHTML = ''
    let overlayInfoImageContainer = document.createElement('div')
    overlayInfoImageContainer.classList.add('overlayInfoImage')

    let overlayInfoImage = document.createElement('img')
    overlayInfoImage.src = data[0].flags.png
    overlayInfoImage.alt = data[0].name.common

    overlayInfoImageContainer.appendChild(overlayInfoImage)
    

    let overlayInfoText = document.createElement('div')
    overlayInfoText.classList.add('overlayInfoText')

    let overlayCountryName = document.createElement('h3')
    overlayCountryName.classList.add('countryName')
    overlayCountryName.innerText = data[0].name.common

    let countryInformationContainer = document.createElement('div')
    countryInformationContainer.classList.add('information')
    
    let capitalName =
    data[0].hasOwnProperty("capital") === true
        ? data[0].capital[0]
        : "none";
    let currencies =
    data[0].hasOwnProperty("currencies") === true
        ? `${Object.values(data[0].currencies)[0].name}`
        : "none";
    countryInformationContainer.innerHTML = `
    <p>Native name: <span>${Object.values(data[0].name.nativeName)[0].common}</span></p>
    <p>Population: <span>${(data[0].population).toLocaleString()}</span></p>
    <p>Region: <span>${data[0].region}</span></p>
    <p>Sub Region: <span>${data[0].subregion}</span></p>
    <p>Capital: <span>${capitalName}</span></p>
    <p>Top Level Domain: <span>${data[0].tld}</span></p>
    <p>Currency: <span>${currencies}</span></p>
    <p>Language: <span>${Object.values(data[0].languages).toString().split(','). join(', ')}</span></p>
    `

    let borderCountryInfo = document.createElement('div')
    borderCountryInfo.classList.add('borderCountries')
    let border = data[0].hasOwnProperty('borders') === true ? data[0].borders : 'none'

    if (border !== 'none'){
        
        let title =  document.createElement('p')
        title.classList.add('title')
        title.innerText = 'Border Countries:'

        borderCountryInfo.appendChild(title)
        border.forEach(ele => {
            axios({
                method: 'get',
                url: `https://restcountries.com/v2/alpha/${ele}?fields=name`
            }).then(response=>{
                
                let name = document.createElement('p')
                name.classList.add('buttonLike')
                name.innerText = response.data.name
                
                borderCountryInfo.appendChild(name)

            })
        })
    }else if(border === 'none'){

        let title =  document.createElement('p')
        title.classList.add('title')
        title.innerText = 'Border Countries:'

        let name = document.createElement('p')
        name.classList.add('buttonLike')
        name.innerText = 'none'
        
        borderCountryInfo.appendChild(title)
        borderCountryInfo.appendChild(name)

    }
    // console.log(border)
    overlayInfoText.appendChild(overlayCountryName)
    overlayInfoText.appendChild(countryInformationContainer)
    overlayInfoText.appendChild(borderCountryInfo)
    infoInjectorParent.appendChild(overlayInfoImageContainer)
    infoInjectorParent.appendChild(overlayInfoText)

    overlay.classList.add('open')
}



exitBtn.addEventListener('click', ()=>{
    overlay.classList.remove('open')
})

// https://restcountries.com/v2/alpha/SAU?fields=name

/*****************************************************\
 *****************************************************
 *****************************************************
    <div class="overlayInfoText">
        <h3 class="countryName">GH</h3>
        <div class="information">
            <p>Native name: <span>As</span></p>
            <p>Population: <span>As</span></p>
            <p>Region: <span>As</span></p>
            <p>Sub Region: <span>As</span></p>
            <p>Capital: <span>As</span></p>
            <p>Top Level Domain: <span>As</span></p>
            <p>Currency: <span>As</span></p>
            <p>Language: <span>As</span></p>
        </div>
        <div class="borderCountries">
            <p class="title">Border Countries:</p>
            <p class="buttonLike">MSD</p>
            <p class="buttonLike">KGF</p>
            <p class="buttonLike">LGP</p>
        </div>
    </div>
 *****************************************************
 *****************************************************
\*****************************************************/