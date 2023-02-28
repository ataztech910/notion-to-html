import { NotionToHtml } from "../src/index";
test('Notion to HTML test', () => {
    const callToConvert = NotionToHtml('test123',  {test: 123});
    expect(callToConvert).toBe("{\"apiKey\":\"test123\",\"responseObject\":{\"test\":123}}");
});