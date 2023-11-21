const express = require("express");
const mongoose = require("mongoose");
const Note = require("./models/Note");
const User = require("./models/User");
const app = express();
const port = 3000;
app.use(express.json({ extended: true }));
app.use(express.urlencoded());

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Successfully Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.sendFile("/Users/amanbharadwaj/Desktop/my-notes-app/pages/index.html", {
    root: "/",
  });
});
app.get("/login", (req, res) => {
  res.sendFile("/Users/amanbharadwaj/Desktop/my-notes-app/pages/login.html", {
    root: "/",
  });
});
app.get("/signup", (req, res) => {
  res.sendFile("/Users/amanbharadwaj/Desktop/my-notes-app/pages/signup.html", {
    root: "/",
  });
});
app.post("/login", async(req, res) => {
  const { userToken } = req.body;
  let user = await User.findOne(req.body)
  console.log(user)
  if(!user){
    res.status(200).json({success:false, message: "No user found"})
  }
  else{
    res.status(200).json({success:true,user:{email: user.email}, message: "No user found"})
  }
})
app.post("/signup", async (req, res) => {
  const { userToken } = req.body;
  console.log(req.body);
  try {
    // Create a new user in the database
    let user = await User.create(req.body);
    res.status(200).json({ success: true, user: user });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }

});
app.post("/addnote", async (req, res) => {
  const { userToken } = req.body;
    // Create a new note in the database
    let note = await Note.create(req.body)
    res.status(200).json({ success: true, note })
})
app.post("/getnotes", async (req, res) => {
  const { userToken } = req.body;
  let notes = await Note.find({email: req.body.email})
  res.status(200).json({ success: true, notes });

});
app.get('/about',(req,res)=>{
  const { userToken } = req.body;
  res.sendFile("/Users/amanbharadwaj/Desktop/my-notes-app/about.html", {
    root: "/",
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
