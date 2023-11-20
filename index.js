const express = require('express')
const mongoose = require('mongoose')
const Note = require('./models/Note')
const User = require('./models/User')
const app = express()
const port = 3000;
app.use(express.json({ extended: true }))
app.use(express.urlencoded())

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Successfully Connected to MongoDB")
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error)
  })

app.get("/", (req, res) => {
  res.sendFile("/Users/amanbharadwaj/Desktop/my-notes-app/pages/index.html", {
    root: "/",
  })
})
app.get("/login", (req, res) => {
  res.sendFile("/Users/amanbharadwaj/Desktop/my-notes-app/pages/login.html", {
    root: "/",
  })
})
app.get("/signup", (req, res) => {
  res.sendFile("/Users/amanbharadwaj/Desktop/my-notes-app/pages/signup.html", {
    root: "/",
  })
})
app.post("/login", (req, res) => {
  const { userToken } = req.body;
})
app.post('/signup', async (req, res) => {
  const { userToken } = req.body;
  console.log(req.body)
  let user = await User.create(req.body)
  res.status(200).json({success:true, user:user})
})
app.post("/addnote", (req, res) => {
  const { userToken } = req.body;
})
app.post("/getnotes", (req, res) => {
  const { userToken } = req.body;
})
app.post("/deletenote", (req, res) => {
  const { userToken } = req.body;
})
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})
