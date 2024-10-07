const BOARD_SIZE = 10; // Size of the board (10x10)
const NUM_MINES = 1;  // Number of mines on the board

let board = [];
let gameOver = false;

// Initialize the game board
function initBoard() {
    board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill({ mine: false, revealed: false, adjacentMines: 0 }));

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < NUM_MINES) {
        const row = Math.floor(Math.random() * BOARD_SIZE);
        const col = Math.floor(Math.random() * BOARD_SIZE);
        if (!board[row][col].mine) {
            board[row][col].mine = true;
            minesPlaced++;
        }
    }

    // Calculate adjacent mines for each cell
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (board[row][col].mine) continue;

            board[row][col].adjacentMines = countAdjacentMines(row, col);
        }
    }
}

// Count the number of adjacent mines
function countAdjacentMines(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue; // Skip the current cell
            const newRow = row + i;
            const newCol = col + j;
            if (isInBounds(newRow, newCol) && board[newRow][newCol].mine) {
                count++;
            }
        }
    }
    return count;
}

// Check if the coordinates are within bounds
function isInBounds(row, col) {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

// Reveal a cell
function revealCell(row, col) {
    if (gameOver || board[row][col].revealed) return;

    board[row][col].revealed = true;

    const cellElement = document.getElementById(`cell-${row}-${col}`);
    cellElement.classList.add('revealed');

    if (board[row][col].mine) {
        cellElement.classList.add('mine');
        alert("Game Over! You clicked on a mine.");
        gameOver = true;
        return;
    }

    // Show the number of adjacent mines
    if (board[row][col].adjacentMines > 0) {
        cellElement.textContent = board[row][col].adjacentMines;
    } else {
        // If there are no adjacent mines, reveal adjacent cells
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue; // Skip the current cell
                const newRow = row + i;
                const newCol = col + j;
                if (isInBounds(newRow, newCol)) {
                    revealCell(newRow, newCol);
                }
            }
        }
    }
}

// Create the game board UI
function createBoardUI() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Clear existing cells

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${row}-${col}`;
            cell.addEventListener('click', () => revealCell(row, col));
            gameBoard.appendChild(cell);
        }
    }
}

// Reset the game
function resetGame() {
    gameOver = false;
    initBoard();
    createBoardUI();
}

// Initialize the game
resetGame();

// Add event listener to reset button
document.getElementById('resetButton').addEventListener('click', resetGame);