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
app.listen(5015,()=>{
    console.log("App is running at 5015");
})

