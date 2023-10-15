'use client';
import {useEffect, useMemo, useState} from 'react';

import {useUndo} from '@/app/hooks/useUndo';
import {useExitDetection} from '@/app/hooks/useExitDetection';

import EditorCanvas from '@/app/EditorCanvas';
import EditorControls from '@/app/EditorControls';

import {SymbolsMode} from '@/app/models/symbols-mode';
import {imageContext} from '@/app/models/image-context';
import {ZxColorNames} from '@/app/models/zx-color-names';
import {editorContext} from '@/app/models/editor-context';
import {undoHistoryContext} from '@/app/models/undo-context';

import {cleanFieldsMapProvider} from '@/app/services/clean-fields-map-provider';

import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import {createTheme, ThemeProvider} from '@mui/material/styles';


import styles from './editor.module.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {localStorageService} from '@/app/services/local-storage-service';
import {CanvasField} from '@/app/models/canvas-field';


export default function Editor() {
    const [author, setAuthor] = useState<string>('');
    const [imageName, setImageName] = useState<string>('');
    const [symbolsMode, setSymbolsMode] = useState<SymbolsMode>(SymbolsMode.SYMBOLS);
    const [symbol, setSymbol] = useState<number>(32);
    const [grid, setGrid] = useState<boolean | null>(false);
    const [ink, setInk] = useState<ZxColorNames | null>(ZxColorNames.BLACK);
    const [paper, setPaper] = useState<ZxColorNames | null>(ZxColorNames.WHITE);
    const [bright, setBright] = useState<boolean | null>(true);
    const [flash, setFlash] = useState<boolean | null>(false);
    const [fieldsMap, setFieldsMap] = useState(cleanFieldsMapProvider.get());
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const {
        undoHistory,
        undoStepNumber,
        setUndoHistory,
        setUndoStepNumber,
    } = useUndo({
        fieldsMap,
        setFieldsMap,
    });


    const theme = useMemo(
        () =>
            createTheme({
                spacing: 4,
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                    background: {
                        default: prefersDarkMode ? '#202020' : '#F2F6FB',
                    },
                },
            }),
        [prefersDarkMode],
    );

    useExitDetection();

    useEffect(() => {
        const env = process.env.NODE_ENV;

        if (env === 'production') {
            console.log(
                'RELEASE BY \n' +
                '\n' +
                '▓█████▄  ██▓ ▄▄▄▄    ██▓ ██▓     ██▓ ██ ▄█▀ ██▓\n' +
                '▒██▀ ██▌▓██▒▓█████▄ ▓██▒▓██▒    ▓██▒ ██▄█▒ ▓██▒\n' +
                '░██   █▌▒██▒▒██▒ ▄██▒██▒▒██░    ▒██▒▓███▄░ ▒██▒\n' +
                '░▓█▄   ▌░██░▒██░█▀  ░██░▒██░    ░██░▓██ █▄ ░██░\n' +
                '░▒████▓ ░██░░▓█  ▀█▓░██░░██████▒░██░▒██▒ █▄░██░\n' +
                ' ▒▒▓  ▒ ░▓  ░▒▓███▀▒░▓  ░ ▒░▓  ░░▓  ▒ ▒▒ ▓▒░▓  \n' +
                ' ░ ▒  ▒  ▒ ░▒░▒   ░  ▒ ░░ ░ ▒  ░ ▒ ░░ ░▒ ▒░ ▒ ░\n' +
                ' ░ ░  ░  ▒ ░ ░    ░  ▒ ░  ░ ░    ▒ ░░ ░░ ░  ▒ ░\n' +
                '   ░     ░   ░       ░      ░  ░ ░  ░  ░    ░  \n' +
                ' ░                ░                            \n' +
                '\n',
            );
        }

        const fieldsMap = localStorageService.getItem('fieldsMap');
        if (fieldsMap) {
            setFieldsMap(fieldsMap as CanvasField[]);
        }
        const author = localStorageService.getItem('author');
        if (author) {
            setAuthor(author);
        }
        const imageName = localStorageService.getItem('imageName');
        if (imageName) {
            setImageName(imageName);
        }

    }, []);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <main className={styles.editor}>
                <imageContext.Provider value={{author, setAuthor, imageName, setImageName}}>
                    <undoHistoryContext.Provider
                        value={{undoHistory, setUndoHistory, undoStepNumber, setUndoStepNumber}}>
                        <editorContext.Provider value={{
                            symbolsMode, setSymbolsMode,
                            symbol, setSymbol,
                            ink, setInk,
                            paper, setPaper,
                            fieldsMap, setFieldsMap,
                            bright, setBright,
                            flash, setFlash,
                            grid, setGrid,
                        }}>
                            <EditorCanvas/>
                            <EditorControls/>
                        </editorContext.Provider>
                    </undoHistoryContext.Provider>
                </imageContext.Provider>
            </main>
        </ThemeProvider>
    );
}
