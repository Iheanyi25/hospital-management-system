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

export function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
