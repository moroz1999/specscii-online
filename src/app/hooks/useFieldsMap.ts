import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './useStore';

import { CanvasField } from "@/app/models/canvas-field";

import {
    fieldIndexSelector,
    fieldsMapSelector,
    updateFieldIndex,
    updateFieldsMap,
    updateField as updateFieldAction,
    UpdateFieldProps
} from "@/app/store/Fields/fieldsSlice";

export const useFieldsMap = () => {

    const dispatch = useAppDispatch();
    const fieldsMap = useAppSelector(fieldsMapSelector);
    const fieldIndex = useAppSelector(fieldIndexSelector);

    const setFieldsMap = useCallback(
        (payload: Array<CanvasField>) => dispatch(
            updateFieldsMap(payload)
        ), [ dispatch ]
    );
    const setFieldIndex = useCallback(
        (payload: number) => dispatch(
            updateFieldIndex(payload)
        ), [ dispatch ]
    );

    const updateField = useCallback(
        (payload: UpdateFieldProps) => dispatch(
            updateFieldAction(payload)
        ), [ dispatch ]
    );

    return {
        fieldsMap,
        fieldIndex,
        updateField,
        setFieldsMap,
        setFieldIndex
    };
};
