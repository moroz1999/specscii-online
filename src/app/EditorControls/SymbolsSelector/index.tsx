import {useContext} from 'react';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

import {SymbolsMode} from '@/app/models/symbols-mode';
import {editorContext} from '@/app/models/editor-context';

import {symbolsProvider} from '@/app/services/symbols-provider';

import {SymbolSelector} from '@/app/EditorControls/SymbolsSelector/SymbolSelector';
import {SymbolsModeSelector} from '@/app/EditorControls/SymbolsSelector/SymbolsModeSelector';

import styles from './symbols-selector.module.css';



export default function SymbolsSelector() {
    const {symbol, setSymbol, setSymbolsMode} = useContext(editorContext);
    const selectors = [] as React.ReactNode[];
    const symbols = symbolsProvider.getFont();
    const changeSymbol = (symbolNumber: number) => {
        setSymbol(symbolNumber);
        setSymbolsMode(SymbolsMode.SYMBOLS);
    };
    if (symbols) {
        for (const number of Object.keys(symbols)) {
            selectors.push(<SymbolSelector selected={+number === symbol} key={+number} symbolNumber={+number}
                                           changeSymbol={changeSymbol}></SymbolSelector>);
        }
    }
    return <Stack gap={2} className={styles['symbols-selector']}>
        <SymbolsModeSelector/>
        <Paper className={styles['symbols-selector-grid']}>
            {selectors}
        </Paper>
    </Stack>;
}
