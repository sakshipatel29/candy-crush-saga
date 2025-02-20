

var candies = ["Blue", "Green", "Red", "Purple", "Yellow", "Orange"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var currTile;
var otherTile;

window.onload = function(){
    startGame();

    window.setInterval(function(){
        crushCandy();
    }, 100);
}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

function startGame() {
    for(let r = 0; r < rows; r++ ){
        let row = [];
        for(let c = 0; c < columns; c++){
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}

function dragStart() {
    currTile = this;
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(){

}

function dragDrop(){
    otherTile = this;
}

function dragEnd() {

    if(currTile.src.includes("blank") || (currTile.src.includes("blank"))){
        return;
    }
    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveDown || moveLeft || moveRight || moveUp;

    if(isAdjacent){

        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();

        if(!validMove){
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;
        }
    }
}

function crushCandy(){
    crushThree();
}

function crushThree(){
    for( let r = 0; r < rows; r++){
        for(let c = 0; c < columns-2; c++){
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if( candy1.src == candy2.src && candy2.src  == candy3.src && !candy1.src.includes("blank")){
                candy1.src = "./Images/blank.png";
                candy2.src = "./Images/blank.png";
                candy3.src = "./Images/blank.png";
            }
        }
    }

    for(let c = 0; c < columns; c++){
        for(let r = 0; r < rows-2; r++){
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if( candy1.src == candy2.src && candy2.src  == candy3.src && !candy1.src.includes("blank")){
                candy1.src = "./Images/blank.png";
                candy2.src = "./Images/blank.png";
                candy3.src = "./Images/blank.png";
            }
        }
    }
}

function checkValid(){
    for( let r = 0; r < rows; r++){
        for(let c = 0; c < columns-2; c++){
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if( candy1.src == candy2.src && candy2.src  == candy3.src && !candy1.src.includes("blank")){
                return true;
            }
        }
    }

    for(let c = 0; c < columns; c++){
        for(let r = 0; r < rows-2; r++){
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if( candy1.src == candy2.src && candy2.src  == candy3.src && !candy1.src.includes("blank")){
                return true;
            }
        }
    }
    return false;
}
