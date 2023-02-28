import { NotionToHtml } from "../src/index";
test('Notion to HTML test', () => {
    const callToConvert = NotionToHtml({test: 123}, true);
    expect(callToConvert).toBe("{\"test\":123}}");
});