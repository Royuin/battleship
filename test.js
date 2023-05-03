import { shipFactory, gameboardFactory } from './script';

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
  mockBoard.addShip('b', 3, 'f', 3);
  expect(
    mockBoard.b[2] &&
      mockBoard.c[2] &&
      mockBoard.d[2] &&
      mockBoard.e[2] &&
      mockBoard.f[2]
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

