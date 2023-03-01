import { tags } from "./convert-object.constants";
import { IConvertObjectStrategy, INotionBlock } from "./convert-object.types";

export default class ConvertObjectStrategyV1 implements IConvertObjectStrategy {
    convert(objectToConvert: INotionBlock[]): string {
        if(!Array.isArray(objectToConvert)) {
            throw Error("Object is empty");
        }
        let html = '';
        objectToConvert.forEach((item: INotionBlock) => {
            let tag;
            if (item.type.includes('heading')) {
                tag = this.getHeadings(item);
            } else {
                tag = this.makeTagObject(tags[item.type], item);
            }

            html += tag;    
        });
        return html;
    }

    nameToTag(name: string, isEnd = false) {
        return `<${isEnd ? '/' : ''}${name}>`;
    }

    wrapWithAnnotations(text: string, annotations: {[key: string]: string}) {
        let wrapped = text;
        for (const [key, value] of Object.entries(annotations)) {
            if (tags[key] && value) {
                wrapped = `${this.nameToTag(tags[key])}${wrapped}${this.nameToTag(tags[key], true)}`;
            } else if (key === 'color' && value && value !== 'default') {
                wrapped = `<font color="${value}">${wrapped}</font>`;
            }
        }
        return wrapped;
    }
    
    makeTagObject(name: string, item: INotionBlock) {
        const content = (item[item.type] as Partial<any>).rich_text[0].plain_text;
        const annotations = (item[item.type] as Partial<any>).rich_text[0].annotations;
        return `${this.nameToTag(name)}${this.wrapWithAnnotations(content, annotations)}${this.nameToTag(name, true)}`
    }

    getHeadings(item: INotionBlock) {
        const headingNumber = item.type.split('_');
        return this.makeTagObject(tags.heading.replace("*", headingNumber[1]), item);
    }
} 

