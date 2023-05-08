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
  return {
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
    
    addShip: function (x, y, x2, y2) {
      if (x !== x2 && y !== y2) {
        throw new Error('Invalid Coordinates Soldier!');
      }
      const thisShip = shipFactory(5)
      this.ships.push(thisShip);
      if (x === x2) {
        for (let i = y-1 ; i < y2; i += 1 ) {
          this[x][i] = thisShip;
        }
      } else {
        const rowArray = this.row;
        const rowIndex1 = rowArray.indexOf(x);
        const rowIndex2 = rowArray.indexOf(x2); 
        for (let i = rowIndex1; i <= rowIndex2; i += 1) {
          const value = rowArray[i];
          const currentRow = this[value];
          currentRow[y2 - 1] = thisShip;  
        }
      }
    },
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
    ships: []
    
  };
}

export function playerFactory(name) {
  const gameboard = gameboardFactory();
  return {
    name,
    gameboard,
    attack: function(x,y ) {      
      p2.gameboard.receiveAttack(x,y);
    }
  }
}
