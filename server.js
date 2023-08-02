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