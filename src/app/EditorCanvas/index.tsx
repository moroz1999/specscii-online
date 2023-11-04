import { useEditorCanvas } from './useEditorCanvas';

import { CanvasChunk } from '@/app/EditorCanvas/CanvasChunk';

import styles from './editor-canvas.module.css';


export default function EditorCanvas() {
    const {
        fieldsMap,
        flashSwap,
    } = useEditorCanvas();

    return (
        <div className={styles['editor-canvas']}>
            <div
                className={styles['editor-canvas-elements']}
            >
                {
                    fieldsMap.map((field, index) => (
                        <CanvasChunk
                            key={field.x + '-' + field.y}
                            canvasInk={field.ink}
                            canvasPaper={field.paper}
                            canvasBright={field.bright}
                            canvasFlash={field.flash}
                            fieldIndex={index}
                            flashSwap={flashSwap}
                            canvasSymbol={field.symbol}
                        />
                    ))
                }
            </div>
        </div>
    );
}
