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
- Image - done ✅
- Link Preview - will not be done 🚫
- Mention - will not be done 🚫
- Numbered list item - done ✅
- Paragraph - done ✅
- PDF - done ✅
- Quote - done ✅
- Synced block - it will be moved to after-release stage ⌚
- Table - it will be moved to after-release stage ⌚
- Table of contents - it will be moved to after-release stage ⌚
- Template - will not be done 🚫
- To do - done ✅
- Toggle blocks - it will be moved to after-release stage ⌚
- Video - it will be moved to after-release stage ⌚ (same as embed element)
