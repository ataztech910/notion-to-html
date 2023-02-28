interface IConvertObjectStrategy {
    convert: (objectToConvert: Array<INotionBlock>) => string;
}

interface INotionBlock {
    type: string;
    [key: string]: string;
}

export { IConvertObjectStrategy, INotionBlock };