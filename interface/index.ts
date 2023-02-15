export interface IMemory {
    bombCount: number,
    flagsCount: number,
    emptyCell: number
}
export interface Level {
    id: number,
    name: string,
    line: number,
    column: number,
    bombCount: number,
    firstClick: boolean,
    flagsCount: number,
    emptyCell: number,
    matrix: any[][],
    memory: IMemory
}

export interface ICell {
    isBomb: boolean,
    bombAround: number,
    isVisible: boolean,
    isDisabled: boolean,
    isDoubt: boolean
}

export interface IRecord {
    userName: string
    time: number,
    level: string,
    column: number,
    line: number,
    bombCount: number
}

export interface IOptions {
    fieldColumn: number
    fieldLine: number
    bombCount: number
}