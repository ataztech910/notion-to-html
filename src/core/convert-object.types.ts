interface IConvertObjectStrategy {
    convert: (objectToConvert: INotionBlock[]) => string;
}

interface INotionBlock {
    type: string;
    [key: string]: string | Partial<any>;
}

export { IConvertObjectStrategy, INotionBlock };