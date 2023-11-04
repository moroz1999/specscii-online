import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./useStore";


import { editorStateSelector, updateEditorState } from "@/app/store/Editor/editorSlice";
import { EditorState } from "@/app/models/editor-state";

export const useEditor = () => {

    const dispatch = useAppDispatch();
    const editorState = useAppSelector(editorStateSelector);

    const updateEditor = useCallback(
        (payload: Partial<EditorState>) => dispatch(
            updateEditorState(payload)
        ), [ dispatch ]
    );

    const setGrid = useCallback(
        (grid: EditorState['grid']) => dispatch(
            updateEditorState({
                grid
            })
        ), [ dispatch ]
    );

    const setFlash = useCallback(
        (flash: EditorState['flash']) => dispatch(
            updateEditorState({
                flash
            })
        ), [ dispatch ]
    );

    const setBright = useCallback(
        (bright: EditorState['bright']) => dispatch(
            updateEditorState({
                bright
            })
        ), [ dispatch ]
    );

    const setInk = useCallback(
        (ink: EditorState['ink']) => dispatch(
            updateEditorState({
                ink
            })
        ), [ dispatch ]
    );

    const setPaper = useCallback(
        (paper: EditorState['paper']) => dispatch(
            updateEditorState({
                paper
            })
        ), [ dispatch ]
    );

    const setSymbol = useCallback(
        (symbol: EditorState['symbol']) => dispatch(
            updateEditorState({
                symbol
            })
        ), [ dispatch ]
    );

    const setSymbolsMode = useCallback(
        (symbolsMode: EditorState['symbolsMode']) => dispatch(
            updateEditorState({
                symbolsMode
            })
        ), [ dispatch ]
    );

    return {
        editorState,
        setInk,
        setGrid,
        setFlash,
        setPaper,
        setBright,
        setSymbol,
        setSymbolsMode,
        updateEditor
    };
};
