function Cell(row, col){
    let symbol = '';
    const isEmpty = () => symbol === '';
    const setSymbol = (s) => symbol = s;
    const getSymbol = () => symbol;
    return {isEmpty, setSymbol, getSymbol, row, col};
}
function GameBoard(){
    const rows = 3;
    const cols = 3;
    const board = [];

    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < cols; j++){
            board[i].push(new Cell(i, j));
        }
    }
    const gameController = GameController(board);
    gameController.printNewRound();
    const printBoard = () => {
        board.forEach(row => {
            const rowDiv = document.createElement("div");
            rowDiv.className = "row";
            row.forEach(cell => {
                // create element
                const cellElement = document.createElement("div");
                cellElement.className = "cell";
                cellElement.innerText = cell.getSymbol();
                // add event listener
                cellElement.addEventListener("click", () => {
                    // gameController.playRound(cell.row, cell.col);
                    if (cellElement.innerText !== '') return;
                    if (gameController.getGameOver()) return;
                    cellElement.innerText = gameController.getCurrentPlayer().symbol;
                    gameController.playRound(cell.row, cell.col);
                });
                rowDiv.appendChild(cellElement);
            });
            document.getElementById("board").appendChild(rowDiv);
        });
    }
    return {printBoard};

}

function GameController(board){
    const players = [
        {name: 'Player 1', symbol: 'X'},
        {name: 'Player 2', symbol: 'O'}
    ];
    console.log(board[0][0]);
    let currentPlayer = players[0];
    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    }
    let gameOver = false;
    const getGameOver = () => gameOver;
    const getCurrentPlayer = () => currentPlayer;
    const printNewRound = () => {
        // display which player turn
        document.getElementById("player").innerText = currentPlayer.name;
    }
    const checkWin = () => {
        for (let i = 0; i < 3; i++){
            if ((
                board[i][0].getSymbol() === currentPlayer.symbol &&
                board[i][1].getSymbol() === currentPlayer.symbol &&
                board[i][2].getSymbol() === currentPlayer.symbol) || (
                board[0][i].getSymbol() === currentPlayer.symbol &&
                board[1][i].getSymbol() === currentPlayer.symbol &&
                board[2][i].getSymbol() === currentPlayer.symbol))
                return true;
        }
        if ((
            board[0][0].getSymbol() === currentPlayer.symbol &&
            board[1][1].getSymbol() === currentPlayer.symbol &&
            board[2][2].getSymbol() === currentPlayer.symbol) ||(
            board[0][2].getSymbol() === currentPlayer.symbol &&
            board[1][1].getSymbol() === currentPlayer.symbol &&
            board[2][0].getSymbol() === currentPlayer.symbol))
            return true;
        return false;
    }
    const checkTie = () => {
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (board[i][j].isEmpty()) return false;
            }
        }
        return true;
    }
    const playRound = (row, col) => {
        const cell = board[row][col];
        if (cell.isEmpty()){
            cell.setSymbol(currentPlayer.symbol);
            if (checkWin()){
                console.log(`${currentPlayer.name} (${currentPlayer.symbol}) won!`);
                document.getElementById("status").innerText = `${currentPlayer.name} (${currentPlayer.symbol}) won!`;
                gameOver = true;
                return;
            }
            if (checkTie()){
                document.getElementById("status").innerText = "Tie!";
                gameOver = true;
                return;
            }
            switchPlayer();
            printNewRound();
        }
    }
    return {playRound, getCurrentPlayer, printNewRound, getGameOver};
}
const board = GameBoard();
board.printBoard();
document.getElementById("reset").addEventListener("click", () => {
    // delete all children
    while (document.getElementById("board").firstChild){
        document.getElementById("board").removeChild(document.getElementById("board").firstChild);
    }
    const board = GameBoard();
    board.printBoard();
});
// while (true){
//     const row = parseInt(prompt("Enter the row (0, 1, or 2):"));
//     const col = parseInt(prompt("Enter the column (0, 1, or 2):"));
//     gameController.playRound(row, col);
// }