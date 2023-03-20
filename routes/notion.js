require("dotenv").config();
const client_1 = require('@notionhq/client');
var express = require('express');
var router = express.Router();


// const port = 8000;
const notionDatabaseId = process.env.NOTION_DATABASE_ID
const notionSecret = process.env.NOTION_SECRET 

// Initializing the Notion client with secret
const notion = new client_1.Client({
    auth: notionSecret,
  });

if (!notionDatabaseId || !notionSecret) {
  throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in env");
}


  /* GET Notion Database. */
router.get('/', function(req, res, next) {
  res.send('send resource');
    // (async () => {
    //     const response = await notion.databases.query({ database_id: notionDatabaseId });
    //     console.log(response);
    // })();
});

router.post('/', function(req, res, next) {
  (async (pageTitle, emoji, coverURL, selection, content) => {
    const response = await notion.pages.create({
      "cover": {
          "type": "external",
          "external": {
              "url": coverURL || "https://en.wikipedia.org/wiki/Lacinato_kale"
          }
      },

      "icon": {
          "type": "emoji",
          "emoji": '❎',
      },

      "parent": {
          "type": "database_id",
          "database_id": notionDatabaseId
      },

      "properties":{
        "title": [
          {
            "text": {
              "content": pageTitle,           
            }
          }
        ],
      },
      // "properties": {
      //     "Name": {
      //         "title": [
      //             {
      //                 "text": {
      //                     "content": pageTitle
      //                 }
      //             }
      //         ]
      //   },


      // "Description": {
      //       "rich_text": [
      //         {
      //           "text": {
      //             "content": content
      //           }
      //         }
      //     ]
      // },
      // "Start Date": {
      //   "date": {
      //     "start": "2022-03-19"
      //   }
      // },

      // "children": [
      //     {
      //         "object": "block",
      //         "heading_2": {
      //             "rich_text": [
      //                 {
      //                     "text": {
      //                         "content": "Lacinato kale"
      //                     }
      //                 }
      //             ]
      //         }
      //     },
      //     {
      //         "object": "block",
      //         "paragraph": {
      //             "rich_text": [
      //                 {
      //                     "text": {
      //                         "content": "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
      //                         "link": {
      //                             "url": "https://en.wikipedia.org/wiki/Lacinato_kale"
      //                         }
      //                     },
      //                     "href": "https://en.wikipedia.org/wiki/Lacinato_kale"
      //                 }
      //             ],
      //             "color": "default"
      //         }
      //     }
      // ]
  });
    console.log(response);
  })
  (
    req.body.page.pageTitle, 
    req.body.page.emoji, 
    req.body.page.cover,
    req.body.page.selection,
    req.body.page.content
  );
});


  
  module.exports = router;