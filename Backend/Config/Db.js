const mongoose =require('mongoose')
require('dotenv').config()

const ConnectDb=()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Db connected Succesfully!")
    })
    .catch((err)=>{
        console.log(err,"Error while connecting db!")
    })
}

module.exports=ConnectDb