import { displayCompBoard, displayP1Board } from "./dom.js";

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
    
    addShip: function (x, y) {
      if (this.ships.length === 0) {
        newShip = shipFactory(4)
      }  else if (this.ships.length > 0 && this.ships.length < 3 ) {
        newShip = shipFactory(3)      
      } else if (this.ships.length > 2 && this.ships.length < 6 ) {
        newShip = shipFactory(2);
      }  else if (this.ships.length > 6 && this.ships.length < 10) {
        newShip = shipFactory(1);
      } else if (this.ships.length > 10) {
        throw new Error("You're out of ships soldie");
      }

      if (y + newShip.length > 10) {
        throw new Error('Invalid Coordinates Soldier!');
      }
      this.ships.push(newShip);

      if (newShip.length === 1) {
        this[x][y] = newShip;
      }
       
        for (let i = 0; i < newShip.length; i += 1) {
          if (i === 0) {
            this[x][y - 1] = newShip;
          } else {
        this[x][y + i - 1] = newShip;
          }
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



const p1 = playerFactory('player');
let p1Board = p1.gameboard;
let p2 = playerFactory('computer')
let p2Board = p2.gameboard;

displayP1Board(p1Board);
displayCompBoard(p2Board);
// p1.gameboard.addShip('b', 3);

