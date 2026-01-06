export type MetaData = {
    display_key: string;
    display_value: string;
    id: number;
    key: string;
    value: string;
};

export function uniteOptionsIntoString(meta_data: MetaData[]) {
    const options = meta_data.filter(({ key }) => key !== '_reduced_stock');

    if (options.length === 0) return '';

    return options.map(({ display_value }) => display_value).join(', ');
}