export function createRowCells(dom, array, row) {
  for (let i = 0; i < array.length; i += 1) {
    const cell = document.createElement('div');
    cell.classList = 'cell';
    cell.id = `${row}${i + 1}`
    dom.appendChild(cell);
  }
}