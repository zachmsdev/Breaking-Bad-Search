
// Breaking Bad Search Main JS

// import { getRandom } from "./requests.js";
// import { updateRandom } from "./DOMfunctions.js";

// updateRandom();


const getRandom = async () => {
    try {
        const response = await fetch('https://www.breakingbadapi.com/api/character/random');
        const randomCharacter = await response.json();
        return randomCharacter;
        // updateRandom(randomCharacter);
        // console.log(randomCharacter[0]);
    } catch (error) {
        console.log(error);
    }
}

let answer = await getRandom();

console.log(answer[0].name);





