export function createRowCells(dom, array, row) {
  for (let i = 0; i < array.length; i += 1) {
    const cell = document.createElement('div');
    cell.classList = 'cell';
    cell.id = `${row}${i + 1}`
    dom.appendChild(cell);
  }
}

 function displayColNums(playerGrid, boards) {
  const row = document.createElement('div');
  row.classList = 'num-row';
  for (let i = 1; i <= 10; i += 1) {
    const num = document.createElement('p');
    num.textContent = i.toString();
    row.appendChild(num);
  }
  playerGrid.insertBefore(row, boards)
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
    createRowCells(compGrid, row, index)
  }
}
