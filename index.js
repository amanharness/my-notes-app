const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const Note = require("./models/Note");
const User = require("./models/User");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Successfully Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Serve static HTML files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "signup.html"));
});

// User authentication routes
app.post("/login", async (req, res) => {
  const { userToken } = req.body;
  try {
    let user = await User.findOne(req.body);
    if (!user) {
      res.status(200).json({ success: false, message: "No user found" });
    } else {
      res.status(200).json({
        success: true,
        user: { email: user.email },
        message: "Login successful",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.post("/signup", async (req, res) => {
  const { userToken } = req.body;
  try {
    let user = await User.create(req.body);
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Note-related routes
app.post("/addnote", async (req, res) => {
  const { userToken } = req.body;
  try {
    let note = await Note.create(req.body);
    res.status(200).json({ success: true, note });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.post("/getnotes", async (req, res) => {
  const { userToken } = req.body;
  try {
    let notes = await Note.find({ email: req.body.email });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error("Error retrieving notes:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.delete("/deletenote/:id", async (req, res) => {
  const { userToken } = req.body;
  const noteId = req.params.id;

  try {
    let deletedNote = await Note.findByIdAndDelete(noteId);
    if (!deletedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      deletedNote,
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Serve about.html
app.get('/about', (req, res) => {
  const filePath = path.join(__dirname, 'about.html');
  console.log('Attempting to send file from path:', filePath);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
