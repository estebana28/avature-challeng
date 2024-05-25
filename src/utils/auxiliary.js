// Auxiliary and reusable functions

export const findBox = (boxes, row, col) => {
  for (const box in boxes) {
    if (boxes[box].dataset.row === row && boxes[box].dataset.col === col) {
      return boxes[box]
    }
  }
}