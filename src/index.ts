import ConvertObjectStrategyV1 from "./core/convert-object-v1.strategy";
import ConvertObjectContext from "./core/convert-object.context";

const apiVersionStrategies: Partial<any> = {
    'v1': new ConvertObjectStrategyV1()
}

export const NotionToHtml = (responseObject: Partial<any>, isRoot: boolean, apiVersion = 'v1') => {
    const objectToRead = isRoot ? responseObject.results: responseObject;
    const conversion = new ConvertObjectContext(apiVersionStrategies[apiVersion]);
    return conversion.convertObjectToHTML(objectToRead);
};
