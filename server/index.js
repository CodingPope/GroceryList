const db = require("../database");
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
// const http = require('../client/dist')
app.use(express.json());
app.use("/", express.static("client/dist")); //gets file information to page

//create
app.post("/groceries", (req, res) => {
  const { item, quantity } = req.body;

  console.log("----", item);

  db.query(
    `INSERT INTO  groceries (item, quantity) VALUES (?, ?)`,
    [item, quantity],
    (err, data) => {
      if (err) {
        console.log(err, err.message);
      } else {
        console.log("Information received");
        res.sendStatus(201);
      }
    }
  );
});

//read
app.get("/groceries/:id", (req, res) => {
  const query = "SELECT * FROM groceries where id=?";
  db.query(query, [req.params.id], (err, data) => {
    if (err) {
      console.log(err, err.message);
    } else {
      res.send(data);
    }
  });
});

//update
app.put("/groceries", (req, res) => {
  const query = "UPDATE groceries SET item=?, quantity=?, WHERE id= ?";
  const { item, id, quantity } = req.body;

  db.query(query, [item, quantity, id], (err, result) => {
    if (err) {
      console.log(err, err.message);
    } else {
      res.send(result);
    }
  });
});

//delete
app.delete("/groceries", (req, res) => {
  const query = "DELETE FROM groceries WHERE id=?";
  var { item, id, quantity } = req.body;
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.log(err, err.message);
    } else {
      res.send(result);
    }
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err, err.message);
  } else {
    console.log("listening on port ", PORT);
  }
});
// ---------------------------------------

// // __dirname == /Users/trumanpurnell/Workspace/hackreactor/hr-den15/hr-den15-grocery-list/backend/server

// app.use(express.json());
// app.use("/", express.static(path.join(__dirname, "../../frontend/dist")));

// app.get("/groceries", (req, res) => {
//   db.query("SELECT * FROM groceries", (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     res.send(data);
//   });
// });

// app.get("/groceries/:id", (req, res) => {
//   db.query(
//     "SELECT * FROM groceries WHERE id = ?",
//     [req.params.id],
//     (err, data) => {
//       if (err) {
//         console.log(err);
//       }
//       res.send(data);
//     }
//   );
// });

// app.post("/groceries", (req, res) => {
//   const { item, purchased, best_before, quantity } = req.body;

//   db.query(
//     `INSERT INTO groceries (item, quantity, purchased, best_before) VALUES (?, ?)`,
//     [item, quantity],
//     (err, data) => {
//       if (err) {
//         console.log(err);
//       }
//       res.sendStatus(201);
//     }
//   );
// });

// app.put("/groceries", (req, res) => {
//   const { id, item, quantity } = req.body;

//   console.log(req.body);

//   db.query(
//     "UPDATE groceries SET item = ?, quantity = ? WHERE id = ?",
//     [item, quantity, id],
//     (err, data) => {
//       if (err) {
//         console.log(err);
//       }
//       res.send(data);
//     }
//   );
// });

// app.delete("/groceries/:id", (req, res) => {
//   db.query(
//     "DELETE FROM groceries WHERE id = ?",
//     [req.params.id],
//     (err, data) => {
//       if (err) {
//         console.log(err);
//       }
//       res.send(data);
//     }
//   );
// });

// app.listen(PORT, (err) => {
//   if (err) {
//     console.log(err, err.message);
//   } else {
//     console.log("listening on port ", PORT);
//   }
// });
