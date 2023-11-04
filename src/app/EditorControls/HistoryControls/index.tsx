import { useHotkeys } from 'react-hotkeys-hook';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

import { useUndo } from '@/app/hooks/useUndo';
import { useFieldsMap } from '@/app/hooks/useFieldsMap';



export const HistoryControls = () => {
    const {
        fieldsMap,
        fieldIndex,
        setFieldsMap
    } = useFieldsMap();

    const {
        isUndoDisabled,
        isRedoDisabled,
        handleUndo,
        handleRedo
    } = useUndo({
        fieldsMap,
        fieldIndex,
        setFieldsMap
    });

    useHotkeys(
        'ctrl+z, ctrl+y',
        (e, { keys = [] } = {}) => {
                if (keys[0] === 'z') {
                    handleUndo();
                } else {
                    handleRedo()
                }
        },
        [ handleUndo, handleRedo ]
    );

    return (
        <ButtonGroup
            fullWidth={true}
            variant="outlined"
            aria-label="outlined button group"
        >
            <Button
                startIcon={<UndoIcon fontSize="small"/>}
                disabled={isUndoDisabled}
                onClick={handleUndo}
            >
                Undo
            </Button>
            <Button
                startIcon={<RedoIcon fontSize="small"/>}
                disabled={isRedoDisabled}
                onClick={handleRedo}
            >
                Redo
            </Button>
        </ButtonGroup>
    );
};
