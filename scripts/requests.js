
// Breaking Bad Search HTTP Requests

const getRandom = async () => {
    try {
        const response = await fetch('https://www.breakingbadapi.com/api/character/random');
        const randomCharacter = await response.json();
        return {
            mugshot: randomCharacter[0].img,
            name: randomCharacter[0].name,
            nickname: randomCharacter[0].nickname,
            occupation: randomCharacter[0].occupation[0],
            healthStatus: randomCharacter[0].status
        }
    } catch (error) {
        console.log(error);
    }
}

const getAllData = async () => {
    try {
        const response = await fetch('https://breakingbadapi.com/api/characters');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export { getRandom, getAllData };