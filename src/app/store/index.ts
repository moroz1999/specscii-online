import { configureStore } from '@reduxjs/toolkit';

import undoReducer from './Undo/undoSlice';
import editorReducer from './Editor/editorSlice';
import fieldsReducer from './Fields/fieldsSlice';
import settingsReducer from './Settings/settingsSlice';

export const store = configureStore({
    reducer: {
        undo: undoReducer,
        editor: editorReducer,
        fields: fieldsReducer,
        settings: settingsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
