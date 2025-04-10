const fs = require("fs");
const path = require("path");

function getData(file) {
  const filePath = path.join(__dirname, file);
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function saveData(file, data) {
  const filePath = path.join(__dirname, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { getData, saveData };
