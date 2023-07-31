let mongoose = require('mongoose');

mongoose.connect(process.env.URL,{useNewUrlParser: true,});

mongoose.connection.on('connected',()=>{
    console.log("MongoDB Connection is Done!!")
})

mongoose.connection.on('error',(err)=>{
    console.log("Mongoose Connection Error: " + err)
})