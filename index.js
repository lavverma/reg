require("dotenv").config()
const express =  require("express")
const registerUser = require("./registerUser")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

mongoose.set('strictQuery', false)
mongoose.connect(process.env.DB_LINK, {
    useNewUrlParser: true
})
.then(()=>console.log(`Data Base is connected`))
.catch((err)=>console.log(err))

app.post("/registration", registerUser)

app.listen(process.env.PORT, ()=>{
    console.log(`server is running`);
})