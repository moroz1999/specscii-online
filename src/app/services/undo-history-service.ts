import {CanvasField} from '@/app/models/canvas-field';
import {UndoHistory} from '@/app/models/undo-state';
import {localStorageService} from '@/app/services/local-storage-service';

type UndoHistoryMethodProps = {
    fieldsMap: CanvasField[],
    undoHistory: UndoHistory,
    undoStepIndex: number,
    setFieldsMap: (fieldsMap: CanvasField[]) => void,
    setUndoStepIndex: (undoStepIndex: number) => void,
}

type UpdateHistoryProps = {
    currentStep: number;
    fieldsMap: CanvasField[];
    undoHistory: UndoHistory;
    isUndo: boolean;
    setFieldsMap: (fieldsMap: CanvasField[]) => void;
    setUndoStepIndex: (undoStepIndex: number) => void;
}

type WriteHistoryProps = {
    fieldIndex: number,
    updatedField: CanvasField,
    currentField: CanvasField,
    undoStepIndex: number,
    setUndoStepIndex: (undoStepIndex: number) => void,
    undoHistory: UndoHistory,
    setUndoHistory: (undoHistory: UndoHistory) => void,
}

const maxSteps = 100;
class UndoHistoryService {
    public writeHistoryStep = ({
        fieldIndex,
        updatedField,
        currentField,
        undoStepIndex,
        setUndoStepIndex,
        undoHistory,
        setUndoHistory,
    }: WriteHistoryProps) => {

        const newUndoHistory = undoStepIndex <= undoHistory.length
            ? [...undoHistory]
            : [...undoHistory.slice(0, undoStepIndex / 2)];

        newUndoHistory.push({
            fieldIndex,
            field: currentField,
        });
        newUndoHistory.push({
            fieldIndex,
            field: updatedField
        });

        if (newUndoHistory.length > maxSteps * 2) {
            // slice is faster than shift
            newUndoHistory.slice(2);
            setUndoStepIndex(maxSteps * 2);
        } else {
            setUndoStepIndex(undoStepIndex + 2);
        }

        setUndoHistory(newUndoHistory);
    };

    private updateHistory = ({
        fieldsMap,
        currentStep,
        undoHistory,
        isUndo,
        setFieldsMap,
        setUndoStepIndex,
    }: UpdateHistoryProps) => {

        const shift = isUndo ? -1 : 1;
        let index = currentStep + shift;
        const isCurrentFieldIsUndo = currentStep % 2 === 0;


        if (isCurrentFieldIsUndo && isUndo) {
            index--;
        }

        if (!isCurrentFieldIsUndo && !isUndo) {
            index++;
        }

        const restoredField = undoHistory[index];

        const newFieldsMap = [...fieldsMap];
        newFieldsMap[restoredField.fieldIndex] = restoredField.field;

        setFieldsMap(newFieldsMap);
        localStorageService.setItem('fieldsMap', newFieldsMap);

        setUndoStepIndex(index);
    };

    public undo = ({
        fieldsMap,
        undoHistory,
        undoStepIndex,
        setFieldsMap,
        setUndoStepIndex,
    }: UndoHistoryMethodProps) => {

        if (undoStepIndex <= 0) {
            return;
        }

        this.updateHistory({
            fieldsMap,
            undoHistory,
            currentStep: undoStepIndex,
            isUndo: true,
            setFieldsMap,
            setUndoStepIndex,
        })
    };

    public redo = ({
        fieldsMap,
        undoHistory,
        undoStepIndex,
        setFieldsMap,
        setUndoStepIndex,
    }: UndoHistoryMethodProps) => {

        if (undoStepIndex < undoHistory.length - 1) {
            this.updateHistory({
                fieldsMap,
                undoHistory,
                currentStep: undoStepIndex,
                isUndo: false,
                setFieldsMap,
                setUndoStepIndex,
            })
        }
    };
}

export const undoHistoryService = new UndoHistoryService();
