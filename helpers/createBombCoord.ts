import { getRandomFromInterval } from "./getRandomFromInterval"
import { coordToNumber } from '~~/helpers/coordToNumber'
export function createBombCoord (column: number, line:number, bombCount: number, clickTarget: number[]) {
    const randomNumber: number[] = []
    const cellCount = column * line
    const clickedCell = coordToNumber(clickTarget, line, column)
    for (let i = 0; i < bombCount; i++) {
      let randomNum = getRandomFromInterval(0, cellCount - 1)
      while (randomNumber.includes(randomNum) || randomNum === clickedCell) {
        randomNum = getRandomFromInterval(0, cellCount - 1)
      }
      randomNumber.push(randomNum)
    }
    const randomCoords = randomNumber.map(item => new Array(Math.floor(item / line), (item % line)))
    
    return randomCoords
  }