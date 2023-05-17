export function createRowCells(dom, array, row) {
  for (let i = 0; i < array.length; i += 1) {
    const cell = document.createElement('div');
    cell.classList = 'cell';
    dom.appendChild(cell);
  }
}


export function displayP1Board(board) {
  const main = document.querySelector('main')
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
  let cells;

  cells = document.querySelectorAll('.grid1 > .cell')
  for (let l = 0; l < letterArray.length; l += 1 ) {
    let thisLetter = letterArray[l];
    for (let n = 0; n < 10; n += 1) {
      const value = p1.gameboard[thisLetter][n];
      const thisCell = cells[(l * 10) + n];    
      if (typeof value === 'object') {
        thisCell.classList = 'cell ship'
      } else if (value === 'hit') {
          thisCell.classList = ' cell hit';
      } else if (value === 'miss') {
          thisCell.classList= 'cell miss';
        } 
      }
    }
  
    cells = document.querySelectorAll('.grid2 > .cell')
    for (let l = 0; l < letterArray.length; l += 1 ) {
      let thisLetter = letterArray[l];
      for (let n = 0; n < 10; n += 1) {
      const thisCell = cells[(l * 10) + n];
      const value = p2.gameboard[thisLetter][n];
      if (value === 'hit') {
        thisCell.classList = 'cell hit';
      } else if (value === 'miss') {
          thisCell.classList = 'cell miss';
      }
    }
  }
}

