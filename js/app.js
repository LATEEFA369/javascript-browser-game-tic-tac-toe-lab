/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

/*---------------------------- Variables (state) ----------------------------*/

let board;      // squares state representation
let turn;       // track current turn
let winner;     // winner
let tie;        // tie game

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');

/*-------------------------------- Functions --------------------------------*/
function init() {
  board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  turn = 'X';
  winner = false;
  tie = false;
  squareEls.forEach(sqr => sqr.addEventListener("click", handleClick));
  messageEl.textContent = "Start game!";
  render();
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((value, index) => {
      const square = squareEls[index];
      square.textContent = value;
  });
}

function updateMessage() {
  if (!winner && !tie) {
      messageEl.textContent = `It's ${turn}'s turn.`;
  } else if (tie) {
      messageEl.textContent = "It's a tie! Try again.";
  } else {
      messageEl.textContent = `Congratulations, ${winner}! You win!`;
  }
}

function handleClick(event) {
  const squareIndex = event.target.id;

  if (winner) {
      messageEl.textContent = "Game over!";
      return;
  }

  if (board[squareIndex] === "X" || board[squareIndex] === "O") {
      messageEl.textContent = "That square is already taken.";
      return;
  }

  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
}

function placePiece(index) {
  board[index] = turn;
  render();
}

function checkForWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (board[a] !== ' ' && board[a] === board[b] && board[a] === board[c]) {
          winner = turn;
          messageEl.textContent = `Player ${turn} wins!`;
          return;
      }
  }
}

function checkForTie() {
  if (winner) return;
  if (!board.includes(' ')) {
      tie = true;
      messageEl.textContent = "It's a tie! Try again.";
  }
}

function switchPlayerTurn() {
  if (winner) return;
  turn = (turn === 'X') ? 'O' : 'X';
}

init();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/*----------------------------- Event Listeners -----------------------------*/
// squareEls.forEach(() => {
//     document.querySelector('.sqr').addEventListener('click', handleClick); 
//   });


