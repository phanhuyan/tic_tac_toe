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
    const getBoard = () => board;
    const printBoard = () => {
        board.forEach(row => {
            let line = '';
            row.forEach(cell => {
                line += cell.getSymbol() + ' ';
            });
            console.log(line);
        });
    }

}
function Cell(row, col){
    let symbol = '';
    const isEmpty = () => symbol === '';
    const setSymbol = (s) => symbol = s;
    const getSymbol = () => symbol;
}

function GameController(){
    const players = [
        {name: 'Player 1', symbol: 'X'},
        {name: 'Player 2', symbol: 'O'}
    ];
    let currentPlayer = players[0];
    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    }
    const playRound = (row, col) => {
        const cell = board[row][col];
        if (cell.isEmpty()){
            cell.setSymbol(currentPlayer.symbol);
            switchPlayer();
        }
        switchPlayer();
        printNewRound();
    }
    const getCurrentPlayer = () => currentPlayer;
    const printNewRound = () => {
        console.log(`New round! ${currentPlayer.name} (${currentPlayer.symbol})`);
        Board.printBoard();
    }
    return {playRound, getCurrentPlayer};
}
const game = GameController();