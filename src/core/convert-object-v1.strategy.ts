import { getFileLinkFromUrl } from "../utils/string-mutations";
import { backgrounds, IconTypes, NotionDataTypes, tags, textConstants } from "./convert-object.constants";
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
            else if (item.type === NotionDataTypes.CALLOUT) {
                const color: keyof typeof backgrounds = (item[item.type] as Partial<any>).color
                tag = `<div class="${this.makeClassName(NotionDataTypes.CALLOUT)}" style="background: ${backgrounds[color]};">
                        <div class="${this.makeClassName(NotionDataTypes.CALLOUT)}__icon">
                            ${this.buildIcon((item[item.type] as Partial<any>).icon)}
                        </div>
                        <div class="${this.makeClassName(NotionDataTypes.CALLOUT)}__content">
                            ${this.iterateChildren((item[item.type] as Partial<any>).rich_text)}
                        </div>
                       </div>`;
            }
            else if (item.type === NotionDataTypes.QUOTE) {
                // TODO dstruct the color base to make it reusable across the project
                const color: keyof typeof backgrounds = (item[item.type] as Partial<any>).color + '_background' as keyof typeof backgrounds;
                tag = `<div class="${this.makeClassName(item.type)}" style="border-left: 2px solid ${backgrounds[color]}; color: ${backgrounds[color]};">
                        <div class="${this.makeClassName(item.type)}__content">
                            ${this.iterateChildren((item[item.type] as Partial<any>).rich_text)}
                        </div>
                       </div>`;
            }
            else if(item.type === NotionDataTypes.DIVIDER) {
                tag = this.nameToTag(tags[NotionDataTypes.DIVIDER]);
            }
            else if(item.type === NotionDataTypes.FILE || item.type === NotionDataTypes.PDF) {
                tag = `<div class="${this.makeClassName(item.type)}">   
                        <a class="${this.makeClassName(item.type)}__mainLink" href="${(item[item.type] as Partial<any>).file.url}" target="_blank">${getFileLinkFromUrl((item[item.type] as Partial<any>).file.url)}</a>
                        <div class="${this.makeClassName(item.type)}__capton">${this.iterateChildren((item[item.type] as Partial<any>).caption, (item[item.type] as Partial<any>).url)}</div>
                      </div>`;
            }
            else if (item.type === NotionDataTypes.CODE) {
                tag = `<div class="${this.makeClassName(NotionDataTypes.CODE)}">   
                            <code class="${this.makeClassName(NotionDataTypes.CODE)}__content language-${(item[item.type] as Partial<any>).language}">${this.iterateChildren((item[item.type] as Partial<any>).rich_text)}</code>
                            <div class="${this.makeClassName(NotionDataTypes.CODE)}__capton">${this.iterateChildren((item[item.type] as Partial<any>).caption, (item[item.type] as Partial<any>).url)}</div>
                       </div>`;
            } 
            else if (item.type === NotionDataTypes.BULLET_LIST_ITEM || item.type === NotionDataTypes.NUMBERED_LIST_ITEM || item.type === NotionDataTypes.TODO) {
                const buildList = this.buildListItem(objectToConvert, i, item.type); 
                tag = buildList.listHtml;
                i = buildList.indexToBreak;
                html += tag;
                continue;
            }
            else if(item.type === NotionDataTypes.IMAGE) {
                tag = `<div class="${this.makeClassName(NotionDataTypes.IMAGE)}">   
                        <figure>
                        <img src="${(item[item.type] as Partial<any>).file.url}" alt="iamge" style="width:100%">
                            <figcaption>${this.iterateChildren((item[item.type] as Partial<any>).caption, (item[item.type] as Partial<any>).url)}</figcaption>
                        </figure> 
                      </div>`;
            }
            else {
                tag = this.makeTagObject(tags[item.type], { 
                    text: this.getItemFromRichText((item[item.type] as Partial<any>).rich_text, 'plain_text'),
                    annotations: this.getItemFromRichText((item[item.type] as Partial<any>).rich_text, 'annotations'),
                    href: item.href
                });
            }

            html += tag;
        }    
        return html;
    }

    buildIcon(iconObject: {type: string, [key: string]: string | Partial<any>}) {
        switch(iconObject.type) {
            case IconTypes.EMOJI: 
                return `<span>${(iconObject as Partial<any>)[iconObject.type]}</span>`;
            case IconTypes.EXTERNAL:
                return `<img src="${(iconObject as Partial<any>)[iconObject.type].url}" alt="Callout icon" />`;
            case IconTypes.FILE:
                return `<picture>
                            <source media="(min-width:650px)" srcset="${(iconObject as Partial<any>)[iconObject.type].url}">
                            <source media="(min-width:465px)" srcset="${(iconObject as Partial<any>)[iconObject.type].url}">
                            <img src="${(iconObject as Partial<any>)[iconObject.type].url}" alt="Callout image" style="width:auto;">
                        </picture>`;  
        }
    }

    buildListItem(list: INotionBlock[], index: number, type: string) {
        const isNumbered = type === NotionDataTypes.NUMBERED_LIST_ITEM;
        const isTodo = type === NotionDataTypes.TODO;

        let listHtml = `<${!isNumbered? 'u' : 'o'}l class="${this.makeClassName(type)}">`;
        let indexToBreak = -1;
        let loopCounter = 0;
        for(let i = index; i < list.length; i++) {
            if (list[i].type === type) {
                listHtml += `<li>
                                ${isTodo? `<input type="checkbox" disabled ${(list[i][list[i].type] as Partial<any>).checked? 'checked' : ''} />`: ''}
                                ${this.iterateChildren((list[i][list[i].type] as Partial<any>).rich_text)}
                             </li>`;
            } else {
                indexToBreak = i;
                break;
            }
            
            loopCounter = i;
        }
        if (indexToBreak < 0) {
            indexToBreak = loopCounter;
        }
        listHtml += `</${!isNumbered? 'u' : 'o'}l>`;
        return { listHtml, indexToBreak };
    }

    getItemFromRichText(item: Partial<any>[], key: string) {
        return item && item.length > 0 ? item[0][key] : '';
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

