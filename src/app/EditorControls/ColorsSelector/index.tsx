import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


import { useEditor } from '@/app/hooks/useEditor';
import { useColorHotkeys } from './useColorHotkeys';


import PaletteColorsSelector from './PaletteColorsSelector';


import {ZxPalette} from '@/app/models/zx-palette';
import {paletteProvider} from '@/app/services/palette-provider';


import styles from './colors-selector.module.css';


export default function ColorsSelector() {
    const palette: ZxPalette = paletteProvider.getPalette();
    const {
        editorState: {
            ink,
            paper,
            bright
        },
        setInk,
        setPaper,
    } = useEditor();

    const colors = bright ? palette.bright : palette.dark;

    const {
        swap
    } = useColorHotkeys({
        ink,
        paper,
        setInk,
        setPaper
    });

    return (
        <Stack
            className={styles['colors-selector']}
            gap={2}
        >
            <Button
                variant="outlined"
                onClick={swap}>
                    Swap
            </Button>
            <div
                className={styles.palettes}
            >
                <PaletteColorsSelector
                    colors={colors}
                    currentColor={ink}
                    changeColor={setInk}
                >
                    Ink
                </PaletteColorsSelector>
                <PaletteColorsSelector
                    colors={colors}
                    currentColor={paper}
                    changeColor={setPaper}
                >
                    Paper
                </PaletteColorsSelector>
            </div>
        </Stack>
    );
}
