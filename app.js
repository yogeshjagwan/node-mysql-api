const express = require("express");
const db = require("./db/db.js");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config({ path: "./.env" });
const app = express();

const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/:id", (req, res) => {
  let resp = [];
  let id = req.params.id;
  db.query(
    `SELECT * FROM tutorials WHERE id=?`,
    id,
    function (err, resp_tut, fields_tut) {
      if (err) throw err;
      db.query(
        "SELECT * FROM tut_category WHERE id=?",
        id,
        function (error, resp_cat, fields_cat) {
          if (error) throw error;
          db.query(
            "SELECT * FROM topics WHERE id=?",
            id,
            function (error, resp_topics, fields_topic) {
              if (error) throw error;

              db.query(
                "SELECT * FROM tutorial",
                function (error, resp_tutorial, fields_tutorial) {
                  if (error) throw error;
                  res.json({
                    pageProps: {
                      [fields_tut[0].table]: resp_tut,
                      [fields_cat[0].table]: resp_cat,
                      [fields_topic[0].table]: resp_topics,
                      [fields_tutorial[0].table]: resp_tutorial,
                    },
                  });
                }
              );
            }
          );
        }
      );
    }
  );
});
app.post(`/topics/add`, (req, res) => {
  const topic = req.body.topic;
  const sql = `INSERT INTO topics (topic) VALUES ('${topic}')`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("1 record inserted");
    res.json(result);
  });
});

app.get(`/`, (req, res) => {
  // const topic = req.body.topic;
  const sql = `SELECT * FROM topics WHERE id=1;`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
app.listen(port, () => {
  console.log(`server is started http://localhost:${port}`);
});

// app.post('/topics/add', (req, res) => {
//   let topic = req.body.topic
//   let sql = "INSERT INTO `topics` (topic) VALUES (javascript)";

//   db.query(sql, [topic], (err, rows, fields) => {
//       if(!err)
//         res.send("User successfully added");
//       else
//         console.log(err);
//    });
// });
