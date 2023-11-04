import { useMemo } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme } from '@mui/material/styles';


export const useTheme = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

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

    return {
        theme
    };
};
