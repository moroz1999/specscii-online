import {ReactNode} from 'react';
import {useTheme} from '@mui/material';


import {ZxColors} from '@/app/models/zx-colors';
import {ZxColorNames} from '@/app/models/zx-color-names';

import { Palette } from './Palette';

import styles from './palette-colors-selector.module.css';


export type PaletteColorsSelectorProps = {
    colors: ZxColors,
    children?: ReactNode,
    currentColor: ZxColorNames | null,
    changeColor: (arg0: ZxColorNames | null) => void
}


export default function PaletteColorsSelector({
        colors,
        children,
        currentColor,
        changeColor
    }: PaletteColorsSelectorProps
) {

    const theme = useTheme();

    return (
        <div
            className={styles['palette-colors-selector']}
            style={{color: theme.palette.text.primary}}
        >
            {children}
            <Palette
                colors={colors}
                currentColor={currentColor}
                changeColor={changeColor}
            />
        </div>
    );
}
