import express from "express"
import mongoose from "mongoose"
import apiRegister from "./api-register.js"

const server = express()
const port = 3000

server.use(express.json())

mongoose.connect("mongodb+srv://gesraunal:esra0789@cluster0.qz4pl3b.mongodb.net/")
//connectTimeoutMS: 30000,

apiRegister(server, mongoose)

server.listen(port, () => console.log(`Listening on port http://localhost:${port}`))