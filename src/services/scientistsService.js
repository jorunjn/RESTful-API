const { getData, saveData } = require("../db/db");
const FILE = "./scientists.json";

function getAllScientists() {
  return getData(FILE);
}

function getScientistById(id) {
  const data = getData(FILE);
  return data.find((sci) => sci.id === id);
}

function addScientist(newSci) {
  const data = getData(FILE);
  newSci.id = Date.now();
  data.push(newSci);
  saveData(FILE, data);
  return newSci;
}

function updateScientist(id, updatedSci) {
  const data = getData(FILE);
  const index = data.findIndex((sci) => sci.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedSci };
    saveData(FILE, data);
    return data[index];
  }
  return null;
}

function deleteScientist(id) {
  let data = getData(FILE);
  const filtered = data.filter((sci) => sci.id !== id);
  saveData(FILE, filtered);
  return filtered.length < data.length;
}

module.exports = {
  getAllScientists,
  getScientistById,
  addScientist,
  updateScientist,
  deleteScientist,
};
