const db = require('../database');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../client/dist'))); //gets file information to page

//create
app.post('/groceries', (req, res) => {
  const { item, quantity } = req.body;

  db.query(
    `INSERT INTO groceries (item, quantity) VALUES (?, ?)`,
    [item, quantity],
    (err, data) => {
      if (err) {
        console.log(err, err.message);
      } else {
        console.log('Information received');
        res.sendStatus(201);
      }
    }
  );
});

//read
app.get('/groceries', (req, res) => {
  const query = 'SELECT * FROM groceries';
  db.query(query, (err, data) => {
    if (err) {
      console.log(err, err.message);
    } else {
      res.send(data);
    }
  });
});

//update
app.put('/groceries', (req, res) => {
  const query = 'UPDATE groceries SET item=?, quantity=?, WHERE id= ?';
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
app.delete('/groceries/:item', (req, res) => {
  const query = 'DELETE FROM groceries WHERE item=?';
  var { item } = req.body;
  db.query(query, [req.params.item], (err, result) => {
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
    console.log('listening on port ', PORT);
  }
});
