export const compareObjects = (obj1: object, obj2: object): boolean => {
    for (const key in obj1) {
        if (Object.prototype.hasOwnProperty.call(obj1, key)) {
            if (obj1[key as keyof object] !== obj2[key as keyof object]) {
                return false;
            }
        }
    }

    return true;
};
