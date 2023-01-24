const express = require('express');
const app = express();

const birds = require('./birds')
const port = 4000;

app.get('/', (req, res) => {
  res.send("Hello world")
})
app.post('/', (req, res) => {
  res.send("Got a POST request")
})
app.put('/user', (req, res) => {
  res.send("Got a PUT request at /user")
})
app.delete('/user', (req, res) => {
  res.send("Got a DELETE request at /user")
})

app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})

app.use('/birds',birds)

app.listen(port,() => {
  console.log(`Example app listenx on port ${port}`)
})

