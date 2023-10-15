import React, {useContext, useRef, useState} from 'react';

import {CanvasPosition} from '.';

import {editorContext} from '@/app/models/editor-context';

interface UseCanvasChunkReturn {
    grid: boolean | null,
    preview: boolean,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    canvasPosition: CanvasPosition | null,
    setPreview: (preview: boolean) => void,
    setCanvasPosition: (canvasPosition: CanvasPosition | null) => void,
}

export const useCanvasChunk = (): UseCanvasChunkReturn => {
    const canvasRef = useRef(null);
    const [preview, setPreview] = useState<boolean>(false);
    const [canvasPosition, setCanvasPosition] = useState<CanvasPosition | null>(null);
    const {grid} = useContext(editorContext);

    return {
        grid,
        preview,
        canvasRef,
        canvasPosition,
        setPreview,
        setCanvasPosition,
    };
};
