
// Breaking Bad Search DOM Manipulation

import { getRandom, getAllData } from "./requests.js";

// DOM SELECTORS
const name = document.querySelector('h2');
const nickName = document.querySelector('.nickName');
const occupation = document.querySelector('.occupation');
const status = document.querySelector('.status');
const characterPic = document.querySelector('.characterPic');
const inputBar = document.querySelector('input');
const form = document.querySelector('form');


// SEARCH FUNCTIONALITY
const searchBar = async () => {
    let DATA = await getAllData();
    let inputValue = '';

    // change names to lowercase for search
    for (let z = 0; z < DATA.length; z++) {
        DATA[z].name = DATA[z].name.toLowerCase();
    }
    
    // event listeners
    inputBar.addEventListener('input', (e) => {
        inputValue = e.target.value.toLowerCase();
        console.log(inputValue);
    })
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        inputBar.value = '';
        // iterate over api data to find what user searches
        let lookUp = DATA.filter((character) => {
            if (character.name.split(' ').includes(inputValue) || character.name === inputValue) return true;
        });
        // prevent walter white + walter white jr to both appear
        if (lookUp.length >= 2) {
            lookUp = lookUp.slice(0, 1);
        }
        
        // give capitalization back to name
        let charName = lookUp[0].name.split(' ');
        let newWord = [];
        for (let z = 0; z < charName.length; z++) {             // NEED TO GET NAME CAPITALIZED [problem when name typed more than once... type walter for example]
            const firstLetter = charName[z].charAt(0).toUpperCase();
            const restOfName = charName[z].slice(1);
            const TOTAL = firstLetter + restOfName;
            newWord.push(TOTAL);
        }
        lookUp[0].name = newWord.join(' ');
        // const capitalizedName = charName.join(' ');
        // lookUp[0].name = capitalizedName;
        // console.log(capitalizedName);
        // console.log(testing);
        console.log(lookUp);


        // addToPage(lookUp);
    })

    // push user search to page
    const addToPage = (searched) => {
        const searchedObject = searched[0];
        name.textContent = searchedObject.name;
        characterPic.style.background = `url(${searchedObject.img})`;
        characterPic.style.backgroundSize = 'cover';
        characterPic.style.backgroundPosition = 'top';
        if (searchedObject.name === 'marco & leonel salamanca') characterPic.style.backgroundPosition = 'center'; 
        nickName.textContent = searchedObject.nickname;
        occupation.textContent = searchedObject.occupation[0];
        status.textContent = searchedObject.status;
    }
}

// random button function
const randomBtnClicked = async () => {
    let RANDOM = await getRandom();
    
    // card changes
    name.textContent = RANDOM.name;
    characterPic.style.background = `url(${RANDOM.mugshot})`;
    nickName.textContent = RANDOM.nickname;
    occupation.textContent = RANDOM.occupation;
    status.textContent = RANDOM.healthStatus;
    characterPic.style.backgroundSize = 'cover';
    characterPic.style.backgroundPosition = 'top';
    // change backgroundPosition center because broken image
    if (RANDOM.name === 'Marco & Leonel Salamanca') characterPic.style.backgroundPosition = 'center'; 
    characterPic.style.backgroundRepeat = 'no-repeat';
}


export { randomBtnClicked, searchBar };