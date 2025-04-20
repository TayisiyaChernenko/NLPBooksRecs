const express = require('express')
const app = express()
const port = 3001
const merchant_model = require('./merchant_model')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});


app.get('/api/books', (req, res) => {
  const title = req.query.title;
  if (!title) {
    return res.status(400).send({ error: 'Title parameter is required' });
  }
  
  merchant_model.searchBooks(title)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    console.error('Database error:', error);
    res.status(500).send({ error: 'Internal server error' });
  })
})

app.get('/api/books/top-rated', (req, res) => {
  merchant_model.getTopRatedBooks()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    console.error('Database error:', error);
    res.status(500).send({ error: 'Internal server error' });
  })
})              

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
