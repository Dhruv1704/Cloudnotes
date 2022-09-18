const mongoose = require('mongoose')

const monoURI = "mongodb+srv://Dhruv:123456DSN.@cluster0.fxwfygr.mongodb.net/cloudnotes";

const connectToMongo = ()=>{
    mongoose.connect(monoURI, ()=>{   // asynchronous
    }).then(()=>console.log("connection success"))
        .catch((err)=>console.log(err));
}

module.exports = connectToMongo;