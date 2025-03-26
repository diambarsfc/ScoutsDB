const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
require("dotenv").config()
const port = process.env.PORT || 5000
const scoutRoute = require("./routes/scout")


app.use(cors())
app.use(express.json())
app.use("/scouts", scoutRoute)



const client = express.static(path.join(__dirname, '/client/dist'))
const indexHTML = path.join(__dirname, '/client/dist/index.html')
app.use(client)
app.get("*", (req,res) => res.sendFile(indexHTML))

const dbo = require("./db/conn")
 
dbo.connectToMongoDB(function (error) {
    if (error) throw error

    app.listen(port, () => {
        console.log("Server is running on port: " + port)
    })
})