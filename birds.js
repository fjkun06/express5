const express = require('express')
const birdsRouter = express.Router()

birdsRouter.use((req,res,next) => {
  console.log("Time: ",Date.now())
  next()
})

birdsRouter.get('/', (req, res) => {
  res.send("Birds Home Page")
})

birdsRouter.get('/about', (req, res) => {
  res.send("Birds About Page")
})

module.exports = birdsRouter