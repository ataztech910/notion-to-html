import { IConvertObjectStrategy, INotionBlock } from "./convert-object.types";

export default class ConvertObjectContext {
    private strategy: IConvertObjectStrategy;

    constructor(strategy: IConvertObjectStrategy) {
        this.strategy = strategy;
    }

    public convertObjectToHTML(objectToConvert: Array<INotionBlock>) {
        return this.strategy.convert(objectToConvert);
    }
}