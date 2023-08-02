const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const dataFilePath = path.join(__dirname, "db", "db.json");
// ↑↑↑↑↑↑↑↑↑↑↑↑ Server Setup ↑↑↑↑↑↑↑↑↑↑↑↑

app.get("/", (req, res) => {
    const indexPath = path.join(__dirname, "public", "index.html");
    res.sendFile(indexPath);
  });
  
  app.get("/notes", (req, res) => {
    const notesPath = path.join(__dirname, "public", "notes.html");
    res.sendFile(notesPath);
  });
  // ↑↑↑↑↑↑↑↑↑↑↑↑ HTML Page Setup ↑↑↑↑↑↑↑↑↑↑↑↑