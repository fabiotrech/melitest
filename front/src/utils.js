
export const formatCurrencyPrice = (code, value) => {
    if (!code || !value) return null;

    const locale = process.env.REACT_APP_LOCALE ||
        navigator.language ||
        navigator.userLanguage;
    
    return value.toLocaleString(locale, {
        style: "currency",
        currency: code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
};

export const isEmptyObject = obj => {
    if (!obj) return true;

    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }

    return true;
};
