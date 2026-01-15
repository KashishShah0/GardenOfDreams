
export const getSection = (item) => {
    if (!item) return 'kitchen';
    const barCats = ['Hookah', 'Whisky', 'Rum', 'Wine', 'Vodka', 'Beer', 'Other Drinks'];
    if (barCats.includes(item.category)) return 'bar';
    if (item.category === 'Others') {
        const barItems = ['Surya Red', 'Shikhar Ice'];
        if (barItems.includes(item.name)) return 'bar';
    }
    return 'kitchen';
};

export const formatCurrency = (amount) => {
    return `Rs. ${amount.toLocaleString()}`;
};

export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
