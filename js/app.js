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
  ]
  
  


/*---------------------------- Variables (state) ----------------------------*/

let board       //squares state represention 
let turn           ///track turnner
let winner        
let tie            // tie end 

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr'); 
const messageEl = document.querySelector('#message');



/*-------------------------------- Functions --------------------------------*/
 function init () {
    board = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
turn = 'X';
winner = false;
tie = false;
squareEls.forEach(sqr => sqr.addEventListener("click", handleClick));

 messageEl.textContent = "start game!";
render();

 };


function render(){
    updateBoard();
    updateMessage();


};

function updateBoard() {

    board.forEach((value, index) => {
     
      const square = squareEls[index];
  
      square.textContent = value;
    });
  };
  
    function updateMessage () {
        if( winner == 'false' && tie == 'false'){
            messageEl.textContent = `It's ${currentPlayer}'s turn.`
        } else if (winner == 'false' && tie == 'true'){
            messageEl.textContent = "It's a tie! Try again.";
        } else 
          messageEl.textContent = `Congratulations, ${winner}! You win!`;
        };


    function handleClick(event) {
          
       const squareIndex = event.target.id;
        
        
            if (winner == true) {
                messageEl.textContent = " game over !!"
            return;
              } 
              
            if (board[squareIndex ] === "X" || board[squareIndex ] === "O") {

                 messageEl.textContent = "That square is already taken"
                return ;
            }

           placePiece (squareIndex);
        } ;


 const  placePiece = (index) => {
    board[index] = turn;

 };


 function checkForWinner() {
  for (i=0; i=winningCombos.length; i++) {

    const [a, b, c] = winningCombos[i];
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      winner = turn;
      messageEl.textContent = `Player ${turn} wins!`;
      return;
 }
  }
}; 


function checkForTie(){
  if (winner == true) {
    return; 
}
if (board.includes('')) {
  tie = false;
} else {
  tie = true;
}
};

function switchPlayerTurn() {
  
  if (winner) {
    return;
  }

 
  if (turn === 'X') {
    turn = 'O';
  } else {
    turn = 'X'; 
  }
};




    

init();////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/*----------------------------- Event Listeners -----------------------------*/
// squareEls.forEach(() => {
//     document.querySelector('.sqr').addEventListener('click', handleClick); 
//   });


