import React, {useContext, useLayoutEffect} from 'react';

import {editorContext} from '@/app/models/editor-context';
import {flashSwapContext} from '@/app/models/flash-swap-context';

import {CanvasPosition} from '.';

import {imageDataCache} from '@/app/services/image-data-cache';
import {localStorageService} from '@/app/services/local-storage-service';

import {getSymbolBlock} from './getSymbolBlock';
import {changeSymbolToBlock} from './changeSymbolToBlock';
import {ZxColorNames} from '@/app/models/zx-color-names';


interface UseCanvasActionsProps {
    width: number,
    height: number
    preview: boolean,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    canvasInk: ZxColorNames,
    canvasFlash: boolean,
    canvasPaper: ZxColorNames,
    fieldNumber: number,
    canvasBright: boolean,
    canvasSymbol: number,
    canvasPosition: CanvasPosition | null,
    setPreview: (preview: boolean) => void,
    setCanvasPosition: (canvasPosition: CanvasPosition | null) => void
}


export const useCanvasActions = ({
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
                                     setCanvasPosition,
                                 }: UseCanvasActionsProps) => {

    const {
        ink,
        paper,
        flash,
        symbol,
        bright,
        fieldsMap,
        symbolsMode,
        setInk,
        setPaper,
        setFlash,
        setSymbol,
        setBright,
        setFieldsMap,
    } = useContext(editorContext);
    const {flashSwap} = useContext(flashSwapContext);

    const isBlocksMode = symbolsMode === 'blocks';
    const isUpdateRequired = flashSwap && (canvasFlash || preview);


    const changeField = (quickCanvasPosition: CanvasPosition | null = null, reset = false) => {
        const canvasField = fieldsMap[fieldNumber];

        if (canvasField) {
            const newInk = ink || canvasField.ink;
            const newPaper = paper || canvasField.paper;
            const newSymbol = getSymbolBlock({
                reset,
                symbol,
                canvasField,
                symbolsMode,
                canvasSymbol,
                quickCanvasPosition,
            });
            const newBright = bright !== null ? bright : canvasField.bright;
            const newFlash = flash !== null ? flash : canvasField.flash;
            const newFieldsMap = [...fieldsMap];

            newFieldsMap[fieldNumber] = {
                ...newFieldsMap[fieldNumber],
                ink: newInk,
                paper: newPaper,
                symbol: newSymbol,
                bright: newBright,
                flash: newFlash,
            };
            setFieldsMap(newFieldsMap);
            localStorageService.setItem('fieldsMap', newFieldsMap);
        }
    };

    const onContextMenu = (event: React.MouseEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        if (isBlocksMode) {
            changeField(detectCanvasPosition(event), true);
        }
    };

    const onClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        const quickCanvasPosition = isBlocksMode ? detectCanvasPosition(event) : null;

        changeField(quickCanvasPosition);
    };

    const readFieldSettings = () => {
        setInk(canvasInk);
        setPaper(canvasPaper);
        setSymbol(canvasSymbol);
        setBright(canvasBright);
        setFlash(canvasFlash);
    };

    const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        const quickCanvasPosition = isBlocksMode ? detectCanvasPosition(event) : null;
        if (
            event.pointerType === 'mouse' && (event.buttons === 1 || (event.buttons === 2 && isBlocksMode)) ||
            event.pointerType === 'touch'
        ) {
            changeField(quickCanvasPosition, (event.buttons === 2));
        }
        if (event.pointerType === 'mouse' && event.buttons === 4) {
            readFieldSettings();
        }
    };

    const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        if (event.buttons === 4) {
            readFieldSettings();
        }
    };

    const onMouseEnter = (event: React.PointerEvent<HTMLCanvasElement>) => {
        setPreview(true);
    };

    const onMouseLeave = () => {
        setPreview(false);
    };

    const detectCanvasPosition = (event: React.MouseEvent<HTMLCanvasElement>) => {
        let position = null;

        if (canvasRef && canvasRef.current) {
            const canvas = canvasRef.current as HTMLCanvasElement;

            const halfWidth = canvas.offsetWidth / 2;
            const halfHeight = canvas.offsetHeight / 2;

            const isLeft = event.nativeEvent.offsetX < halfWidth;
            const isTop = event.nativeEvent.offsetY < halfHeight;

            if (isLeft && isTop) {
                position = CanvasPosition.TOPLEFT;
            } else if (!isLeft && isTop) {
                position = CanvasPosition.TOPRIGHT;
            } else if (isLeft && !isTop) {
                position = CanvasPosition.BOTTOMLEFT;
            } else if (!isLeft && !isTop) {
                position = CanvasPosition.BOTTOMRIGHT;
            }
        }
        setCanvasPosition(position);
        return position;
    };


    useLayoutEffect(() => {
        const newInk = preview ? (ink || canvasInk) : canvasInk;
        const newPaper = preview ? (paper || canvasPaper) : canvasPaper;
        let newSymbol;

        if (isBlocksMode) {
            newSymbol = preview ? changeSymbolToBlock(canvasSymbol, canvasPosition) : canvasSymbol;
        } else {
            newSymbol = preview ? (symbolsMode !== 'ignore' ? symbol : canvasSymbol) : canvasSymbol;
        }

        const newBright = preview ? (bright !== null ? bright : canvasBright) : canvasBright;
        const newFlash = preview ? (flash !== null ? flash : canvasFlash) : canvasFlash;

        const flashActive = (!newFlash || !flashSwap);
        const flashedInk = flashActive ? newInk : newPaper;
        const flashedPaper = flashActive ? newPaper : newInk;

        if (canvasRef && canvasRef.current) {
            const canvas = canvasRef.current as HTMLCanvasElement;
            const context = canvas.getContext('2d');
            if (context) {
                const imageData = context.createImageData(width, height);
                const data = imageData?.data;
                if (newSymbol !== undefined && data) {
                    imageData.data.set(imageDataCache.getImageData(data, newSymbol, newBright, flashedInk, flashedPaper));
                }
                context.putImageData(imageData, 0, 0);
            }
        }
    }, [canvasInk, canvasPaper, canvasBright, canvasFlash, canvasSymbol, isUpdateRequired, preview, canvasPosition]);

    return {
        onClick,
        onMouseEnter,
        onMouseLeave,
        onPointerMove,
        onPointerDown,
        onContextMenu,
    };
};
