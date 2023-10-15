import {changeSymbolToBlock} from './changeSymbolToBlock';
import {CanvasField} from '@/app/models/canvas-field';
import {SymbolsMode} from '@/app/models/symbols-mode';
import {CanvasPosition} from '@/app/editor-canvas/canvas-chunk/canvas-chunk';

interface GetSymbolBlockProps {
    reset: boolean,
    symbol: number,
    canvasField: CanvasField,
    symbolsMode: SymbolsMode,
    canvasSymbol: number,
    quickCanvasPosition: CanvasPosition | null
}

export const getSymbolBlock = ({
                                   reset,
                                   symbol,
                                   canvasField,
                                   symbolsMode,
                                   canvasSymbol,
                                   quickCanvasPosition,
                               }: GetSymbolBlockProps) => {

    switch (symbolsMode) {
        case SymbolsMode.BLOCKS:
            return changeSymbolToBlock(canvasSymbol, quickCanvasPosition, reset);
        case SymbolsMode.SYMBOLS:
            return symbol;
        default:
            return canvasField.symbol;
    }
};
