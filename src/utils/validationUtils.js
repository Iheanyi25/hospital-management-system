export const isNotEmptyString = (val) => {
    return val !== ""
}

export const isValidPositiveInteger = (val) => {
    const value = parseInt(val)
    return typeof value === 'number' && isFinite(value) && value >= 0;
}

export const isBoolean = (val) => {
    return typeof val === 'boolean';
}

