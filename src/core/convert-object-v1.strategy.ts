import { NotionDataTypes, tags, textConstants } from "./convert-object.constants";
import { IConvertObjectStrategy, INotionBlock } from "./convert-object.types";

export default class ConvertObjectStrategyV1 implements IConvertObjectStrategy {
    classPrefix = 'notion-to-html';

    convert(objectToConvert: INotionBlock[]): string {
        if(!Array.isArray(objectToConvert)) {
            throw Error("Object is empty");
        }
        let html = '';
        for(let i = 0; i < objectToConvert.length; i++) {
            let tag;
            const item = objectToConvert[i];

            if (item.type.includes(NotionDataTypes.HEADING)) {
                tag = this.getHeadings(item);
            } else if (item.type === NotionDataTypes.BOOKMARK) {
               tag = `<div class="${this.makeClassName(NotionDataTypes.BOOKMARK)}">   
                        <a class="${this.makeClassName(NotionDataTypes.BOOKMARK)}__mainLink" href="${(item[item.type] as Partial<any>).url}" target="_blank">${textConstants[NotionDataTypes.BOOKMARK]}</a>
                        <div class="${this.makeClassName(NotionDataTypes.BOOKMARK)}__capton">${this.iterateChildren((item[item.type] as Partial<any>).caption, (item[item.type] as Partial<any>).url)}</div>
                      </div>`;
            } 
            else if (item.type === NotionDataTypes.BULLET_LIST_ITEM) {
                const buildList = this.buildListItem(objectToConvert, i); 
                tag = buildList.listHtml;
                i = buildList.indexToBreak - 1;
                html += tag;
                continue;
            }
            else {
                tag = this.makeTagObject(tags[item.type], { 
                    text: (item[item.type] as Partial<any>).rich_text[0].plain_text,
                    annotations: (item[item.type] as Partial<any>).rich_text[0].annotations,
                    href: item.href
                });
            }

            html += tag;
        }    
        return html;
    }

    buildListItem(list: INotionBlock[], index: number) {
        let listHtml = `<ul class="${this.makeClassName(NotionDataTypes.BULLET_LIST_ITEM)}">`;
        let indexToBreak = -1;
        let loopCounter = 0;
        for(let i = index; i < list.length; i++) {
            if (list[index].type === NotionDataTypes.BULLET_LIST_ITEM) {
                listHtml += `<li>${this.iterateChildren((list[index][list[index].type] as Partial<any>).rich_text)}</li>`;
            } else {
                indexToBreak = i;
                break;
            }
            loopCounter = i;
        }
        if (indexToBreak < 0) {
            indexToBreak = loopCounter;
        }
        listHtml += '</ul>';
        return { listHtml, indexToBreak };
    }

    makeClassName(className: string) {
        return `${this.classPrefix}-${className}`;
    }

    iterateChildren(children: INotionBlock[], dafaultValue = '') {;
        let childrenHTML = dafaultValue;
        if(Array.isArray(children) && children.length > 0) {
            childrenHTML = '';
            children.forEach((item: INotionBlock) => {
                childrenHTML += this.makeTagObject(NotionDataTypes.SPAN, { 
                    text: item.text.content,
                    annotations: item.annotations,
                    href: item.href
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

    wrapWithLink(link: string, tag: string) {
        return `<a href="${link}" target="_blank">${tag}</a>`;
    }
    
    makeTagObject(name: string, item: {text: string, annotations: Partial<any>, href: string | null}) {
        let producedTag = `${this.nameToTag(name)}${this.wrapWithAnnotations(item.text, item.annotations)}${this.nameToTag(name, true)}`;
        if (item.href && item.href !== null) {
            producedTag = this.wrapWithLink(item.href, producedTag);
        }
        return producedTag;
    }

    getHeadings(item: INotionBlock) {
        const headingNumber = item.type.split('_');
        return this.makeTagObject(tags.heading.replace("*", headingNumber[1]), 
        { 
            text: (item[item.type] as Partial<any>).rich_text[0].plain_text,
            annotations: (item[item.type] as Partial<any>).rich_text[0].annotations,
            href: item.href
        });
    }
} 

