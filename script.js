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
        throw new Error('Invalid Coordinates Soldier');
      }
      const carrier = shipFactory(5);
      if (x === x2) {
        for (let i = y -1; i <= y2; i += 1 ) {
          this[x][i] = carrier;
        }
      } else {
         const rowArray = this.row;
         const rowIndex1 = rowArray.indexOf(x);
         const rowIndex2 = rowArray.indexOf(x2);
         
         for (let i = rowIndex1 - 1; i <= rowIndex2; i += 1) {
          const value = rowArray[i];
          const currentRow = this[value];
          currentRow[y2 - 1] = carrier;
        }
      }
    },
  };
}

