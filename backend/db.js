const mongoose = require('mongoose')
require('dotenv').config();

const monoURI = process.env.MONGO_URI;
mongoose.set('strictQuery', false);

const connectToMongo = ()=>{
    mongoose.connect(monoURI, ()=>{   // asynchronous
    }).then(()=>console.log("connection success"))
        .catch((err)=>console.log(err));
}

module.exports = connectToMongo;
