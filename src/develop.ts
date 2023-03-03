import { NotionToHtml } from ".";
import { mockData } from './mocks' ;

const develop = NotionToHtml(mockData, true);

console.log(develop);