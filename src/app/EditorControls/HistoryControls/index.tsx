import {useContext} from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

import {editorContext} from '@/app/models/editor-context';
import {undoHistoryContext} from '@/app/models/undo-context';

import {undoHistoryService} from '@/app/services/undo-history-service';
import {localStorageService} from '@/app/services/local-storage-service';


export const HistoryControls = () => {
    const {undoHistory, setUndoHistory, undoStepNumber, setUndoStepNumber} = useContext(undoHistoryContext);
    const {fieldsMap, setFieldsMap} = useContext(editorContext);

    const undo = () => {
        undoHistoryService.undo(fieldsMap, setFieldsMap, undoStepNumber, setUndoStepNumber, undoHistory, setUndoHistory)
    };

    const redo = () => {
        undoHistoryService.redo(fieldsMap, setFieldsMap, undoStepNumber, setUndoStepNumber, undoHistory, setUndoHistory)
    };

    const redoEnabled = (undoStepNumber + 1) < undoHistory.length;
    const undoEnabled = undoStepNumber > 0;

    return <ButtonGroup fullWidth={true} variant="outlined" aria-label="outlined button group">
        <Button startIcon={<UndoIcon fontSize="small"/>} disabled={!undoEnabled} onClick={undo}>Undo</Button>
        <Button startIcon={<RedoIcon fontSize="small"/>} disabled={!redoEnabled} onClick={redo}>Redo</Button>
    </ButtonGroup>;
};
