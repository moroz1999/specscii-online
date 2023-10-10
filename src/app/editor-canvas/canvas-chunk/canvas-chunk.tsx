import clsx from 'clsx';

import {ZxColorNames} from '@/app/models/zx-color-names';


import { useCanvasChunk } from './useCanvasChunk';
import { useCanvasActions } from './useCanvasActions';

import styles from './canvas-chunk.module.css';

interface Props {
    canvasInk: ZxColorNames,
    canvasPaper: ZxColorNames,
    canvasBright: boolean,
    canvasFlash: boolean,
    fieldNumber: number,
    canvasSymbol: number
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
    fieldNumber,
    canvasSymbol
}: Props) => {

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
        canvasFlash,
        canvasPaper,
        fieldNumber,
        canvasBright,
        canvasSymbol,
        canvasPosition,
        setPreview,
        setCanvasPosition
    });

    const canvasClassname = clsx(
        styles['canvas-chunk'],
        {
            [styles['grid']]: grid,
            [styles['grid-dashed']]: !grid
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
