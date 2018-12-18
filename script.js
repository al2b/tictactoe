const player1 = 'player1';
const player2 = 'player2';
let nextPlayer = null;

let round = 0;

const listNode = document.getElementById('tictac');

listNode.addEventListener('click', function(event) {
  id = document.getElementById(event.target.id);
  if (id.classList.contains(player1) || id.classList.contains(player2)) {
    alert('déjà joué!');
  } else {
    changeClass(id);
    winner = checkWin();
    if(winner) {
      alert('partie gagnée par ' + nextPlayer )
    } else {
      if (round < 8 ) {
        setNextPlayer();
        round = round +1;
      } else {
        alert('alerte joueurs trop malins');
      }
    }
  }
});

function checkWin() {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ];
  let comboGagnant = 'rien';

  const td = document.querySelectorAll(`.${nextPlayer} `);
  const choicesPlayer = [];
  td.forEach((el)=>{
    choicesPlayer.push(parseInt(el.id));
  });

  if (choicesPlayer.length >= 3) {

    //
    winCombos.forEach(function (combo) {
        let winCount = 0;
        choicesPlayer.forEach(function (e) {
            if (combo.includes(e)) {
              winCount = winCount + 1;
              if (winCount === 3) {
                comboGagnant = combo;
              }
            }
          })
    })
  }
  if(comboGagnant !== 'rien') {
    return true;
  }
}

function changeClass(id) {
  if (nextPlayer === null) {
    id.classList.add(player1);
  } else {
    id.classList.add(nextPlayer);
  }
}

function setNextPlayer() {
  if (nextPlayer === null || nextPlayer === player1) {
    nextPlayer = player2
  } else {
    nextPlayer = player1
  }
}
