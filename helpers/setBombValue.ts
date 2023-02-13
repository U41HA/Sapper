export function setBombValue(arr: any[][]) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        for (let k = i - 1; k <= i + 1; k++) {
          for (let f = j - 1; f <= j + 1; f++) {
            if (k >= 0 && f >= 0 && k < arr.length && f < arr[0].length && arr[k][f].isBomb && !arr[i][j].isBomb) {
              arr[i][j].bombAround++
            }
          }
        }
      }
    }
  }