import {useContext} from 'react';

import { useColorHotkeys } from './useColorHotkeys';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PaletteColorsSelector from './PaletteColorsSelector';

import {ZxPalette} from '@/app/models/zx-palette';
import {editorContext} from '@/app/models/editor-context';

import {paletteProvider} from '@/app/services/palette-provider';


import styles from './colors-selector.module.css';


export default function ColorsSelector() {
    const palette: ZxPalette = paletteProvider.getPalette();
    const {
        ink,
        paper,
        bright,
        setInk,
        setPaper,
    } = useContext(editorContext);

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
