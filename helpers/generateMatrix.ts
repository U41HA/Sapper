export function generateMatrix(matrix: any[][]) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        matrix[i][j] = { ...{ isBomb: false, bombAround: 0, isVisible: true, isDisabled: false, isDoubt: false } }
      }
    }
  }