import {CanvasField} from '@/app/models/canvas-field';

export type UndoHistory = Array<{
    fieldIndex: number,
    field: CanvasField,
}>

export type UndoStateValue = {
    undoHistory: UndoHistory,
    undoStepIndex: number,
}
