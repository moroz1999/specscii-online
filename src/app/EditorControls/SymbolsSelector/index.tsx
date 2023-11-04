import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

import { useSymbols } from './useSymbols';

import {SymbolSelector} from '@/app/EditorControls/SymbolsSelector/SymbolSelector';
import {SymbolsModeSelector} from '@/app/EditorControls/SymbolsSelector/SymbolsModeSelector';

import styles from './symbols-selector.module.css';




export default function SymbolsSelector() {
    const {
        symbol,
        symbols,
        changeSymbol
    } = useSymbols();

    return (
        <Stack
            gap={2}
            className={styles['symbols-selector']}
        >
            <SymbolsModeSelector />
            <Paper className={styles['symbols-selector-grid']}>
                {
                    symbols.map(number => (
                        <SymbolSelector
                            key={number}
                            symbolNumber={number}
                            selected={number === symbol}
                            changeSymbol={changeSymbol}
                        />
                    ))
                }
            </Paper>
        </Stack>
    );
}
