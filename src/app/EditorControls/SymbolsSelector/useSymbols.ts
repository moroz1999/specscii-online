import { useEditor } from '@/app/hooks/useEditor';

import { SymbolsMode } from '@/app/models/symbols-mode';

import { symbolsProvider } from '@/app/services/symbols-provider';

export const useSymbols = () => {
    const {
        editorState: {
            symbol
        },
        setSymbol,
        setSymbolsMode
    } = useEditor();


    const changeSymbol = (symbolNumber: number) => {
        setSymbol(symbolNumber);
        setSymbolsMode(SymbolsMode.SYMBOLS);
    };

    const symbols = symbolsProvider.getFont();

    return {
        symbol,
        symbols: Object.keys(symbols).map(key => parseInt(key, 10)),
        changeSymbol,
    };
};
