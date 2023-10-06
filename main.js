const defaultAttributeScores = [15, 14, 13, 12, 10, 8];

class Player{
    constructor(characterName = 'Naruto'){
        this.name = characterName;
        this.attributes = {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        };
        let shuffled = shuffleArray(defaultAttributeScores);
        for(const [key, value] of Object.entries(this.attributes)) {
            let attributeValue = shuffled.pop();
            this.attributes[key] = attributeValue;
        }
    }

    rollAttributes(){
        for(const key in this.attributes){
            let results = diceRoller(4, 6);
            results.sort((a, b) => a-b);
            results.shift();
            this.attributes[key] = sumArray(results);
        }
    }

    printPlayer(){
        console.log(`NAME: ${this.name}`);
        for(const [key, value] of Object.entries(this.attributes)){
            console.log(`${key.slice(0, 3).toUpperCase()}: ${value}`);
        }
    }
}

const player01 = new Player();
player01.printPlayer();
const player02 = new Player('Goku');
player02.rollAttributes();
player02.printPlayer();

// Fisher-Yates algorithm for randomly sorting an array
// from: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
// adapted to JS and reconfigured to return a new (non-mutated) array
function shuffleArray(arr){
    let ret = Array.from(arr);
    for(let i = ret.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = ret[i];
        ret[i] = ret[j];
        ret[j] = temp;
    }
    return ret;
}

function diceRoller(times, sides){
    let results = [];
    for(let i = 0; i < times; i++){
        results.push(Math.floor(Math.random() * sides + 1))
    }
    return results;
}

function sumArray(arr){
    return arr.reduce((total, i) => total + i);
}