export function createRowCells(dom, array, row) {
  for (let i = 0; i < array.length; i += 1) {
    const cell = document.createElement('div');
    cell.classList = 'cell hover';
    dom.appendChild(cell);
  }
}


export function displayP1Board(board) {
  const main = document.querySelector('main')
  if (document.querySelector('.board1')) {
    main.removeChild(document.querySelector('.board1'))
  }
  const board1 = document.createElement('div');
  board1.classList = 'board1';
  displayColNums(board1);
  const p1Grid = document.createElement('div');
  p1Grid.classList = 'grid1';
  main.appendChild(board1);
  board1.appendChild(p1Grid);
  for(let i = 0; i < board.row.length; i += 1) {
    let index = board.row[i];
    let row = board[index];
    const colLetter = document.createElement('p');
    colLetter.textContent = board.row[i];
    p1Grid.appendChild(colLetter);
    createRowCells(p1Grid, row, index);
  }
}

export function displayCompBoard(board) {  
  const main = document.querySelector('main');
  if (document.querySelector('.board2')) {
    main.removeChild(document.querySelector('.board2'))
  }
  const board2 = document.createElement('div');
  board2.classList = 'board2';
  const compGrid = document.createElement('div');
  compGrid.classList = 'grid2';
  main.appendChild(board2);
  board2.appendChild(compGrid);
  displayColNums(board2, compGrid);
  for(let i = 0; i < board.row.length; i += 1) {
    let index = board.row[i];
    let row = board[index];
    const colLetter = document.createElement('p');
    colLetter.textContent = board.row[i];
    compGrid.appendChild(colLetter);
    createRowCells(compGrid, row, index)
  }
}

function displayColNums(playerGrid, boards) {
 const row = document.createElement('div');
 row.classList = 'num-row';
 const blank = document.createElement('p');
 row.appendChild(blank)
 for (let i = 1; i <= 10; i += 1) {
   const num = document.createElement('p');
   num.textContent = i.toString();
   row.appendChild(num);
 }
 playerGrid.insertBefore(row, boards)
}

export function updateDomBoard(p1,p2) {
  const letterArray = p1.gameboard.row;

  let p1Cells = document.querySelectorAll('.grid1 > .cell')
  for (let l = 0; l < letterArray.length; l += 1 ) {
    let thisLetter = letterArray[l];
    for (let n = 0; n < 10; n += 1) {
      const value = p1.gameboard[thisLetter][n];
      const thisCell = p1Cells[(l * 10) + n];    
      if (typeof value === 'object') {
        thisCell.classList = ' cell ship'
      } else if (value === 'hit') {
          thisCell.classList = ' cell hit';
      } else if (value === 'miss') {
          thisCell.classList = ' cell miss';
        } 
      }
    }
  
    let p2Cells = document.querySelectorAll('.grid2 > .cell')
    for (let l = 0; l < letterArray.length; l += 1 ) {
      let thisLetter = letterArray[l];
      for (let n = 0; n < 10; n += 1) {
        const value = p2.gameboard[thisLetter][n];
      const thisCell = p2Cells[(l * 10) + n];
      if (value === 'hit') {
        thisCell.classList = ' cell hit';
      } else if (value === 'miss') {
          thisCell.classList = ' cell miss';
      }
    }
  }
}

export function attackQuerySelectors(p1, p2) {
  const cellList = document.querySelectorAll('.grid2 > .cell');
  for (let i = 0; i < cellList.length; i += 1) {
    let currentCell = cellList[i];
    
    currentCell.addEventListener('click', () => {
      if (i < 10) {
        p1.attack('a', i + 1);
      } else if (i < 20 ) {
        p1.attack('b', i - 10 + 1);
      } else if (i < 30) {
        p1.attack('c', i - 20 + 1);
      } else if (i < 40) {
        p1.attack('d', i - 30 + 1);
      } else if (i < 50) {
        p1.attack('e', i - 40 + 1);
      } else if (i < 60) {
        p1.attack('f', i - 50 + 1);
      } else if (i < 70) {
        p1.attack('g', i - 60 + 1);
      } else if (i < 80) {
        p1.attack('h', i -70 + 1);
      } else if (i < 90) {
        p1.attack('i', i -80 + 1);
      } else if (i < 100) {
        p1.attack('j', i -90 + 1);
      }
      updateDomBoard(p1, p2)
    });
  }
}

export function updateWinner(player) {
  const winnerMessage = document.querySelector('.winner-message')
  if (!player) {
    winnerMessage.textContent = '';
  } else if (player.name === 'player') {
    winnerMessage.textContent = 'YOU WIN!';
  } else if (player.name === 'computer') {
    winnerMessage.textContent = 'YOU LOSE!';
  } 
}

export function addShipListeners(p1, p2) {
  const cellList = document.querySelectorAll('.grid1 > .cell');

  for (let i = 0; i < cellList.length; i += 1) {
    let currentCell = cellList[i];

    let newShipLength

    currentCell.addEventListener('mouseenter', () => {
      if (p1.gameboard.ships.length === 0) {
        newShipLength = 4
      }  else if (p1.gameboard.ships.length > 0 && p1.gameboard.ships.length < 3 ) {
        newShipLength = 3      
      } else if (p1.gameboard.ships.length > 2 && p1.gameboard.ships.length < 5 ) {
        newShipLength = 2;
      }  else if (p1.gameboard.ships.length > 5 && p1.gameboard.ships.length < 10) {
        newShipLength = 1;
      } else if (p1.gameboard.ships.length >= 10) {
        return;
      }
    
      let thisCellList = [currentCell,];
      for (let n = 1; n < newShipLength; n +=1) {
        if (i + n >= 100) {
          return;
        } else {
        thisCellList.push(cellList[i + n]);
        }
      }   
      
      thisCellList.forEach(cell => {
        cell.classList.add('hovered')
      });

      currentCell.addEventListener('mouseleave', () => {
       thisCellList.forEach(cell => {
        cell.classList.remove('hovered');
       }) 
      })
    })

    currentCell.addEventListener('click', () => {
      if (i < 10) {
        p1.gameboard.addShip('a', i + 1);
      } else if (i < 20 ) {
        p1.gameboard.addShip('b', i - 10 + 1);
      } else if (i < 30) {
        p1.gameboard.addShip('c', i - 20 + 1);
      } else if (i < 40) {
        p1.gameboard.addShip('d', i - 30 + 1);
      } else if (i < 50) {
        p1.gameboard.addShip('e', i - 40 + 1);
      } else if (i < 60) {
        p1.gameboard.addShip('f', i - 50 + 1);
      } else if (i < 70) {
        p1.gameboard.addShip('g', i - 60 + 1);
      } else if (i < 80) {
        p1.gameboard.addShip('h', i -70 + 1);
      } else if (i < 90) {
        p1.gameboard.addShip('i', i -80 + 1);
      } else if (i < 100) {
        p1.gameboard.addShip('j', i -90 + 1);
      } 
      updateDomBoard(p1, p2)
    }); 
  }
}

