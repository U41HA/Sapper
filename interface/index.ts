export interface Level {
    id: number,
    name: string,
    line: number,
    column: number,
    bombCount: number,
    firstClick: boolean,
    matrix: any[][]
}

export interface ICell {
    isBomb: boolean,
    bombAround: number,
    isVisible: boolean,
    isDisabled: boolean
}