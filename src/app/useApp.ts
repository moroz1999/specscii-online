import { useEffect } from 'react';

import { localStorageService } from '@/app/services/local-storage-service';

import { useSettings } from '@/app/hooks/useSettings';
import { useFieldsMap } from '@/app/hooks/useFieldsMap';


export const useApp = () => {
    const {
        setFieldsMap
    } = useFieldsMap();

    const {
        setAuthor,
        setImageName
    } = useSettings();

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
            setFieldsMap(fieldsMap);
        }
        const author = localStorageService.getItem('author');
        if (author) {
            setAuthor(author);
        }
        const imageName = localStorageService.getItem('imageName');
        if (imageName) {
            setImageName(imageName);
        }
    }, [setAuthor, setImageName, setFieldsMap]);
};
