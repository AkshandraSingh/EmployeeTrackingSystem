require('dotenv').config()
require('./config/config')
let express = require('express');
let logger = require('./utils/logger')

let app = express();
const HOST = "localhost";
const PORT = process.env.PORT || 8000
const serverLink = `Server Started on http://${HOST}:${PORT}`

app.use(express.json())

app.listen(PORT,()=>{
    console.log("Express server listening on port ",PORT)
    console.log(serverLink)
    logger.info(serverLink)
})