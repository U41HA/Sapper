// export function setBombValue(arr: any[][]) {
//     for (let i = 0; i < arr.length; i++) {
//       for (let j = 0; j < arr[i].length; j++) {
//         for (let k = i - 1; k <= i + 1; k++) {
//           for (let f = j - 1; f <= j + 1; f++) {
//             if (k >= 0 && f >= 0 && k < arr.length && f < arr[0].length && arr[k][f].isBomb && !arr[i][j].isBomb) {
//               arr[i][j].bombAround++
//             }
//           }
//         }
//       }
//     }
//   }


export function setBombValue(arr: any[][]) {
  arr.forEach((item, yIndex) => item.forEach((item2, xIndex) => {
    for (let y = yIndex - 1; y <= yIndex + 1; y++) {
      for (let x = xIndex - 1; x <= xIndex + 1; x++) {
        if (y >= 0 && x >= 0 && y < arr.length && x < item.length && arr[y][x].isBomb && !item2.isBomb) {
          item2.bombAround++
        }
      }
    }
  }))
}