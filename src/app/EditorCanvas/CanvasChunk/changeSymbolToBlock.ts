import { CanvasPosition } from './';

export const changeSymbolToBlock = (
    symbol: number,
    canvasPosition: CanvasPosition | null,
    reset = false
): number => {
    const offset = 32 * 3;
    let newSymbol = 0;

    switch (canvasPosition) {
        case CanvasPosition.TOPRIGHT:
            if (reset) {
                newSymbol = (symbol > offset) ? (symbol & ~1) : 0;
            } else {
                newSymbol = (symbol > offset) ? (symbol | 1) : offset + 1;
            }
            break;
        case CanvasPosition.TOPLEFT:
            if (reset) {
                newSymbol = (symbol > offset) ? (symbol & ~2) : 0;
            } else {
                newSymbol = (symbol > offset) ? (symbol | 2) : offset + 2;
            }
            break;
        case CanvasPosition.BOTTOMRIGHT:
            if (reset) {
                newSymbol = (symbol > offset) ? (symbol & ~4) : 0;
            } else {
                newSymbol = (symbol > offset) ? (symbol | 4) : offset + 4;
            }
            break;
        case CanvasPosition.BOTTOMLEFT:
            if (reset) {
                newSymbol = (symbol > offset) ? (symbol & ~8) : 0;
            } else {
                newSymbol = (symbol > offset) ? (symbol | 8) : offset + 8;
            }
            break;
    }
    return newSymbol;
};
