import './scss/main.scss'
import axios from 'axios';

// Theme changer with local storage
let themeChangerBtn = document.querySelector('[data-themeSwitch]')
let container = document.body
const dataTheme = localStorage.getItem('data-theme')
container.setAttribute("data-theme", "light");

themeChangerBtn.addEventListener('click', ()=>{
    
    let dataAttribute = container.getAttribute('data-theme')

    if (dataAttribute === "light") {
        container.setAttribute("data-theme", "dark");
        localStorage.setItem("data-theme", "dark");
  
    }
    if(dataAttribute === "dark") {
        container.setAttribute("data-theme", "light");
        localStorage.setItem("data-theme", "light");
        
    }
    
})

if (dataTheme === 'dark'){
    container.setAttribute("data-theme", "dark")
}else if(dataTheme === "light"){
    container.setAttribute("data-theme", "light")
}


// Options List toggle

let optionsButton = document.querySelector('[data-optionsButton]')
let optionsList = document.querySelector('[data-optionsList]')

optionsButton.addEventListener('click', ()=>{
    optionsList.classList.toggle('opened')
})

// Populate data
function populateData(data){
    let content = document.querySelector('[data-content]')
    content.innerHTML = ''
    console.log(data)

    for (let i = 0; i <= data.length -3 ; i++) {
        let r = i + 3
        let card = document.createElement("a")  
        card.classList.add('card')
        
        let cardImgContainer = document.createElement("div")
        cardImgContainer.classList.add('cardImage')
        
        let cardImg = document.createElement("img")
        
        let cardInfo = document.createElement('div')
        cardInfo.classList.add('cardInformation')

        let countryName = document.createElement('h2')
        let Population = document.createElement('p')
        let Region = document.createElement('p')
        let Capital = document.createElement('p')


        countryName.innerText = data[r].name.common
        Population.innerHTML = `Population: <span>${data[r].population}</span>`
        Region.innerHTML = `Region: <span>${data[r].region}</span>`
        Capital.innerHTML = `Capital: <span>${data[r].capital[0]}</span>`
        cardImg.src = `${data[r].flags.png}`
        // cardImgContainer.style = ` background-image: url('${data[r].flags.png}')`
        cardImg.alt = data[r].name.common + '\'s flag'

        cardInfo.appendChild(countryName)
        cardInfo.appendChild(Population)
        cardInfo.appendChild(Region)
        cardInfo.appendChild(Capital)
        
        cardImgContainer.appendChild(cardImg)
        
        card.appendChild(cardImgContainer)
        card.appendChild(cardInfo)
        
        content.appendChild(card)
        console.log(data[r].flags)

    }
}

// getting request from api

let url = `https://restcountries.com/v3.1/all`

axios({
    method: 'get',
    url: url,
  }).then(
        (response)  =>{
        
            populateData(response.data)
      
        }
    );


/*******************************************************************************\
<div class="card">
     <div class="cardImage">
        <img src="https://flagcdn.com/do.svg" alt="" />
     </div>
     <div class="cardInformation">
         <h2>{Country Name}</h2>
         <p>Population: <span>10</span></p>
         <p>Region: <span>Fire Country</span></p>
         <p>Capital: <span>Konoha</span></p>
     </div>
</div>
\*******************************************************************************/