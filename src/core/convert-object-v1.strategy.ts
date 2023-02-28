import { tags } from "./convert-object.constants";
import { IConvertObjectStrategy, INotionBlock } from "./convert-object.types";

export default class ConvertObjectStrategyV1 implements IConvertObjectStrategy {
    convert(objectToConvert: Array<INotionBlock>): string {
        if(!Array.isArray(objectToConvert)) {
            throw Error("Object is empty");
        }
        objectToConvert.forEach((item: INotionBlock) => {
            // console.log(item);
            let tag;
            if (item.type.includes('heading')) {
                tag = this.getHeadings(item.type);
            } else {
                tag = this.makeTagObject(tags[item.type]);
            }
            console.log(tag);
        });
        return 'test';
    }

    nameToTag(name: string, isEnd = false) {
        return `<${isEnd ? '/' : ''}${name}>`;
    }
    
    makeTagObject(name: string) {
        return { 
            start: this.nameToTag(name), 
            end: this.nameToTag(name, true)
        };
    }

    getHeadings(type: string) {
        const headingNumber = type.split('_');
        return this.makeTagObject(tags.heading.replace("*", headingNumber[1]));
    }
} 

