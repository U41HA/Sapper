export function coordToNumber (coords: number[], matrixWidth: number, matrixHeight: number) {
    return coords[0] * matrixWidth + coords[1]
}