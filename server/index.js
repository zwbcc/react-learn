const express = require('express')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')

const app = new express()
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user',userRouter)
app.listen(8080,()=>{
  console.log(1)
})