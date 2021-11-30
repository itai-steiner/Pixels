class Pixels {
    constructor(r, g, b){
        if ((r >= 0) || (r <= 255)){
            this.r = r;
        }
        if ((g >= 0) || (g <= 255)){
            this.g = g;
        }
        if ((b >= 0) || (b <= 255)){
            this.b = b;
        }
        
    }

    getR() {
        return this.r;
    }

    getG() {
        return this.g;
    }

    getB() {
        return this.b;
    }

    getRGB(){
        let rgb = [this.getR(), this.getG(), this.getB()];
        return rgb;
    }

    replicateGene(gene, geneType){
        if (this.flipACoin()){ //if true then random RGB, if false inheritance
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


//pixels to start from
const pixelA = new Pixels(0, 1, 2);
const pixelB = new Pixels(255, 128, 4);

//choosing 2 pixels from poplation to replicate
let pixelArray = [pixelA, pixelB];

//pixels array showing the overall population
let replicatePixelsArray = chooseTwoPixelsRandomly(pixelArray);

function chooseTwoPixelsRandomly(pixelArray) {
    var firstPixel = (Math.floor(Math.random() * pixelArray.length));
    var secondPixel = (Math.floor(Math.random() * pixelArray.length));
    while (firstPixel == secondPixel) { //checking that the pixels are not the same
        var secondPixel = (Math.floor(Math.random() * pixelArray.length));
    }
    return [firstPixel, secondPixel];
}

function replicateLoop() {
    setTimeout(function() {
        pixelArray.push(pixelArray[replicatePixelsArray[0]].replicate(pixelArray[replicatePixelsArray[1]])); 
        replicateLoop();  
    }, 300);
}

function poplationLog() {
    setTimeout(function() {
        console.log("Pixels: " , pixelArray)
        console.log("Pixels poplation: " , pixelArray.length)
        poplationLog();  
    }, 2000);
}

replicateLoop();
poplationLog();