import { useDialog } from '@/app/hooks/useDialog';

import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

import { FileDialog } from './FileDialog';


import styles from './file-controls.module.css';


export const FileControls = () => {
    const {
        open,
        handleOpen,
        handleClose
    } = useDialog()

    return (
        <div className={styles['file-controls']}>
            <Button
                startIcon={<SaveIcon fontSize="small"/>}
                variant="contained"
                onClick={handleOpen}
            >
                Files
            </Button>
            <FileDialog
                open={open}
                handleClose={handleClose}
            />
        </div>
    );
};
