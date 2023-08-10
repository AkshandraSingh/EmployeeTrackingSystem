require('dotenv').config()
let express = require('express');

require('./config/modelConfig')
let commonRouter = require('./urls')
let logger = require('./utils/logger')

let app = express();
app.use(express.json())
app.use('/', commonRouter)

const HOST = "localhost";
const PORT = process.env.PORT || 8000
const serverLink = `Server Started on http://${HOST}:${PORT}`

const server = app.listen(PORT,()=>{
    console.log("Express server listening on Port: ",PORT)
    logger.info(serverLink)
})

module.exports = server