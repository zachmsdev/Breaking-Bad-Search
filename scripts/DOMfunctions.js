
// Breaking Bad Search DOM Manipulation
import { getRandom, randomInformation } from "./requests.js";

getRandom();

let plz = randomInformation;

const randomBtnClicked = () => {
    console.log(randomInformation);
    // console.log(randomInformation);
    // const NAME = document.querySelector('h2');
    // NAME.textContent = randomInformation[0];
    
}


export { randomBtnClicked, plz };