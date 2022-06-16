
// Breaking Bad Search HTTP Requests

// array storing api data [random]
let randomInformation = []


const getRandom = async () => {
    try {
        const response = await fetch('https://www.breakingbadapi.com/api/character/random');
        // randomCharacter holds JSON response
        const randomCharacter = await response.json();
        let APIdata = {
            mugshot: randomCharacter[0].img,
            name: randomCharacter[0].name,
            nickname: randomCharacter[0].nickname,
            occupation: randomCharacter[0].occupation[0],
            healthStatus: randomCharacter[0].status
        }
        randomInformation.push(APIdata);
    } catch (error) {
        console.log(error);
    }
}


export { getRandom, randomInformation };