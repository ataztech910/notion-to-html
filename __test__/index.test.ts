import { NotionToHtml } from "../src/index";
import { getFileLinkFromUrl } from "../src/utils/string-mutations";

describe('Smoke Tests for the appliction', () => {
  test('Notion to HTML test for header and pargraph', () => {
    const mockData = {
        "object": "list",
        "results": [
          {
            "object": "block",
            "id": "c02fc1d3-db8b-45c5-a222-27595b15aea7",
            "parent": {
              "type": "page_id",
              "page_id": "59833787-2cf9-4fdf-8782-e53db20768a5"
            },
            "created_time": "2022-03-01T19:05:00.000Z",
            "last_edited_time": "2022-03-01T19:05:00.000Z",
            "created_by": {
              "object": "user",
              "id": "ee5f0f84-409a-440f-983a-a5315961c6e4"
            },
            "last_edited_by": {
              "object": "user",
              "id": "ee5f0f84-409a-440f-983a-a5315961c6e4"
            },
            "has_children": false,
            "archived": false,
            "type": "heading_2",
            "heading_2": {
              "rich_text": [
                {
                  "type": "text",
                  "text": {
                    "content": "Lacinato kale",
                    "link": null
                  },
                  "annotations": {
                    "bold": false,
                    "italic": false,
                    "strikethrough": false,
                    "underline": false,
                    "code": false,
                    "color": "default"
                  },
                  "plain_text": "Lacinato kale",
                  "href": null
                }
              ],
              "color": "default",
              "is_toggleable": false
            }
          },
          {
            "object": "block",
            "id": "acc7eb06-05cd-4603-a384-5e1e4f1f4e72",
            "parent": {
              "type": "page_id",
              "page_id": "59833787-2cf9-4fdf-8782-e53db20768a5"
            },
            "created_time": "2022-03-01T19:05:00.000Z",
            "last_edited_time": "2022-03-01T19:05:00.000Z",
            "created_by": {
              "object": "user",
              "id": "ee5f0f84-409a-440f-983a-a5315961c6e4"
            },
            "last_edited_by": {
              "object": "user",
              "id": "ee5f0f84-409a-440f-983a-a5315961c6e4"
            },
            "has_children": false,
            "archived": false,
            "type": "paragraph",
            "paragraph": {
              "rich_text": [
                {
                  "type": "text",
                  "text": {
                    "content": "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
                    "link": {
                      "url": "https://en.wikipedia.org/wiki/Lacinato_kale"
                    }
                  },
                  "annotations": {
                    "bold": false,
                    "italic": false,
                    "strikethrough": false,
                    "underline": false,
                    "code": false,
                    "color": "default"
                  },
                  "plain_text": "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
                  "href": "https://en.wikipedia.org/wiki/Lacinato_kale"
                }
              ],
              "color": "default"
            }
          }
        ],
        "next_cursor": null,
        "has_more": false,
        "type": "block",
        "block": {}
    };
    const callToConvert = NotionToHtml(mockData, true);
    expect(callToConvert).toBe("<h2>Lacinato kale</h2><p>Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.</p>");
  });

  test('Check regex for urls', () => {
    const mockData = "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/954fcedd-60f3-4fde-95f7-bb5ab4c7ef7a/519702322637-6079832709-Ticket.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45/20230311/us-west-2/s3/aws4_request&X-Amz-Date=20230311T192558Z&X-Amz-Expires=3600&X-Amz-Signature=cb2ca35b50c3a742b3debc3b81632ed850dc6a92004056200c7ad414a8ca69be&X-Amz-SignedHeaders=host&x-id=GetObject";

    const checkUrl = getFileLinkFromUrl(mockData);
    expect(checkUrl).toBe("519702322637-6079832709-Ticket.pdf");

  })
});

