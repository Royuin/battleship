import { shipFactory, gameboardFactory, playerFactory, } from './script.js';
import { createRowCells, displayColNums, displayP1Board, displayCompBoard, main} from './dom.js';

test('shipFactory object is marked as sunk when hits are equal to shipFactory length', () => {
  const mockShip = shipFactory(2);
  mockShip.hit();
  mockShip.hit();
  mockShip.isSunk();
  expect(mockShip.sunk).toBe(true);
});

test('shipFactory object is marked as not sunk while hits are less than ship length', () => {
  const mockShip = shipFactory(3);
  mockShip.hit();
  mockShip.isSunk();
  expect(mockShip.sunk).toBe(false);
});

test('test if gameboard addShip adds ship to coordinates horizontally', () => {
  const mockBoard = gameboardFactory();
  mockBoard.addShip('b', 3);
  expect(
    mockBoard.b[2] &&
      mockBoard.b[3] &&
      mockBoard.b[4] &&
      mockBoard.b[5]
  ).toBeDefined();
});

test('test if gameboard addShip adds ship to coordinates vertically', () => {
  const mockBoard = gameboardFactory();
  mockBoard.addShip('d', 2, 'd',6);
  expect(
    mockBoard.d[1] &&
    mockBoard.d[2] &&
    mockBoard.d[3] &&
    mockBoard.d[4] &&
    mockBoard.d[5]
  ).toBeDefined();
})

test('when ship is added if all other spaces are still undefined', () => {
  const mockBoard = gameboardFactory();
  mockBoard.addShip('b', 3);
  const equalUndefined = (item) => {
    return item === undefined
  }

let bArray = (mockBoard.b.slice(7, 10));
bArray.push(...mockBoard.b.slice(0, 2));

  expect(
   mockBoard.a.every(equalUndefined) &&
   bArray.every(equalUndefined) &&
   mockBoard.c.every(equalUndefined) &&
   mockBoard.d.every(equalUndefined) &&
   mockBoard.e.every(equalUndefined) && 
   mockBoard.f.every(equalUndefined) &&
   mockBoard.g.every(equalUndefined) &&
   mockBoard.h.every(equalUndefined) &&
   mockBoard.i.every(equalUndefined) &&
   mockBoard.j.every(equalUndefined)
  ).toBe(true)
})

test('gameboard receive attack method calling hit for that ship', () => {
  const mockBoard = gameboardFactory();
  mockBoard.addShip('b', 3, 'f', 3);
  mockBoard.receiveAttack('c', 3);
  expect(
    mockBoard.b[2].hits
  ).toBe(1);
})

test('gameboard receive attack method changed value to miss if coordinates are incorrect', () => {
  const mockBoard = gameboardFactory();
  mockBoard.addShip('b', 3, 'f', 3);
  mockBoard.receiveAttack('b', 2);
  expect(
    mockBoard.b[1]
  ).toBe('miss');
})

test('gameboard reporting if all ships have been sunk', () => {
  const mockBoard = gameboardFactory();
  mockBoard.addShip('b', 3);
  mockBoard.receiveAttack('b', 3);
  mockBoard.receiveAttack('b', 4);
  mockBoard.receiveAttack('b', 5);
  expect(mockBoard.receiveAttack('b', 6)).toBe('You lost!'); 
})

test('gameboard receiveAttack changing coordinate value to hit', () => {
    const mockBoard = gameboardFactory();
    mockBoard.addShip('b', 2, 'f',2);
    mockBoard.receiveAttack('c', 2);
    expect(mockBoard.c[1]).toBe('hit')
})

test('changing number of hits on ship when receiveAttack coordinates are correct', () => {
  const mockBoard = gameboardFactory();
  mockBoard.addShip('b', 2, 'f',2);
  mockBoard.receiveAttack('c', 2);
  expect(mockBoard.b[1].hits).toBe(1);
})

test('player attacking computer changing computer ship hits when coordinates are correct', () => {
  let p1 = playerFactory('player');
  let p2 = playerFactory('computer');
  p1.attack =  function(x,y ) {    
    return p2.gameboard.receiveAttack(x,y);
  }
  p2.gameboard.addShip('b', 2, 'b', 6);
  p1.attack('b', 3);
  expect(p2.gameboard.ships[0].hits).toBe(1);
})

test('computer taking turn after player takes their turn', () => {
  let p1 = playerFactory('player');
  let p2 = playerFactory('computer');
  p2.attack = function () {
    let compX = p1.gameboard.row[Math.floor(Math.random() * p1.gameboard.row.length)]
    let compY = Math.floor(Math.random() * 10);
    p1.gameboard.receiveAttack(compX,compY);
  };
  p1.attack =  function(x,y ) {    
    p2.attack();
  };
  p2.gameboard.addShip('b', 2, 'b', 6);
  p1.attack('b', 3);
  function valueChanged() {
    for(let i = 0; i < p1.gameboard.row.length; i ++) {
      let index = p1.gameboard.row[i];
      let row = p1.gameboard[index];
      if (row.includes('miss')) {
        return true;
      } 
    }
  }
  expect(valueChanged()).toBe(true)
})

