const fs = require('fs');
const prompt = require('prompt-sync')();

class Pixels {
    constructor(r, g, b){
        if (((r >= 0) || (r <= 255) &&
            ((g >= 0) || (g <= 255)) &&
            ((b >= 0) || (b <= 255)))) {
                this.genes = {
                    R: r,
                    G: g,
                    B: b
                }
        }
    }

    getR() {
        return this.getRGB().R;
    }

    getG() {
        return this.getRGB().G;
    }

    getB() {
        return this.getRGB().B;
    }

    getRGB(){
        return this.genes;
    }

    getID(){
        return this.id;
    }

    replicateGene(gene, geneType){
        if (this.flipACoin()){ //if true, then random RGB, if false, inheritance
            return Math.floor(Math.random() * 255)
        } else {
            if (this.flipACoin()){ //if true, takes R/G/B from pixalA, if false takes R/G/B from pixalB
                return gene;
            } else {
                switch (geneType) {
                    case 'r':
                        return this.getR();
                        break;
                    case 'g':
                        return this.getG();
                        break;
                    case 'b':
                        return this.getB();
                        break;     
                }
            }
        }
    }

    replicate(other_pixel) {

        return new Pixels (
            this.replicateGene(other_pixel.getR(this), 'r'),
            this.replicateGene(other_pixel.getG(this), 'g'),
            this.replicateGene(other_pixel.getB(this), 'b')
        )
    }
    
    flipACoin(){
        if (Math.floor(Math.random() * 2) == 0) {
            return false;
        } else {
        return true;
        }
    }
} //end of Pixels class

let startDigis = 10000000;
let lsn = 0; //least significant number
let pixelArrayID = [];
let randNumArry = [];

function choosePixelsRandom(pixelArray) {
    var firstPixel = (Math.floor(Math.random() * pixelArray.length));
    var secondPixel = (Math.floor(Math.random() * pixelArray.length));
    while (firstPixel == secondPixel) { //checking that the pixels are not the
        var secondPixel = (Math.floor(Math.random() * pixelArray.length));
    }
    return [firstPixel, secondPixel];
}

//creating new ID, without returning the same ID twice
function createRandID() {
    let randCount = 0;
    let randNum = 0;
    if (lsn == 10){
        for (let i = 0; i < 10; i++){
            randNumArry[i] = false;
        }
        startDigis = startDigis + 1;
        lsn = 0;
        randCount = 0;
    } 
    do {
        randNum = (Math.floor(Math.random() * 10));
        if (randNumArry[randNum] != true){
            randNumArry[randNum] = true;
            randCount++;
            break;
        } 
    } while (randNumArry[randNum] == true && randCount < 10)
    let uid = Number(startDigis.toString() + randNum.toString());
    lsn++
    return uid;
    }

function replicateLoopID(times) {
    for (let i = 0; i < times; i++){
        replicatePixelsArray = choosePixelsRandom(pixelArray)
        pixelArray.push(pixelArray[replicatePixelsArray[0]].replicate(pixelArray[replicatePixelsArray[1]]));
    }
    addID()
}

//Add id to pixels array
function addID() {
    for (let i = 0; i < pixelArray.length; i++){
        pixelArrayID[i] = { 
            "id": createRandID(), 
            "genes": pixelArray[i].getRGB()
        }
    }
}

//JSON saving file function
async function saveData(data) {
    function finished(error) {
        if(error){
            console.error(error)
            return;
        }
    }
    const jsonData = (JSON.stringify(data, null, 2))
    fs.writeFile('pixels.json', jsonData, finished)
}

//starting empty JSON file
saveData(pixelArrayID)

//starting pixels and giving them IDs
const pixelA = new Pixels(0, 1, 2);
const pixelB = new Pixels(255, 128, 4);
let replicateQuestion = 'n';
let pixelArray = [pixelA, pixelB];

//pixels array showing the overall population
let replicatePixelsArray = choosePixelsRandom(pixelArray);

do{
replicateQuestion = prompt('Hey there, would you like the pixels to replicate? Y/N  ');
if (replicateQuestion == ('y' || 'Y')){
    let timesQuestion = prompt('How many times?  ');
    replicateLoopID(Number(timesQuestion)) // <-- choose how many times you want the pixels to replicate with ID
    saveData(pixelArrayID)
    console.log(pixelArrayID)
} else if(replicateQuestion == ('n' || 'N')){
    console.log("Your pixels are in pixels.json file.")
} else { 
    replicateQuestion = 'y';
    console.log("Please answer Y/N")
}
} while (replicateQuestion == ('y' || 'Y') )

//Please run this at nodeJS terminal
