interface IConvertObjectStrategy {
    convert: (objectToConvert: INotionBlock[]) => string;
}

interface INotionBlock {
    type: string;
    text: Partial<any>,
    annotations: Partial<any>,
    href: string | null,
    [key: string]: string | null | Partial<any>
}

export { IConvertObjectStrategy, INotionBlock };