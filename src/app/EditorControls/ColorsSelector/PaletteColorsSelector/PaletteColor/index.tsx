import {Color} from '@/app/models/color';
import {ZxColorNames} from '@/app/models/zx-color-names';

import styles from './palette-color.module.css';

type PaletteColorProps = {
    name: ZxColorNames | null,
    selected: boolean,
    changeColor: (arg0: ZxColorNames | null) => void;
    color: Color
}

export const PaletteColor = ({
    name,
    color,
    selected,
    changeColor,
}: PaletteColorProps) => {

    const handleClick = () => changeColor(name);

    const colorString = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + Math.floor(color.a / 255) + ')';
    const className = selected ? `${styles['palette-color']} ${styles['palette-color-selected']}` : styles['palette-color'];


    return (
        <div
            title={name ?? 'transparent'}
            className={className}
            style={{backgroundColor: colorString}}
            onClick={handleClick}
        >
        {
            name ? '' : 'Off'
        }
        </div>
    );
};
