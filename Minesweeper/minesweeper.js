const BOARD_SIZE = 10; // Size of the board (10x10)
const NUM_MINES = 10;  // Number of mines on the board

let board = [], gameOver = false, flagCount = 0, revealedCount = 0, otherCount = BOARD_SIZE * BOARD_SIZE - NUM_MINES;

// Initialize the game board
function initBoard() {
    // Create a 2D array where each cell is a unique object
    board = Array.from({ length: BOARD_SIZE }, () => (
        Array.from({ length: BOARD_SIZE }, () => ({
            mine: false,
            revealed: false,
            flagged: false,
            adjacentMines: 0
        }))
    ));

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < NUM_MINES) {
        let row = Math.floor(Math.random() * BOARD_SIZE);
        let col = Math.floor(Math.random() * BOARD_SIZE);
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

    if (row - 1 >= 0){
        if (col - 1 >= 0) {
            if (board[row-1][col-1].mine) count++;
        }
        if (col + 1 < BOARD_SIZE){
            if (board[row-1][col+1].mine) count++;
        }
        if (board[row-1][col].mine) count++;
    }
    
    if (row + 1 < BOARD_SIZE) {
        if (col - 1 >= 0) {
            if (board[row+1][col-1].mine) count++;
        }
        if (col + 1 < BOARD_SIZE){
            if (board[row+1][col+1].mine) count++;
        }
        if (board[row+1][col].mine) count++;
    }

    if (col - 1 >= 0){
        if (board[row][col-1].mine) count++;
    }

    if (col + 1 < BOARD_SIZE){
        if (board[row][col+1].mine) count++;
    }

    return count;
}

// Reveal a cell
function revealCell(row, col) {
    // Return if the game is over or the cell is already revealed
    if (gameOver || row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE || board[row][col].revealed) return;
    
    // Reveal the current cell
    board[row][col].revealed = true;
    revealedCount += 1;
    const cellElement = document.getElementById(`cell-${row}-${col}`);
    cellElement.classList.add('revealed');
   
    // If the cell has adjacent mines, show the count
    if (board[row][col].adjacentMines > 0) {
        cellElement.textContent = board[row][col].adjacentMines;
        if (board[row][col].flagged){
            board[row][col].flagged = false;
            flagCount -= 1;
        }
        checkWinCondition();
        return;
    } 


    // If the cell has a mine, the game is over
    if (board[row][col].mine) {
        cellElement.textContent = '💣';  // Display bomb symbol or any other indicator
        cellElement.style.backgroundColor = 'red';  // Highlight the mine
        
        gameOver = true;
        
        // Display the game over message on the board
        const gameMessage = document.getElementById('gameMessage');
        gameMessage.textContent = 'GAME OVER!';
        gameMessage.style.display = 'block'; // Show the overlay
        return;
    }

    // Recursively reveal neighboring cells if no adjacent mines
    revealCell(row - 1, col);      // Reveal top
    revealCell(row + 1, col);      // Reveal bottom
    revealCell(row, col - 1);      // Reveal left
    revealCell(row, col + 1);      // Reveal right
    revealCell(row - 1, col - 1);  // Reveal top-left
    revealCell(row - 1, col + 1);  // Reveal top-right
    revealCell(row + 1, col - 1);  // Reveal bottom-left
    revealCell(row + 1, col + 1);  // Reveal bottom-right

    checkWinCondition();
}

// Check if the player has won the game
function checkWinCondition() {
    if (revealedCount === otherCount) {
        const gameMessage = document.getElementById('gameMessage');
        gameMessage.textContent = 'GAME WON!'; // Display win message
        gameMessage.style.display = 'block'; // Show the overlay
        gameOver = true; // Set game state to over
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
            cell.addEventListener('contextmenu', (event) => toggleFlag(row, col, event));
            gameBoard.appendChild(cell);
        }
    }
}

// Flag or unflag a cell
function toggleFlag(row, col, event) {
    event.preventDefault(); // Prevent the context menu from showing

    const cell = board[row][col];
    const cellElement = document.getElementById(`cell-${row}-${col}`);

    // Toggle the flag only if the cell is not revealed
    if (!cell.revealed) {
        if (!cell.flagged && flagCount < NUM_MINES) {
            // Place a flag
            cell.flagged = true;
            cellElement.textContent = '🚩';  // Add flag symbol
            flagCount += 1;  // Increase the flag count
        } else if (cell.flagged) {
            // Remove the flag
            cell.flagged = false;
            cellElement.textContent = '';    // Remove flag
            flagCount -= 1;  // Decrease the flag count
        }
    }
    
    // If the cell is revealed and it was flagged, remove the flag
    if (cell.revealed && cell.flagged) {
        cell.flagged = false;  // Set the cell as unflagged
        cellElement.textContent = '';    // Remove flag symbol
        flagCount -= 1;  // Decrease the flag count
    }
}

// Reset the game
function resetGame() {
    gameOver = false;
    flagCount = 0;
    revealedCount = 0
    initBoard();
    createBoardUI();

    // Clear the game message
    const gameMessage = document.getElementById('gameMessage');
    gameMessage.textContent = '';
    gameMessage.style.display = 'none'; // Hide the overlay
}

// Initialize the game
resetGame();

// Add event listener to reset button
document.getElementById('resetButton').addEventListener('click', resetGame);