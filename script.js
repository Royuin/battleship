export function shipFactory(length) {
  return {
    length,
    hits: 0,
    sunk: false,
    isSunk: function() {
      if (this.hits === this.length) {
        this.sunk = true;
      } else {
        
      }
    }
  }
}