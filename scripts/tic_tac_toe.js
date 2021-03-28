// Tic-Tac Toe Game!

class Gameboard {
    constructor() {
        this.state = "X"
        this.gameTurn = ''
        this.moves = 0;
        this.size = 3;
        this.board = [
            [false, false, false],
            [false, false, false], 
            [false, false, false]
        ];
    }
}

gameBoard = new Gameboard();
setupGameboardEvents();



function setupGameboardEvents() {
    // Add Board button events to play
    addBoardTicToeButtons()
    // Add Buttons to change between X-O
    addChangeTicToeButtons()
    // Add reset button
    let buttonsContainer = document.getElementById('buttonsContainer');
    buttonsContainer.children[2].addEventListener("click", resetGameBoard);
}

function addBoardTicToeButtons() {
    let gameBoardHTML = document.getElementById('Gameboard');
    for (i = 0; i < gameBoardHTML.children.length; i++) {
        gameBoardHTML.children[i].addEventListener("click", addTicOrToe);
    }
}
function removeBoardTicToeButtons() {
    let gameBoardHTML = document.getElementById('Gameboard');
    for (i = 0; i < gameBoardHTML.children.length; i++) {
        gameBoardHTML.children[i].removeEventListener("click", addTicOrToe);
    }
}

function addChangeTicToeButtons() {
    let buttonsContainer = document.getElementById('buttonsContainer');
    
    for (i = 0; i < 2; i++) {
        buttonsContainer.children[i].addEventListener("click", changeTicToe);
    }
}
function removeChangeTicToeButtons() {
    let buttonsContainer = document.getElementById('buttonsContainer');
    
    for (i = 0; i < 2; i++) {
        buttonsContainer.children[i].removeEventListener("click", changeTicToe);
    }
}

function addTicOrToe() {
    if (!(this.textContent)) {

        // This.text content is X or O entered by user
        this.textContent = gameBoard.state;
        let gameBox = this.id;
        let row = Math.floor(gameBox/gameBoard.size);
        let col = gameBox % gameBoard.size;
        // Populate board array with player input value
        gameBoard.board[row][col] = gameBoard.state;
        gameBoard.moves += 1


        // Check for win/draw
        let result = checkGameState(row, col, gameBoard.state);
        if (result) {
            if (result == "win") {
                removeBoardTicToeButtons()
                removeChangeTicToeButtons()
                let result = document.getElementById('results');
                result.textContent = `Player ${gameBoard.state} won! (Press Reset to Play Again)`
            }
            else if (result == "draw") {
                removeBoardTicToeButtons()
                removeChangeTicToeButtons()
                let result = document.getElementById('results');
                result.textContent = "This game was a draw. (Press Reset to Play Again)"
            }
            return;
        }
        if (gameBoard.state == "X") {
            gameBoard.state = "O"
            gameBoard.gameTurn = `${gameBoard.state}'s Turn`;
            let gameTurnEle = document.getElementById('GameTurn');
            gameTurnEle.textContent = gameBoard.gameTurn;
        }
        else {
            gameBoard.state = "X"
            gameBoard.gameTurn = `${gameBoard.state}'s Turn`;
            let gameTurnEle = document.getElementById('GameTurn');
            gameTurnEle.textContent = gameBoard.gameTurn;
        }


        
    }
}

function checkGameState(row, col, state) {
    let n = gameBoard.size;
    let moves = gameBoard.moves;
    let index;
    let gameBox;

    // check column
    for (i = 0; i < n; i++) {
        if (gameBoard.board[row][i] != state) {
            break;
        }
        if (i == n - 1) {
            // Add animation class to specific pieces
            for (i = 0; i < n; i++) {
                index = (row * n) + i
                gameBox = document.getElementById(index);
                gameBox.className += ' GameboardAnimation'
            }
            return "win";
        }
    }

    // check row
    for (i = 0; i < n; i++) {
        if (gameBoard.board[i][col] != state) {
            break;
        }
        if (i == n - 1) {
            for (i = 0; i < n; i++) {
                index = (i * n) + col
                gameBox = document.getElementById(index);
                gameBox.className += ' GameboardAnimation'
            }
            return "win";
        }
    }

    // check diagonal
    if (col == row) {
        for (i = 0; i < n; i++) {
            if (gameBoard.board[i][i] != state) {
                break;
            }
            if (i == n - 1) {
                for (i = 0; i < n; i++) {
                    index = (i * n) + i
                    gameBox = document.getElementById(index);
                    gameBox.className += ' GameboardAnimation'
                }
                return "win";
            }
        }
    }
    // check anti-diagonal
    if (col + row == n - 1) {
        for (i = 0; i < n; i++) {
            if (gameBoard.board[i][(n-1) - i] != state) {
                break;
            }
            if (i == n - 1) {
                for (i = 0; i < n; i++) {
                    index = (i * n) + (n-1) - i
                    gameBox = document.getElementById(index);
                    gameBox.className += ' GameboardAnimation'
                }
                return "win";
            }
        }
    }
    //check draw
    if  (moves == (Math.pow(n, 2) - 1)){
        return "draw";
    }


}

function changeTicToe() {
    if (gameBoard.state !== this.id) {
        // Change other button to show not in use by player
        let currentStateButton = document.getElementById(gameBoard.state)
        currentStateButton.textContent = gameBoard.state

        gameBoard.state = this.id;
        // Change button to show in use by player
        this.textContent = `Player (${gameBoard.state})` 

        // Change info displaying turn
        gameBoard.gameTurn = `${gameBoard.state}'s Turn`;
        let gameTurnEle = document.getElementById('GameTurn');
        gameTurnEle.textContent = gameBoard.gameTurn;
    }
}

function resetGameBoard() {
    // Add buttons
    addBoardTicToeButtons();
    addChangeTicToeButtons();
    gameBoard.board = [
        [false, false, false],
        [false, false, false], 
        [false, false, false]
    ];
    gameBoard.moves = 0;
    // Reset class to remove animation
    let gameBoardHTML = document.getElementById('Gameboard');
    for (i = 0; i < gameBoardHTML.children.length; i++) {
        gameBoardHTML.children[i].textContent = '';
        gameBoardHTML.children[i].className = 'GameboardSquare'
    }
    // Remove tic/toes from board
    let result = document.getElementById('results');
    result.textContent = ""
    
    // Reset and turn info
    gameBoard.state = "X";
    gameBoard.gameTurn = `${gameBoard.state}'s Turn`;
    let gameTurnEle = document.getElementById('GameTurn');
    gameTurnEle.textContent = gameBoard.gameTurn;

    // Reset turn buttons
    let buttonsContainer = document.getElementById('buttonsContainer');
    buttonsContainer.children[0].textContent = `Player (${gameBoard.state})`;
    buttonsContainer.children[1].textContent = 'O';
}

