enum NotionDataTypes {
    HEADING = 'heading',
    BOOKMARK = 'bookmark',
    PARAGRAPH = 'paragraph',
    BOLD = 'bold',
    ITALIC = 'italic',
    STRIKE_TROUGH = 'strikethrough',
    UNDERLINE = 'underline',
    CODE = 'code',
    SPAN = 'span',
    BULLET_LIST_ITEM = 'bulleted_list_item',
    CALLOUT = 'callout',
    DIVIDER = 'divider',
    FILE = 'file'
};

enum IconTypes {
    EMOJI = 'emoji',
    FILE = 'file',
    EXTERNAL = 'external'
};

const backgrounds =  {
    default: '#37352F',
    gray_background: '#9B9A97',
    brown_background: '#64473A',
    orange_background: '#D9730D',
    yellow_background: '#DFAB01',
    green_background: '#0F7B6C',
    blue_background: '#0B6E99',
    purple_background: '#6940A5',
    pink_background: '#AD1A72',
    red_background: '#E03E3E'
}

const tags: {[key: string]: string} = {
    [NotionDataTypes.HEADING]: 'h*',
    [NotionDataTypes.PARAGRAPH]: 'p',
    [NotionDataTypes.BOLD]: 'strong',
    [NotionDataTypes.ITALIC]: 'i',
    [NotionDataTypes.STRIKE_TROUGH]: 's',
    [NotionDataTypes.UNDERLINE]: 'u',
    [NotionDataTypes.CODE]: 'code',
    [NotionDataTypes.SPAN]: 'span',
    [NotionDataTypes.DIVIDER]: 'hr'
};

const textConstants = {
    [NotionDataTypes.BOOKMARK]: 'bookmark link'
}

export { tags, NotionDataTypes, textConstants, backgrounds, IconTypes };