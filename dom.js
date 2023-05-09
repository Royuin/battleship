export function createRowCells(dom, array, row) {
  for (let i = 0; i < array.length; i += 1) {
    const cell = document.createElement('div');
    cell.classList = 'cell';
    cell.id = `${row}${i + 1}`
    dom.appendChild(cell);
  }
}

export function displayP1Board(board) {
  const boardsSection = document.querySelector('.boards');
  const p1Grid = document.createElement('div');
  p1Grid.classList = 'grid1';
  boardsSection.appendChild(p1Grid)
  for(let i = 0; i < board.row.length; i += 1) {
    let index = board.row[i];
    let row = board[index];
    createRowCells(p1Grid, row, index)
  }
}

export function displayCompBoard(board) {  
  const boardsSection = document.querySelector('.boards');
  const compGrid = document.createElement('div');
  compGrid.classList = 'grid1';
  boardsSection.appendChild(compGrid)
  for(let i = 0; i < board.row.length; i += 1) {
    let index = board.row[i];
    let row = board[index];
    createRowCells(compGrid, row, index)
  }
}
