const service = require("../services/experimentsService");

exports.getAll = (req, res) => {
  res.json(service.getAllExperiments());
};

exports.getById = (req, res) => {
  const id = Number(req.params.id);
  const exp = service.getExperimentById(id);
  if (exp) res.json(exp);
  else res.status(404).json({ error: "Not found" });
};

exports.create = (req, res) => {
  const created = service.addExperiment(req.body);
  res.status(201).json(created);
};

exports.update = (req, res) => {
  const id = Number(req.params.id);
  const updated = service.updateExperiment(id, req.body);
  if (updated) res.json(updated);
  else res.status(404).json({ error: "Not found" });
};

exports.remove = (req, res) => {
  const id = Number(req.params.id);
  const ok = service.deleteExperiment(id);
  if (ok) res.json({ deleted: true });
  else res.status(404).json({ error: "Not found" });
};
