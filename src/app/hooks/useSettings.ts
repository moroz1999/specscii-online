import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./useStore";


import { SettingsType } from '@/app/models/settings';

import {
    authorSelector,
    imageNameSelector,
    settingsSelector,
    updateAuthor,
    updateImageName
} from "@/app/store/Settings/settingsSlice";

export const useSettings = () => {
    const settings = useAppSelector(settingsSelector);
    const author = useAppSelector(authorSelector);
    const imageName = useAppSelector(imageNameSelector);

    const dispatch = useAppDispatch();

    const setAuthor = useCallback(
        (author: SettingsType['author']) => dispatch(
            updateAuthor(author)
        ), [dispatch]
    );
    const setImageName = useCallback(
        (imageName: SettingsType['imageName']) => dispatch(
            updateImageName(imageName)
        ), [dispatch]
    );

    return {
        settings,
        author,
        imageName,
        setAuthor,
        setImageName
    };
};
