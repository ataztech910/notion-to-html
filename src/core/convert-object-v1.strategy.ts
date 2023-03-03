import { NotionDataTypes, tags } from "./convert-object.constants";
import { IConvertObjectStrategy, INotionBlock } from "./convert-object.types";

export default class ConvertObjectStrategyV1 implements IConvertObjectStrategy {
    convert(objectToConvert: INotionBlock[]): string {
        if(!Array.isArray(objectToConvert)) {
            throw Error("Object is empty");
        }
        let html = '';
        objectToConvert.forEach((item: INotionBlock) => {
            let tag;
            
            if (item.type.includes(NotionDataTypes.HEADING)) {
                tag = this.getHeadings(item);
            } else if (item.type === NotionDataTypes.BOOKMARK) {
               tag = `<a href="${(item[item.type] as Partial<any>).url}" target="_blank">${this.iterateChildren((item[item.type] as Partial<any>).caption, (item[item.type] as Partial<any>).url)}</a>`;
            } 
            else {
                tag = this.makeTagObject(tags[item.type], { 
                    text: (item[item.type] as Partial<any>).rich_text[0].plain_text,
                    annotations: (item[item.type] as Partial<any>).rich_text[0].annotations
                });
            }

            html += tag;    
        });
        return html;
    }

    iterateChildren(children: INotionBlock[], dafaultValue = '') {;
        let childrenHTML = dafaultValue;
        if(Array.isArray(children) && children.length > 0) {
            childrenHTML = '';
            children.forEach((item: INotionBlock) => {
                childrenHTML += this.makeTagObject(NotionDataTypes.SPAN, { 
                    text: (item as Partial<any>).text.content,
                    annotations: (item as Partial<any>).annotations
                });
            });
        }

        return childrenHTML
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
    
    makeTagObject(name: string, item: {text: string, annotations: Partial<any>}) {
        return `${this.nameToTag(name)}${this.wrapWithAnnotations(item.text, item.annotations)}${this.nameToTag(name, true)}`
    }

    getHeadings(item: INotionBlock) {
        const headingNumber = item.type.split('_');
        return this.makeTagObject(tags.heading.replace("*", headingNumber[1]), 
        { 
            text: (item[item.type] as Partial<any>).rich_text[0].plain_text,
            annotations: (item[item.type] as Partial<any>).rich_text[0].annotations
        });
    }
} 

