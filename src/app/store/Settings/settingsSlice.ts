import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


import type { RootState } from '@/app/store';
import { SettingsType } from '@/app/models/settings';

const initialState: SettingsType = {
    author: '',
    imageName: '',
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        updateAuthor: (state, action: PayloadAction<SettingsType['author']>) => {
            state.author = action.payload
        },
        updateImageName: (state, action: PayloadAction<SettingsType['imageName']>) => {
            state.imageName = action.payload
        },
    },
})


// Actions
export const { updateAuthor, updateImageName } = settingsSlice.actions;

// Selectors
export const settingsSelector = (state: RootState) => state.settings;


export const authorSelector = createDraftSafeSelector(
    settingsSelector,
    settings => settings.author
);
export const imageNameSelector = createDraftSafeSelector(
    settingsSelector,
    settings => settings.imageName
);


export default settingsSlice.reducer;
