import { UndoHistory } from "@/app/models/undo-state";
import { UpdateFieldProps } from "@/app/store/Fields/fieldsSlice";

import { compareObjects } from "./compareObjects";
import { CanvasField } from "../models/canvas-field";

type CheckDuplicate = ({
    undoHistory: UndoHistory
    fieldIndex: number,
    field: CanvasField
});



export const checkDuplicateField = ({
    undoHistory,
    field,
    fieldIndex
}: CheckDuplicate) => {
    const lastField = undoHistory[undoHistory.length - 1];

    return lastField?.fieldIndex === fieldIndex && compareObjects(lastField?.field, field);
};
