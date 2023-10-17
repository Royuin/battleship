import {
  displayCompBoard,
  displayP1Board,
  updateDomBoard,
  attackQuerySelectors,
  updateWinner,
  addShipListeners,
  addShipListenersHorizontal,
} from './dom.js';

export function shipFactory(length) {
  return {
    length,
    hits: 0,
    sunk: false,
    isSunk: function () {
      if (this.hits === this.length) {
        this.sunk = true;
      }
    },
    hit: function () {
      this.hits += 1;
      this.isSunk();
    },
  };
}

export function gameboardFactory() {
  let newShip;
  return {
    ships: [],
    row: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    a: [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
    b: [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
    c: [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
    d: [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
    e: [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
    f: [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
    g: [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
    h: [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
    i: [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
    j: [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],

    addShip: function (x, y, horizontal) {
      if (this.ships.length === 0) {
        newShip = shipFactory(4);
      } else if (this.ships.length > 0 && this.ships.length < 3) {
        newShip = shipFactory(3);
      } else if (this.ships.length > 2 && this.ships.length < 5) {
        newShip = shipFactory(2);
      } else if (this.ships.length > 5 && this.ships.length < 10) {
        newShip = shipFactory(1);
      } else if (this.ships.length >= 10) {
        throw new Error("You're out of ships soldier");
      }

      if (this.invalidCoordinates(x, y, newShip.length, horizontal) === true) {
        return new Error('Invalid Coordinates Soldier!');
      }

      if (newShip.length === 1) {
        if (this[x][y - 1] !== undefined) {
          return new Error('Coordinates already attacked!');
        } else {
          this[x][y - 1] = newShip;
          this.ships.push(newShip);
        }
      } else if (!horizontal) {
        for (let i = 0; i < newShip.length; i += 1) {
          if (this[x][y + i - 1] !== undefined) {
            return new Error('Coordinates already attacked!');
          }
          this[x][y + i - 1] = newShip;
        }
        this.ships.push(newShip);
      } else if (horizontal) {
        let xIndex = this.row.indexOf(x);
        for (let i = 0; i < newShip.length; i += 1) {
          let newIndex;
          if (i === 0) {
            newIndex = xIndex;
          } else {
            newIndex = xIndex + i;
          }
          let newX = this.row[newIndex];
          if (this[newX][y] !== undefined) {
            return new Error('Coordinate already attacked!');
          } else {
            this[x][y - 1] = newShip;
            this[newX][y - 1] = newShip;
          }
        }
        this.ships.push(newShip);
      }
    },
    invalidCoordinates(x, y, shipLength, horizontal) {
      if (!horizontal) {
        if (y - 1 + newShip.length > 10) {
          return true;
        }
        for (let i = 0; i < shipLength; i += 1) {
          if (this[x][y + i - 1] !== undefined) {
            return true;
          }
        }
      } else {
        if (horizontal && this.row.indexOf(x) + newShip.length > 10) {
          console.log('ERROR');
          return TextTrackCueList;
        }
        for (let i = 0; i < shipLength; i += 1) {
          let xIndex = this.row.indexOf(x) + i;
          let updatedX = this.row[xIndex];

          if (this[updatedX][y - 1] !== undefined) {
            console.log('ERROR');
            return true;
          }
        }
      }
    },
    receiveAttack: function (x, y, p2Attack) {
      if (this.ships.every((ship) => ship.sunk === true)) {
        if (p2Attack) {
          gameOver = true;
          updateWinner(p1);
        } else {
          updateWinner(p2);
          gameOver = true;
        }
        return;
      } else if (this[x][y - 1] === undefined) {
        this[x][y - 1] = 'miss';
        if (p2Attack) {
          p2.attack();
        }
      } else if (this[x][y - 1] === 'hit' || this[x][y - 1] === 'miss') {
        if (!p2Attack) {
          p2.attack();
        } else {
          return new Error('Coordinates already attacked!');
        }
      } else if (typeof this[x][y - 1] === 'object') {
        this[x][y - 1].hit();
        this[x][y - 1] = 'hit';
        if (p2Attack) {
          p2.attack();
        }
      }
    },
    fillBoard: function () {
      while (this.ships.length < 10) {
        const horizontal = Math.round(Math.random() * 1 + 0);
        let letter = this.row[Math.floor(Math.random() * this.row.length)];
        let num = Math.floor(Math.random() * 10 + 1);
        if (horizontal === 0) {
          this.addShip(letter, num);
        } else if (horizontal === 1) {
          this.addShip(letter, num, true);
        }
      }
    },
  };
}

export function playerFactory(name) {
  const gameboard = gameboardFactory();
  let attack = function (x, y) {
    p2.gameboard.receiveAttack(x, y, p2.attack);
  };
  if (name === 'computer') {
    attack = function () {
      let compX =
        gameboard.row[Math.floor(Math.random() * gameboard.row.length)];
      let compY = Math.floor(Math.random() * 10 + 1);
      p1.gameboard.receiveAttack(compX, compY);
    };
  }
  return {
    name,
    gameboard,
    attack,
  };
}

export const main = document.querySelector('main');

let p1 = playerFactory('player');
let p1Board = p1.gameboard;
let p2 = playerFactory('computer');
let p2Board = p2.gameboard;
let gameOver = false;

displayP1Board(p1Board);
displayCompBoard(p2Board);
addShipListeners(p1, p2);

const startListener = document.querySelector('.start-button');
const axisBtn = document.querySelector('.axis-button');

startListener.addEventListener('click', () => {
  if (p1.gameboard.ships.length < 10) {
    return alert('You need to add your ships first!');
  } else if (gameOver) {
    p1 = playerFactory('player');
    p2 = playerFactory('computer');
    displayP1Board(p1.gameboard);
    displayCompBoard(p2.gameboard);
    addShipListeners(p1, p2);
    gameOver = false;
    updateWinner();
  } else {
    p2.gameboard.fillBoard();
    displayP1Board(p1.gameboard);
    displayCompBoard(p2.gameboard);
    updateDomBoard(p1, p2);
    attackQuerySelectors(p1, p2);
  }
});

axisBtn.addEventListener('click', () => {
  if (p1.gameboard.ships.length === 10) {
    return;
  }
  displayP1Board(p1Board);
  displayCompBoard(p2Board);
  updateDomBoard(p1, p2);
  if (axisBtn.textContent === 'Axis: Y') {
    addShipListenersHorizontal(p1, p2);
    axisBtn.textContent = 'Axis: X';
  } else if (axisBtn.textContent === 'Axis: X') {
    addShipListeners(p1, p2);
    axisBtn.textContent = 'Axis: Y';
  }
});
