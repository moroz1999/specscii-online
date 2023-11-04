import {CanvasField} from '@/app/models/canvas-field';
import {SymbolsMode} from '@/app/models/symbols-mode';
import {ZxColorNames} from '@/app/models/zx-color-names';

export type FieldsMapType = {
    fieldsMap: Array<CanvasField>;
}

export type EditorState = {
    bright: boolean | null;
    flash: boolean | null;
    grid: boolean | null;
    ink: ZxColorNames | null;
    paper: ZxColorNames | null;
    symbol: number;
    symbolsMode: SymbolsMode;
}
