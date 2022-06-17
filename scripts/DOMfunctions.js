
// Breaking Bad Search DOM Manipulation

import { getRandom, getAllData } from "./requests.js";

// dom selectors
const name = document.querySelector('h2');
const nickName = document.querySelector('.nickName');
const occupation = document.querySelector('.occupation');
const status = document.querySelector('.status');
const characterPic = document.querySelector('.characterPic');
const inputBar = document.querySelector('input');

// search functionality
const searchBar = async () => {
    let DATA = await getAllData();
    // change names to lowercase for search
    for (let z = 0; z < DATA.length; z++) {
        DATA[z].name = DATA[z].name.toLowerCase();
    }
    let inputValue = '';

    // retrieve the value of searchBar
    inputBar.addEventListener('input', (e) => {
        inputValue = e.target.value.toLowerCase();
        console.log(inputValue);
    });
    // submit eventListener
    inputBar.addEventListener('submit', (e) => {
        DATA.find((element, i) => {                          // leaving off right here
            if (element.name.includes(inputValue)) {
                console.log('WHOA, THIS IS TRUE. IT WORKED.');
            }
        });
    });
    console.log(DATA);
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