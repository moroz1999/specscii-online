import { useCallback } from 'react';

import { useSettings } from '@/app/hooks/useSettings';
import { useFieldsMap } from '@/app/hooks/useFieldsMap';
import { useAppDispatch } from '@/app/hooks/useStore';

import { clearFields } from '@/app/store/Fields/fieldsSlice';
import { resetUndoHistoryAction } from '@/app/store/Undo/undoSlice';

import { jsonExporter } from '@/app/services/json-export';
import { tokensToBasic } from '@/app/services/tokens-to-basic';
import { localStorageService } from '@/app/services/local-storage-service';
import { imageDataTransformer } from '@/app/services/image-data-transformer';
import { cleanFieldsMapProvider } from '@/app/services/clean-fields-map-provider';

import { downloadFile } from './donwloadFile';
import { downloadBinary } from './downloadBinary';
import { generateFileName } from './generateFilename';


export const useFileControls = () => {
    const dispatch = useAppDispatch();
    const {
        author,
        imageName,
        setAuthor,
        setImageName
    } = useSettings();

    const {
        fieldsMap,
    } = useFieldsMap();


    const saveTokens = () => {
        const tokens = imageDataTransformer.convertToTokens(fieldsMap);
        downloadBinary(tokens, generateFileName({
            author,
            imageName,
            extension: 'C'
        }));
    };

    const handleClear = useCallback(
        () => {
            const clearFieldsMap = cleanFieldsMapProvider.get();
            localStorageService.setItem(
                'fieldsMap',
                clearFieldsMap
            );
            dispatch(
                clearFields()
            );
            dispatch(
                resetUndoHistoryAction()
            );
        }, [dispatch]
    );


    const saveJson = () => {
        const json = jsonExporter.getJsonFromData(fieldsMap, 0, author, imageName);
        downloadFile(JSON.stringify(json), generateFileName({
            author,
            imageName,
            extension: 'specscii.json'
        }));
    };

    const saveBasic = () => {
        const tokens = imageDataTransformer.convertToTokens(fieldsMap);
        const basic = tokensToBasic.convertToBasic(tokens);
        downloadBinary(basic, generateFileName({
            author,
            imageName,
            extension: 'B'
        }));
    };


    const saveAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget) {
            setAuthor(event.currentTarget.value);
            localStorageService.setItem('author', event.currentTarget.value);
        }
    };

    const saveImageName = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget) {
            setImageName(event.currentTarget.value);
            localStorageService.setItem('imageName', event.currentTarget.value);
        }
    };

    return {
        author,
        imageName,
        handleClear,
        saveJson,
        saveBasic,
        saveTokens,
        saveAuthor,
        saveImageName
    }
};
