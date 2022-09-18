const connectToMongo = require("./db");
const express = require('express')
var cors = require('cors')


connectToMongo()  // asynchronous
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.json("server start")
})

app.use('/api/authen', require('./routes/authen'))
app.use('/api/note', require('./routes/note'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

