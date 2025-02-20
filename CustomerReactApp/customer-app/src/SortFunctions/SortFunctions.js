export const sortFunctionName = (rowA, rowB) => {
    const a = rowA.name.toLowerCase();
    const b = rowB.name.toLowerCase();

    if (a > b) {
        return 1;
    }

    if (b > a) {
        return -1;
    }

    return 0;
};

export const sortFunctionEmail = (rowA, rowB) => {
    const a = rowA.email.toLowerCase();
    const b = rowB.email.toLowerCase();

    if (a > b) {
        return 1;
    }

    if (b > a) {
        return -1;
    }

    return 0;
};

export const sortFunctionPhone = (rowA, rowB) => {
    const a = rowA.phone.toLowerCase();
    const b = rowB.phone.toLowerCase();

    if (a > b) {
        return 1;
    }

    if (b > a) {
        return -1;
    }

    return 0;
};