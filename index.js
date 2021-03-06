require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.use((req,res)=>{
   return res.status(404).end()
})
const PORT = 3002
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})

module.exports = {app, server}