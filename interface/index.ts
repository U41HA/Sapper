export interface Level {
    id: number,
    name: string,
    line: number,
    column: number,
    bombCount: number,
    firstClick: boolean,
    flagsCount: number
    matrix: any[][]
}

export interface ICell {
    isBomb: boolean,
    bombAround: number,
    isVisible: boolean,
    isDisabled: boolean
}

export interface IRecord {
    userName: string
    time: string,
    level: string
}