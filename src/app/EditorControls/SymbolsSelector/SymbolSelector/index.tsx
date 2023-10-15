import {useLayoutEffect, useRef} from 'react';

import {ZxColorNames} from '@/app/models/zx-color-names';
import {ZxColorTypes} from '@/app/models/zx-color-types';

import {paletteProvider} from '@/app/services/palette-provider';
import {FontSymbol, FontSymbolRow, symbolsProvider} from '@/app/services/symbols-provider';

import styles from './symbol-selector.module.css';

interface SymbolSelectorProps {
    symbolNumber: number,
    selected: boolean,
    changeSymbol: (symbolNumber: number) => void
}

const width = 8;
const height = 8;


export const SymbolSelector = ({symbolNumber, selected, changeSymbol}: SymbolSelectorProps) => {
    const className = selected ? `${styles['symbol-selector']} ${styles['symbol-selector-selected']}` : `${styles['symbol-selector']} `;
    const canvasRef = useRef(null);
    useLayoutEffect(() => {
        const symbol = symbolsProvider.getSymbol(symbolNumber);
        if (canvasRef && canvasRef.current) {
            const canvas = canvasRef.current as HTMLCanvasElement;
            const context = canvas.getContext('2d');
            if (context) {
                const inkColor = paletteProvider.getColor(ZxColorNames.BLACK, ZxColorTypes.BRIGHT);
                const paperColor = paletteProvider.getColor(ZxColorNames.WHITE, ZxColorTypes.BRIGHT);

                const imageData = context.createImageData(width, height);
                const data = imageData?.data;
                if (symbol && data) {
                    for (const rowStr of Object.keys(symbol)) {
                        const row = Number(rowStr) as keyof FontSymbol;
                        for (const numStr of Object.keys(symbol[row])) {
                            const num = Number(numStr) as keyof FontSymbolRow;
                            const byte = symbol[row][num];
                            const color = byte ? inkColor : paperColor;
                            const i = ((row * width) + +num) * 4;
                            data[i] = color.r;
                            data[i + 1] = color.g;
                            data[i + 2] = color.b;
                            data[i + 3] = color.a;
                        }
                    }
                }
                context.putImageData(imageData, 0, 0);
            }
        }
    }, [symbolNumber, selected]);
    const click = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        changeSymbol(symbolNumber);
    };
    const pointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        event.preventDefault();
        if ((event.pointerType === 'mouse' && event.buttons === 1) || event.pointerType === 'touch') {
            changeSymbol(symbolNumber);
        }
    };
    return <div className={className}
                onClick={click}
                onPointerMove={pointerMove}
    >
        <canvas
            className={styles.canvas}
            ref={canvasRef}
            width={width}
            height={height}></canvas>
    </div>;
};
