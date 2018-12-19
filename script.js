const player1 = 'player1';
const player2 = 'player2';
const buttonReset = 'buttonReset';
const alertClass = 'alert';

const tableNode = document.getElementById('game');
const containerNode = document.getElementById('container');

let nextPlayer = null;
let round = 0;

containerNode.addEventListener('click', function(event) {
  item = document.getElementById(event.target.id);

  if (item.classList.contains(buttonReset)) {
    reset();
  } else {
    event.stopPropagation();
  }
});

tableNode.addEventListener('click', function(event) {
  id = document.getElementById(event.target.id);

  if (id.classList.contains(player1) || id.classList.contains(player2)) {
    alert('déjà joué!');
  } else {
    changeClass(id);
    winner = checkWin();
    if(winner) {
      alertWin()
    } else {
      if (round < 8 ) {
        setNextPlayer();
        round = round +1;
      } else {
        alertNobodyWins()
      }
    }
  }
});

function alertWin() {
  let elementRef = document.getElementById('alert');
  elementRef.classList.add(alertClass);
  elementRef.innerText = 'Bravo, il y a un gagnant : ' +nextPlayer;
}

function alertNobodyWins() {
  var elementRef = document.getElementById('alert');
  elementRef.classList.add(alertClass);
  elementRef.innerText = 'Joueurs trop malins 😘';
}

function alertReset() {
  let elementRef = document.getElementById('alert');
  elementRef.classList.remove(alertClass);
  elementRef.innerText = '';
}

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
  } else {
    return false;
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

function reset() {
  const elementsByPlayer1 = document.querySelectorAll(`.${player1} `);
  const elementsByPlayer2 = document.querySelectorAll(`.${player2} `);

  elementsByPlayer1.forEach((el) => {
    el.classList.remove(player1);
    }
  );
  elementsByPlayer2.forEach((el) => {
    el.classList.remove(player2);
    }
  );

  round = 0;
  alertReset();
}
