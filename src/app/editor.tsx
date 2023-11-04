'use client';

import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';

import { useApp } from './useApp';
import { useTheme } from './useTheme';
import { useExitDetection } from '@/app/hooks/useExitDetection';

import EditorCanvas from '@/app/EditorCanvas';
import EditorControls from '@/app/EditorControls';


import styles from './editor.module.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export default function Editor() {
    useApp();
    useExitDetection();

    const { theme } = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main className={styles.editor}>
                <EditorCanvas />
                <EditorControls />
            </main>
        </ThemeProvider>
    );
}
