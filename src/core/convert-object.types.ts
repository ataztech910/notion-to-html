interface IConvertObjectStrategy {
    convert: (objectToConvert: Array<INotionBlock>) => string;
}

interface INotionBlock {
    type: string;
    // rich_text: Array<{[key: string]: string}>;
    [key: string]: string | Partial<any>;
}

export { IConvertObjectStrategy, INotionBlock };