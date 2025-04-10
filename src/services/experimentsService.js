const { getData, saveData } = require("../db/db");
const FILE = "./experiments.json";

function getAllExperiments() {
  return getData(FILE);
}

function getExperimentById(id) {
  const data = getData(FILE);
  return data.find((exp) => exp.id === id);
}

function addExperiment(newExp) {
  const data = getData(FILE);
  newExp.id = Date.now(); 
  data.push(newExp);
  saveData(FILE, data);
  return newExp;
}

function updateExperiment(id, updatedExp) {
  const data = getData(FILE);
  const index = data.findIndex((exp) => exp.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedExp };
    saveData(FILE, data);
    return data[index];
  }
  return null;
}

function deleteExperiment(id) {
  let data = getData(FILE);
  const filtered = data.filter((exp) => exp.id !== id);
  saveData(FILE, filtered);
  return filtered.length < data.length;
}

module.exports = {
  getAllExperiments,
  getExperimentById,
  addExperiment,
  updateExperiment,
  deleteExperiment,
};
