import {useContext, useRef} from 'react';

import {styled} from '@mui/material/';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import {imageContext} from '@/app/models/image-context';
import {editorContext} from '@/app/models/editor-context';

import {jsonExporter} from '@/app/services/json-export';
import {localStorageService} from '@/app/services/local-storage-service';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const LoadFile = () => {
    const {setAuthor, setImageName} = useContext(imageContext);
    const {setFieldsMap} = useContext(editorContext);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = fileInputRef.current;
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener(
                'load',
                () => {
                    if (reader.result) {
                        const data = jsonExporter.getDataFromJson(String(reader.result));

                        setFieldsMap(data.fields);
                        setAuthor(data.author ?? '');
                        setImageName(data.imageName ?? '');

                        localStorageService.setItem('imageName', data.imageName ?? '');
                        localStorageService.setItem('author', data.author ?? '');
                        localStorageService.setItem('fieldsMap', data.fields);
                    }
                },
                false,
            );
            reader.readAsText(fileInput.files[0]);
        }
    };

    return (
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon/>}>
            JSON
            <VisuallyHiddenInput
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}  // Добавляем обработчик события
            />
        </Button>
    );
};
