import './scss/main.scss'

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