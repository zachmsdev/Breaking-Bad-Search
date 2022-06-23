
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
const randomButton = document.querySelector('footer > button');


// LOADING ANIMATION FUNCTIONS
const hideLoading = () => {
    const beakerIcons = document.querySelectorAll('i');
    const beakerBG = document.querySelector('.loadingBeaker');
    const cardContent = document.querySelector('.cardContent');
    const cardDescriptions = document.querySelectorAll('.cardContent > p');
    const characterPic = document.querySelector('.characterPic');
    cardDescriptions.forEach(des => des.style.display = 'inherit');
    beakerIcons.forEach(beaker => beaker.classList.add('hide'));
    beakerBG.classList.add('hide');
    characterPic.classList.remove('loading');
    // display card content, loading is finished
    cardContent.classList.remove('hide');
    cardContent.classList.add('show');
}

const showLoading = () => {
    const beakerIcons = document.querySelectorAll('i');
    const beakerBG = document.querySelector('.loadingBeaker');
    const cardContent = document.querySelector('.cardContent');
    const cardDescriptions = document.querySelectorAll('.cardContent > p');
    const characterPic = document.querySelector('.characterPic');
    cardDescriptions.forEach(des => des.style.display = 'none');
    beakerIcons.forEach(beaker => {
        beaker.classList.remove('hide');
        beaker.style.animationDuration = '1s';
    });
    beakerBG.classList.remove('hide');
    characterPic.classList.add('loading');
    // loading is in action, hide the main card content
    cardContent.classList.remove('show');
    cardContent.classList.add('hide');
}

const searchLoading = () => {
    showLoading();
    setTimeout(hideLoading, 1000);
}


// SEARCH FUNCTIONALITY FUNCTION
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
        if (name.textContent === '') hideLoading();
        if (name.textContent !== '') searchLoading();
        inputBar.value = '';

        // iterate over api data to find what user searches
        let lookUp = DATA.filter((character) => {
            if (character.name.split(' ').includes(inputValue) || character.name === inputValue) return true;
        });

        // prevent walter white + walter white jr to both appear
        if (lookUp.length >= 2) {
            lookUp = lookUp.slice(0, 1);
        }
        
        // bring search result to helper function for dom manipulation
        console.log(lookUp);
        addToPage(lookUp);
    })

    // push user search to page
    const addToPage = (searched) => {
        const searchedObject = searched[0];
        name.textContent = searchedObject.name;
        characterPic.style.background = `url(${searchedObject.img})`;
        if (searchedObject.name === 'holly white') characterPic.style.background = 'url(../Breaking-Bad-Search/images/holly.png)';
        characterPic.style.backgroundSize = 'cover';
        characterPic.style.backgroundPosition = 'top';
        if (searchedObject.name === 'marco & leonel salamanca') characterPic.style.backgroundPosition = 'center'; 
        nickName.textContent = searchedObject.nickname;
        occupation.textContent = searchedObject.occupation[0];
        status.textContent = searchedObject.status;
    }
}


// RANDOM BUTTON FUNCTON
const randomBtnClicked = async () => {
    if (name.textContent === '') hideLoading();
    if (name.textContent !== '') searchLoading();
    let RANDOM = await getRandom();

    // card changes
    name.textContent = RANDOM.name;
    characterPic.style.background = `url(${RANDOM.mugshot})`;
    if (RANDOM.name === 'Holly White') characterPic.style.background = 'url(../Breaking-Bad-Search/images/holly.png)';
    nickName.textContent = RANDOM.nickname;
    occupation.textContent = RANDOM.occupation;
    status.textContent = RANDOM.healthStatus;
    characterPic.style.backgroundSize = 'cover';
    characterPic.style.backgroundPosition = 'top';
    // change backgroundPosition center because broken image
    if (RANDOM.name === 'Marco & Leonel Salamanca') characterPic.style.backgroundPosition = 'center'; 
    characterPic.style.backgroundRepeat = 'no-repeat';
}

// MAIN APP FUNCTION
const app = () => {
    searchBar();
    randomButton.addEventListener('click', randomBtnClicked);
}


export { randomBtnClicked, searchBar, app };