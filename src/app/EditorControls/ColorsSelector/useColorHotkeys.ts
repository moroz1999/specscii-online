import {useHotkeys} from 'react-hotkeys-hook';

import {ZxColorIds} from '@/app/models/zx-color-codes';
import {ZxColorNames} from '@/app/models/zx-color-names';

interface UseColorHotkeysProps {
    ink: ZxColorNames | null,
    paper: ZxColorNames | null,
    setInk: (ink: ZxColorNames | null) => void,
    setPaper: (paper: ZxColorNames | null) => void
}

export const useColorHotkeys = (
    {
        ink,
        paper,
        setInk,
        setPaper,
    }: UseColorHotkeysProps) => {

    const swap = () => {
        const swapper = ink;
        setInk(paper);
        setPaper(swapper);
    };

    useHotkeys('x', () => swap());

    useHotkeys(
        // use this ugly syntax because the hook
        // doesn't support wildcards
        'alt+0, alt+1, alt+2, alt+3, alt+4, alt+5, alt+6, alt+7,ctrl+0, ctrl+1, ctrl+2, ctrl+3, ctrl+4, ctrl+5, ctrl+6, ctrl+7',
        (_, {ctrl, alt, keys = []} = {}) => {
            const isNumber = /^[0-7]$/;
            const isNumberKey = keys!.some(key => isNumber.test(key));

            if (!isNumber) {
                return;
            }

            const colorId = parseInt(keys[0], 10);

            if (ctrl) {
                setInk(ZxColorIds[colorId]);
            }

            if (alt) {
                setPaper(ZxColorIds[colorId]);
            }
        },
    );

    return {
        swap,
    };
};
