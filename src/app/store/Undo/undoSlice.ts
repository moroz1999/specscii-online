import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


import type { RootState } from '@/app/store';
import { UndoHistory, UndoStateValue } from '@/app/models/undo-state';
import { UpdateFieldProps } from '../Fields/fieldsSlice';

const initialState: UndoStateValue = {
    undoHistory: [],
    undoStepIndex: -1,
};

export const undoSlice = createSlice({
    name: 'undo',
    initialState,
    reducers: {
        setUndoHistory: (state, action: PayloadAction<UndoHistory>) => {
            state.undoHistory = action.payload
        },
        setUndoStepIndex: (state, action: PayloadAction<UndoStateValue['undoStepIndex']>) => {
            state.undoStepIndex = action.payload
        },
        addToUndoHistory: (state, action: PayloadAction<UpdateFieldProps>) => {
            state.undoHistory.push(action.payload)
        },
        resetUndoHistory: (state) => {
            state.undoHistory = initialState.undoHistory;
            state.undoStepIndex = initialState.undoStepIndex;
        }
    },
})


// Actions
export const {
    setUndoHistory: setUndoHistoryAction,
    setUndoStepIndex: setUndoStepIndexAction,
    addToUndoHistory: addToUndoHistoryAction,
    resetUndoHistory: resetUndoHistoryAction
} = undoSlice.actions;

// Selectors
export const undoSelector = (state: RootState) => state.undo;


export const undoHistorySelector = createDraftSafeSelector(
    undoSelector,
    undo => undo.undoHistory
);
export const undoStepIndexSelector = createDraftSafeSelector(
    undoSelector,
    undo => undo.undoStepIndex
);


export default undoSlice.reducer;
