enum NotionDataTypes {
    HEADING = 'heading',
    BOOKMARK = 'bookmark',
    PARAGRAPH = 'paragraph',
    BOLD = 'bold',
    ITALIC = 'italic',
    STRIKE_TROUGH = 'strikethrough',
    UNDERLINE = 'underline',
    CODE = 'code',
    SPAN = 'span'
}

const tags: {[key: string]: string} = {
    [NotionDataTypes.HEADING]: 'h*',
    [NotionDataTypes.PARAGRAPH]: 'p',
    [NotionDataTypes.BOLD]: 'strong',
    [NotionDataTypes.ITALIC]: 'i',
    [NotionDataTypes.STRIKE_TROUGH]: 's',
    [NotionDataTypes.UNDERLINE]: 'u',
    [NotionDataTypes.CODE]: 'code',
    [NotionDataTypes.SPAN]: 'span'
};

const textConstants = {
    [NotionDataTypes.BOOKMARK]: 'bookmark link'
}

export { tags, NotionDataTypes, textConstants };