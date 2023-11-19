const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile("/Users/amanbharadwaj/Desktop/my-notes-app/pages/index.html",{root:"/"})
})
app.get('/login', (req, res) => {
    res.sendFile("/Users/amanbharadwaj/Desktop/my-notes-app/pages/login.html",{root:"/"})
  })
app.get('/signup', (req, res) => {
    res.sendFile("/Users/amanbharadwaj/Desktop/my-notes-app/pages/signup.html",{root:"/"})
})  
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})