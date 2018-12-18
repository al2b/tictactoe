const player1 = 'player1';
const player2 = 'player2';
var nextPlayer = null;

const listNode = document.getElementById('tictac');

listNode.addEventListener('click', function(event) {
  changeClass(event.target.id);
  setNextPlayer()
});

function changeClass(id) {
  if (nextPlayer === null) {
    document.getElementById(id).classList.add(player1);
  } else {
    document.getElementById(id).classList.add(nextPlayer);
  }
}

function setNextPlayer(){
  if (nextPlayer === player1) {
    nextPlayer = player2
  } else {
    nextPlayer = player1
  }
}
