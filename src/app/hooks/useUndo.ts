import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './useStore';

import { UndoHistory } from '@/app/models/undo-state';
import { CanvasField } from '@/app/models/canvas-field';


import { undoHistoryService } from '@/app/services/undo-history-service';
import {
        addToUndoHistoryAction,
        setUndoHistoryAction,
        setUndoStepIndexAction,
        undoSelector
} from '@/app/store/Undo/undoSlice';
import { UpdateFieldProps } from '@/app/store/Fields/fieldsSlice';


type hookType = {
    fieldsMap: Array<CanvasField>,
    fieldIndex: number,
    setFieldsMap: (payload: Array<CanvasField>) => void
};


export const useUndo = ({
    fieldsMap,
    setFieldsMap
}: hookType
) => {

    const {
        undoHistory,
        undoStepIndex
    } = useAppSelector(undoSelector);
    const dispatch = useAppDispatch();



    const setUndoHistory = useCallback(
        (payload: UndoHistory) => dispatch(
            setUndoHistoryAction(payload)
        ), [dispatch]
    );

    const setUndoStepIndex = useCallback(
        (payload: number) => dispatch(
            setUndoStepIndexAction(payload)
        ), [dispatch]
    );

    const addToUndoHistory = useCallback(
        (payload: UpdateFieldProps) => dispatch(
            addToUndoHistoryAction(payload)
        ), [dispatch]
    );


    const handleUndo = useCallback(
        () => {
            undoHistoryService.undo({
                fieldsMap,
                undoHistory,
                undoStepIndex,
                setFieldsMap,
                setUndoStepIndex,
            })
        },
        [
            fieldsMap,
            undoHistory,
            undoStepIndex,
            setFieldsMap,
            setUndoStepIndex
        ]
    );

    const handleRedo = useCallback(
        () => {
            undoHistoryService.redo({
                fieldsMap,
                undoHistory,
                undoStepIndex,
                setFieldsMap,
                setUndoStepIndex
            })
        },
        [
            fieldsMap,
            undoHistory,
            undoStepIndex,
            setFieldsMap,
            setUndoStepIndex
        ]
    );

    return {
        undoHistory,
        undoStepIndex,
        isRedoDisabled: undoStepIndex === undoHistory.length - 1,
        isUndoDisabled: undoStepIndex <= 0,
        setUndoHistory,
        addToUndoHistory,
        setUndoStepIndex,
        handleUndo,
        handleRedo
    };
};
