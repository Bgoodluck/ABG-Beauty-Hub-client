// Option 1: Using Intl.NumberFormat (your original approach)
const displayNGNCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-US', { // Changed to en-NG locale
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });
    return formatter.format(num);
}

// Option 2: With more formatting options
const displayNGNCurrencyEnhanced = (num, options = {}) => {
    const defaultOptions = {
        locale: 'en-US',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true // For thousand separators
    };

    const formatter = new Intl.NumberFormat(options.locale || defaultOptions.locale, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: options.minimumFractionDigits ?? defaultOptions.minimumFractionDigits,
        maximumFractionDigits: options.maximumFractionDigits ?? defaultOptions.maximumFractionDigits,
        useGrouping: options.useGrouping ?? defaultOptions.useGrouping
    });

    return formatter.format(num);
}

export { displayNGNCurrency, displayNGNCurrencyEnhanced };