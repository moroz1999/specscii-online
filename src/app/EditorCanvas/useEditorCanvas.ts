import { useContext, useEffect, useState } from 'react';

import { CanvasField } from '@/app/models/canvas-field';
import { editorContext } from '@/app/models/editor-context';
import { undoHistoryContext } from '@/app/models/undo-context';

import { undoHistoryService } from '@/app/services/undo-history-service';


export const useEditorCanvas = () => {
    const { fieldsMap } = useContext(editorContext);

    const {
        undoHistory,
        setUndoHistory,
        undoStepNumber,
        setUndoStepNumber
    } = useContext(undoHistoryContext);

    const [flashSwap, setFlashSwap] = useState<boolean>(false);
    const [beforeFieldsMap, setBeforeFieldsMap] = useState<Array<CanvasField>>([]);

    useEffect(
        () => {
            const interval = setInterval(
                () => {
                    setFlashSwap(flashSwap => !flashSwap);
                }, 320,
            );
            return () => {
                clearInterval(interval);
            };
        }, [],
    );

    const startCapturing = () => {
        setBeforeFieldsMap([...fieldsMap]);
    };

    const endCapturing = () => {
        undoHistoryService.writeHistoryStep(beforeFieldsMap, undoStepNumber, setUndoStepNumber, undoHistory, setUndoHistory);
    };

    return {
        fieldsMap,
        flashSwap,
        startCapturing,
        endCapturing,
    };
};
