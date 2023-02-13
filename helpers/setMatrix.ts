import { Level } from '~~/interface'
import { createBombCoord } from '~~/helpers/createBombCoord'
import { setBombs } from '~~/helpers/setBombs'
import { setBombValue } from '~~/helpers/setBombValue'

export function setMatrix(level: Level, clickTarget: number[]): any[][] | void {
    const bombCoords = createBombCoord(level.column, level.line, level.bombCount, clickTarget)
      setBombs(bombCoords, level.matrix)
      setBombValue(level.matrix)
      level.firstClick = false
}