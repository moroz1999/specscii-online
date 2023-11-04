import clsx from 'clsx';

import {ZxColorNames} from '@/app/models/zx-color-names';


import { useCanvasChunk } from './useCanvasChunk';
import { useCanvasActions } from './useCanvasActions';

import styles from './canvas-chunk.module.css';

interface CanvasChunkProps {
    canvasInk: ZxColorNames,
    canvasPaper: ZxColorNames,
    canvasBright: boolean,
    canvasFlash: boolean,
    fieldIndex: number,
    canvasSymbol: number,
    flashSwap: boolean,
    isSelected?: boolean
}

export const enum CanvasPosition {
    TOPLEFT,
    TOPRIGHT,
    BOTTOMLEFT,
    BOTTOMRIGHT
}

const width = 8;
const height = 8;

export const CanvasChunk = ({
    canvasInk,
    canvasPaper,
    canvasBright,
    canvasFlash,
    fieldIndex,
    canvasSymbol,
    flashSwap,
    isSelected
}: CanvasChunkProps) => {

    const {
        grid,
        preview,
        canvasRef,
        canvasPosition,
        setPreview,
        setCanvasPosition
    } = useCanvasChunk();

    const {
        onClick,
        onMouseEnter,
        onMouseLeave,
        onPointerMove,
        onPointerDown,
        onContextMenu
    } = useCanvasActions({
        width,
        height,
        preview,
        canvasRef,
        canvasInk,
        flashSwap,
        canvasFlash,
        canvasPaper,
        fieldIndex,
        canvasBright,
        canvasSymbol,
        canvasPosition,
        isSelected,
        setPreview,
        setCanvasPosition
    });

    const canvasClassname = clsx(
        styles['canvas-chunk'],
        {
            // use explicit comparison because
            // we have 3 variants of grid state:
            // true (ON), false (DASHED), null (OFF)
            [styles['grid']]: grid === true,
            [styles['grid-dashed']]: grid === false
        }
    );

    return (
        <canvas
            ref={canvasRef}
            className={canvasClassname}
            width={width}
            height={height}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onPointerMove={onPointerMove}
            onPointerDown={onPointerDown}
            onContextMenu={onContextMenu}
        />
    );
};
