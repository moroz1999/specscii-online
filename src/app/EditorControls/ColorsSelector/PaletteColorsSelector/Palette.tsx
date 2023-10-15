import { PaletteColorsSelectorProps } from '.';

import {ZxColorNames} from '@/app/models/zx-color-names';

import { PaletteColor } from './PaletteColor';

export const Palette = ({
    colors,
    currentColor,
    changeColor
}: PaletteColorsSelectorProps) => {

    if (!colors) {
        return null;
    }

    const colorsList = Object.keys(colors) as ZxColorNames[];

    return (
        <>
            {
                colorsList.map(name => (
                    <PaletteColor
                        key={name+colors[name]}
                        name={name}
                        color={colors[name]}
                        selected={name === currentColor}
                        changeColor={changeColor}
                    />
                ))
            }
            <PaletteColor
                key="transparent"
                name={null}
                changeColor={changeColor}
                selected={currentColor === null }
                color={colors[ZxColorNames.WHITE]}
            />
        </>
    );
};
