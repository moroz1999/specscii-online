import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import {SymbolsMode} from '@/app/models/symbols-mode';
import { useEditor } from '@/app/hooks/useEditor';


export const SymbolsModeSelector = () => {
    const {
        editorState: {
            symbolsMode
        },
        setSymbolsMode
    } = useEditor();

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

    return (
        <ToggleButtonGroup
            exclusive
            size={'small'}
            color="primary"
            aria-label="Mode"
            value={symbolsMode}
            onChange={handleChange}
        >
            <ToggleButton value="symbols">Symbols</ToggleButton>
            <ToggleButton value="blocks">Blocks</ToggleButton>
            <ToggleButton value="ignore">Ignore</ToggleButton>
        </ToggleButtonGroup>
    );
};
