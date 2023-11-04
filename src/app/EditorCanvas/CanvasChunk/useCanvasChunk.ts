import React, {useRef, useState} from 'react';

import {CanvasPosition} from './';
import { useEditor } from '@/app/hooks/useEditor';


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

    const {
        editorState: { grid }
    } = useEditor();

    return {
        grid,
        preview,
        canvasRef,
        canvasPosition,
        setPreview,
        setCanvasPosition,
    };
};
