class Player {
  constructor(name, isHuman) {
    this.name = name;
    this.isHuman = isHuman;
  }
}

const player1 = new Player('player1');
const player2 = new Player('player2');
const buttonReset = 'buttonReset';
const alertClass = 'alert';

const tableNode = document.getElementById('game');
const containerNode = document.getElementById('container');

let nextPlayer = null;
let round = 0;
let win = false;

containerNode.addEventListener('click', function (event) {
  item = document.getElementById(event.target.id);

  if (item.classList.contains(buttonReset)) {
    reset();
  } else {
    event.stopPropagation();
  }
});

tableNode.addEventListener('click', function (event) {
  id = document.getElementById(event.target.id);

  if (!id.classList.contains(player1.name) && !id.classList.contains(player2.name)) {
    if (win) {
      alertWin()
    } else {
      changeClass(id);
      if (checkWin()) {
        win = true;
        alertWin()
      } else {
        if (round < 8) {
          setNextPlayer();
          round = round + 1;
        } else {
          alertNobodyWins()
        }
      }
    }
  }
});

function alertWin() {
  let elementRef = document.getElementById('alert');
  elementRef.classList.add(alertClass);
  elementRef.innerText = 'Bravo 💪, il y a un gagnant : ' + nextPlayer;
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

  const td = document.querySelectorAll(`.${nextPlayer}`);

  const choicesPlayer = [];

  td.forEach((el) => {
    choicesPlayer.push(parseInt(el.id));
  });

  function isInIdsPlayer(id) {
    return choicesPlayer.includes(id);
  }

  function isWin(combo) {
    return combo.every(isInIdsPlayer);
  }

  return winCombos.some(isWin);

  //return winCombos.some(combo => combo.every(choicesPlayer.includes));
}

function changeClass(id) {
  if (nextPlayer === null) {
    id.classList.add(player1.name);
  } else {
    id.classList.add(nextPlayer);
  }
}

function setNextPlayer() {
  if (nextPlayer === null || nextPlayer === player1.name) {
    nextPlayer = player2.name
  } else {
    nextPlayer = player1.name
  }
}

function reset() {
  const elements = document.querySelectorAll(`.cell `);
  elements.forEach((el) => {
      el.className = 'cell';
    }
  );

  round = 0;
  win = false;
  alertReset();
}
