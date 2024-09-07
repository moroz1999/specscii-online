import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';

import { EditorState } from '@/app/models/editor-state';
import { SymbolsMode } from '@/app/models/symbols-mode';
import { ZxColorNames } from '@/app/models/zx-color-names';

export type PartialEditorState = PayloadAction<Partial<EditorState>>;


const initialState: EditorState = {
    ink: ZxColorNames.BLACK,
    paper: ZxColorNames.WHITE,
    bright: true,
    flash: false,
    grid: false,
    symbol: 0,
    symbolsMode: SymbolsMode.SYMBOLS,
};

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        updateEditorState: (state, action: PartialEditorState) => {
            Object.assign(state, action.payload);
        },
    },
})

export const { updateEditorState } = editorSlice.actions;

export type updateEditorActionType = typeof updateEditorState;

export const editorStateSelector = (state: RootState) => state.editor;

export default editorSlice.reducer;
