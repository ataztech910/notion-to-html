## NOTION TO HTML LIBRARY

*** This package is in alpha version please use it in your own risk
This library is created to convert Notion API block response into the HTML code that can be used for the server rendering

to use the libraray please follow the instructions

1. install the package using `npm i notion-to-html` command
2. Then in your code import it using the code `import { NotionToHtml } from "notion-to-html";`
3. Use the library in your code like this `const html = NotionToHtml(<YOUR-API-RESPONSE>, true);`

At the current state we have following eleemnts covered:

- Bookmark - done ✅
- Breadcrumb - will not be done 🚫
- Bulleted list item - done ✅
- Callout - done ✅
- Child database - will not be done 🚫
- Child page - will not be done 🚫
- Code - done ✅
- Column list and column - will not be done 🚫
- Divider - done ✅
- Embed - as its requires third party software or same solution it will be moved to after-release stage ⌚
- Equation - it will be moved to after-release stage ⌚
- File - done ✅
- Headings - done ✅
- Image - pendindg resolution ⏳
- Link Preview - pendindg resolution ⏳
- Mention - pendindg resolution ⏳
- Numbered list item - pendindg resolution ⏳
- Paragraph - done ✅
- PDF - pendindg resolution ⏳
- Quote - pendindg resolution ⏳
- Synced block - pendindg resolution ⏳
- Table - pendindg resolution ⏳
- Table of contents - pendindg resolution ⏳
- Template - pendindg resolution ⏳
- To do - pendindg resolution ⏳
- Toggle blocks - pendindg resolution ⏳
- Video - pendindg resolution ⏳
