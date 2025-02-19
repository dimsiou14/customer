export const sortFunctionName = (rowA, rowB) => {
    const a = rowA.Name.toLowerCase();
    const b = rowB.Name.toLowerCase();

    if (a > b) {
        return 1;
    }

    if (b > a) {
        return -1;
    }

    return 0;
};

export const sortFunctionEmail = (rowA, rowB) => {
    const a = rowA.Email.toLowerCase();
    const b = rowB.Email.toLowerCase();

    if (a > b) {
        return 1;
    }

    if (b > a) {
        return -1;
    }

    return 0;
};

export const sortFunctionPhone = (rowA, rowB) => {
    const a = rowA.Phone.toLowerCase();
    const b = rowB.Phone.toLowerCase();

    if (a > b) {
        return 1;
    }

    if (b > a) {
        return -1;
    }

    return 0;
};