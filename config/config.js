let mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/EmployeeAttenceTraking',{
    useNewUrlParser: true,
    useUnifiedTopology: true, // Add this line to use the new engine
});

mongoose.connection.on('connected',()=>{
    console.log("MongoDB Connection is Done!!")
})

mongoose.connection.on('error',(err)=>{
    console.log("Mongoose Connection Error: " + err)
})