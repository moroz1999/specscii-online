import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';


import { LoadFile } from '@/app/EditorControls/FileControls/LoadFile';
import { useFileControls } from './useFileControls';

type FileDialogProps = {
    open: boolean;
    handleClose: () => void;
};


export const FileDialog = ({
    open,
    handleClose
}: FileDialogProps) => {

    const {
        author,
        imageName,
        saveJson,
        saveBasic,
        saveTokens,
        saveAuthor,
        handleClear,
        saveImageName
    } = useFileControls();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogContent>
                <Stack spacing={4} direction="row">
                    <Stack spacing={2}>
                        <h3>New image</h3>
                        <TextField
                            size={'small'}
                            label="Author name"
                            variant="outlined"
                            value={author}
                            onChange={saveAuthor}
                        />
                        <TextField
                            label="Image title"
                            variant="outlined"
                            size={'small'}
                            value={imageName}
                            onChange={saveImageName}
                        />
                        <Button
                            variant="contained"
                            onClick={handleClear}
                        >
                            New image
                        </Button>
                    </Stack>

                    <Stack spacing={2}>
                        <h3>Load</h3>
                        <LoadFile />
                    </Stack>
                    <Stack spacing={2}>
                        <h3>Save as</h3>
                        <Button
                            style={{justifyContent: 'flex-start'}}
                            startIcon={<CloudDownloadIcon />}
                            variant="contained"
                            onClick={saveJson}
                        >
                            JSON
                        </Button>
                        <Button
                            style={{justifyContent: 'flex-start'}}
                            startIcon={<CloudDownloadIcon />}
                            variant="outlined"
                            onClick={saveTokens}
                        >
                            tokens
                        </Button>
                        <Button
                            style={{justifyContent: 'flex-start'}}
                            startIcon={<CloudDownloadIcon />}
                            variant="outlined"
                            onClick={saveBasic}
                        >
                            Basic
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};
