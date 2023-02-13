export function setBombs(arr: number[][], matrix: any[][]) {
    for (let i = 0; i < arr.length; i++) {
      matrix[arr[i][0]][arr[i][1]] = { ...{ isBomb: true, bombAround: 0, isVisible: true, isDisabled: false } }
    }
  }