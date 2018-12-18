const player1 = 'player1';
const player2 = 'player2';
var nextPlayer = null;

const listNode = document.getElementById('tictac');

listNode.addEventListener('click', function(event) {
  id = document.getElementById(event.target.id);
  if (id.classList.contains(player1) || id.classList.contains(player2)) {
    alert('déjà joué!');
  }else{
    changeClass(id);
    setNextPlayer()
  }
});

function changeClass(id) {
  if (nextPlayer === null) {
    id.classList.add(player1);
  } else {
    id.classList.add(nextPlayer);
  }
}

function setNextPlayer(){
  if (nextPlayer === null || nextPlayer === player1) {
    nextPlayer = player2
  } else {
    nextPlayer = player1
  }
}
