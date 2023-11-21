const express = require("express");
const mongoose = require("mongoose");
const Note = require("./models/Note");
const User = require("./models/User");
const path = require("path");
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
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "signup.html"));
});

app.post("/login", async (req, res) => {
  const { userToken } = req.body;
  let user = await User.findOne(req.body);
  console.log(user);
  if (!user) {
    res.status(200).json({ success: false, message: "No user found" });
  } else {
    res
      .status(200)
      .json({
        success: true,
        user: { email: user.email },
        message: "No user found",
      });
  }
});
app.post("/signup", async (req, res) => {
  const { userToken } = req.body;
  console.log(req.body);
  try {
    // Create a new user in the database
    let user = await User.create(req.body);
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
app.post("/addnote", async (req, res) => {
  const { userToken } = req.body;
  // Create a new note in the database
  let note = await Note.create(req.body);
  res.status(200).json({ success: true, note });
});
app.post("/getnotes", async (req, res) => {
  const { userToken } = req.body;
  let notes = await Note.find({ email: req.body.email });
  res.status(200).json({ success: true, notes });
});
// Add a new route for deleting a note
app.delete("/deletenote/:id", async (req, res) => {
  const { userToken } = req.body;
  const noteId = req.params.id;

  try {
    // Find the note by ID and delete it
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Note deleted successfully",
        deletedNote,
      });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "about.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
