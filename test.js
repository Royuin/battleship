import {shipFactory} from './script';

test('shipFactory object is marked as sunk when hits are equal to shipFactory length',() => {
  const mockShip = shipFactory(2)
    mockShip.hit();
    mockShip.hit();
    mockShip.isSunk();
  expect(mockShip.sunk).toBe(true);
}) 

test('shipFactory object is marked as not sunk while hits are less than ship length', () => {
  const mockShip = shipFactory(3);
  mockShip.hit();
  mockShip.isSunk();
  expect(mockShip.sunk).toBe(false);
})