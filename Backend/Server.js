const express=require('express')
const app=express()

require('dotenv').config()

const PORT=process.env.PORT || 2000


//importing Db function
const ConnectDb=require('../Backend/Config/Db')


//middlewares
app.use(express.json())



//connecting to db by callin the function

ConnectDb()



app.listen(PORT,()=>{
  console.log("Server is running at",PORT)
})



