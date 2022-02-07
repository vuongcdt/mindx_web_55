const express = require("express")
const router =  require("./routers")

const {connectToDb} = require("./database")

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(router)
app.use('/assets',express.static('assets'))
// app.use(express.json())

connectToDb()
const port = process.env.PORT
app.listen(port,()=>{
    console.log("App is running at ${port}");
})

