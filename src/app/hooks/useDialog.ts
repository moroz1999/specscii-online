import { useCallback, useState } from 'react';

export const useDialog = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = useCallback(
        () => setOpen(true),
        []
    );
    const handleClose = useCallback(
        () => setOpen(false),
        []
    );

    return {
        open,
        handleOpen,
        handleClose
    }
};
