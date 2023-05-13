import { displayCompBoard, displayP1Board, updateDomBoard } from "./dom.js";

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
      undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    ],
    b: [
      undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    ],
    c: [
      undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    ],
    d: [
      undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    ],
    e: [
      undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    ],
    f: [
      undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    ],
    g: [
      undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    ],
    h: [
      undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    ],
    i: [
      undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    ],
    j: [
      undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    ],
    
    addShip: function (x, y, horizontal) {
      if (this.ships.length === 0) {
        newShip = shipFactory(4)
      }  else if (this.ships.length > 0 && this.ships.length < 3 ) {
        newShip = shipFactory(3)      
      } else if (this.ships.length > 2 && this.ships.length < 6 ) {
        newShip = shipFactory(2);
      }  else if (this.ships.length > 6 && this.ships.length < 10) {
        newShip = shipFactory(1);
      } else if (this.ships.length > 10) {
        throw new Error("You're out of ships soldier");
      }
      
      if (!horizontal && y + newShip.length > 10) {
       return new Error('Invalid Coordinates Soldier!');
      } else if (horizontal && this.row[this.row.indexOf(x) + newShip.length] > 10) {
        return new Error('Invalid Coordinates Soldier!');
      }

      if (newShip.length === 1) {
        if (this[x][y] !== undefined) {
          return new Error('Coordinates already attacked!');
        }
        this[x][y] = newShip;
      } 
      if (!horizontal) {
        for (let i = 0; i < newShip.length; i += 1) {
          let yIndex = y + i - 1 
          if ( this[x][yIndex] !== undefined) {
            return new Error('Coordinates already attacked!');
          } 
          this[x][y + i - 1] = newShip;
          }
          this.ships.push(newShip);
      } else if (horizontal) {
        let xIndex = this.row.indexOf(x);
        for (let i = 0; i < newShip.length; i += 1) {
          let newIndex = xIndex + i;
          let newX = this.row[newIndex];
          if (this[newX][y- 1] !== undefined) {
            return new Error('Coordinate already attacked!');
          } 
          this[x][y-1] = newShip;
          this[newX][y - 1] = newShip;
        }
        this.ships.push(newShip);
      }
      }
  ,
    receiveAttack: function(x, y) {
      if (this[x][y - 1] === undefined) {
        this[x][y - 1] = 'miss';
      } else {  
        this[x][y - 1].hit();
        this[x][y - 1] = 'hit';
        if (this.ships.every(ship => ship.sunk === true)) {
          return ('You lost!');
        }
      }
    },
    fillBoard: function() {
      while (this.ships.length < 10) { 
      let letter = this.row[Math.floor(Math.random() *  this.row.length)]
      let num = Math.floor(Math.random() * 10 + 1);
      this.addShip(letter, num);
    }
    },
  };
}

export function playerFactory(name) {
  const gameboard = gameboardFactory();
  let attack = function(x,y ) {      
    p2.gameboard.receiveAttack(x,y);
    p2.attack()
  };
  if (name === 'computer') {
    attack = function () {
      let compX = gameboard.row[Math.floor(Math.random() * gameboard.row.length)]
      let compY = Math.floor(Math.random() * 10);
      p1.gameboard.receiveAttack(compX,compY);
    };
  };
  return {
    name,
    gameboard,
    attack,
  }
}

export const main = document.querySelector('main');

const p1 = playerFactory('player');
let p1Board = p1.gameboard;
const p2 = playerFactory('computer')
let p2Board = p2.gameboard;

p1.gameboard.fillBoard();
displayP1Board(p1Board);
displayCompBoard(p2Board);

updateDomBoard(p1);