export const formatDateTime = (value?: string | null) => {
    if (!value) {
        return '';
    }

    const normalizedValue = value.replace('T', ' ');

    return normalizedValue.length >= 19 ? normalizedValue.slice(0, 19) : normalizedValue;
};

export const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const getFirstDateOfCurrentMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');

    return `${year}-${month}-01`;
};

export const getTodayDate = () => formatDate(new Date());
