const express = require("express");
const db = require("./db/db.js");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const app = express();

const port = 4000;

app.get("/:id", (req, res) => {
  let resp = [];
  db.query("SELECT * FROM tutorials", function (err, resp_tut, fields_tut) {
    if (err) throw err;
    db.query(
      "SELECT * FROM tut_category",
      function (error, resp_cat, fields_cat) {
        if (error) throw error;
        db.query(
          "SELECT * FROM topics",
          function (error, resp_topics, fields_topic) {
            if (error) throw error;

            db.query(
              "SELECT * FROM tutorial",
              function (error, resp_tutorial, fields_tutorial) {
                if (error) throw error;
                res.json({pageProps:{
                  [fields_tut[0].table]: resp_tut,
                  [fields_cat[0].table]: resp_cat,
                  [fields_topic[0].table]: resp_topics,
                  [fields_tutorial[0].table]: resp_tutorial,
                }});
              })

          }
        );
      }
    );
  });
});

app.listen(port, () => {
  console.log(`server is started http://localhost:${port}`);
});
