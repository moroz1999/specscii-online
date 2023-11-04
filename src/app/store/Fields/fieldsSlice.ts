import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { CanvasField } from '@/app/models/canvas-field';

import { cleanFieldsMapProvider } from '@/app/services/clean-fields-map-provider';

import type { RootState } from '@/app/store';

const initialState = {
    fieldsMap: cleanFieldsMapProvider.get() as Array<CanvasField>,
    fieldIndex: -1
};

export interface UpdateFieldProps {
    fieldIndex: number,
    field: CanvasField
}


export const fieldsSlice = createSlice({
    name: 'fields',
    initialState,
    reducers: {
        updateFieldsMap: (state, action: PayloadAction<Array<CanvasField>>) => {
            state.fieldsMap = action.payload;
        },
        updateFieldIndex: (state, action: PayloadAction<number>) => {
            state.fieldIndex = action.payload;
        },
        updateField: (state, action: PayloadAction<UpdateFieldProps>) => {
            const { field, fieldIndex } = action.payload;
            state.fieldsMap[fieldIndex] = field;
        },
        clearFields: state => {
            state.fieldsMap = initialState.fieldsMap;
            state.fieldIndex = initialState.fieldIndex;
        }
    },
})

export const {
    clearFields,
    updateField,
    updateFieldsMap,
    updateFieldIndex,
} = fieldsSlice.actions;

export const fieldsSelector = (state: RootState) => state.fields;

export const fieldsMapSelector = createDraftSafeSelector(
    fieldsSelector,
    fields => fields.fieldsMap
);

export const fieldIndexSelector = createDraftSafeSelector(
    fieldsSelector,
    fields => fields.fieldIndex
);

export default fieldsSlice.reducer;
