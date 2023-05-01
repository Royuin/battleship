import {shipFactory} from './script';

test('shipFactory object is marked as sunk when hit equal to as many times as shipFactory length',() => {
  if (shipFactory.hits === shipFactory.length) {
  expect(shipFactory.isSunk()).sunk.toBe(true);
  } 
}) 
