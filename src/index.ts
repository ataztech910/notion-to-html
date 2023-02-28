export const NotionToHtml = (apiKey: string, responseObject: Partial<any>) => {
  return JSON.stringify({ apiKey, responseObject});
};
