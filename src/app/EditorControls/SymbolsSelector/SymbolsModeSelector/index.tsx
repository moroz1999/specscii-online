import {useContext} from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import {SymbolsMode} from '@/app/models/symbols-mode';
import {editorContext} from '@/app/models/editor-context';


export const SymbolsModeSelector = () => {
    const {symbolsMode, setSymbolsMode} = useContext(editorContext);
    const handleChange = (event: React.MouseEvent<HTMLElement>, newMode: string) => {
        switch (newMode) {
            case SymbolsMode.SYMBOLS:
                setSymbolsMode(SymbolsMode.SYMBOLS);
                break;
            case SymbolsMode.BLOCKS:
                setSymbolsMode(SymbolsMode.BLOCKS);
                break;
            case SymbolsMode.IGNORE:
            default:
                setSymbolsMode(SymbolsMode.IGNORE);
                break;
        }
    };

    return <ToggleButtonGroup
        color="primary"
        value={symbolsMode}
        exclusive
        onChange={handleChange}
        aria-label="Mode"
        size={'small'}
    >
        <ToggleButton value="symbols">Symbols</ToggleButton>
        <ToggleButton value="blocks">Blocks</ToggleButton>
        <ToggleButton value="ignore">Ignore</ToggleButton>
    </ToggleButtonGroup>;
};
