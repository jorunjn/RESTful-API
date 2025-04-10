const service = require("../services/scientistsService");

exports.getAll = (req, res) => {
  res.json(service.getAllScientists());
};

exports.getById = (req, res) => {
  const id = Number(req.params.id);
  const sci = service.getScientistById(id);
  if (sci) res.json(sci);
  else res.status(404).json({ error: "Not found" });
};

exports.create = (req, res) => {
  const created = service.addScientist(req.body);
  res.status(201).json(created);
};

exports.update = (req, res) => {
  const id = Number(req.params.id);
  const updated = service.updateScientist(id, req.body);
  if (updated) res.json(updated);
  else res.status(404).json({ error: "Not found" });
};

exports.remove = (req, res) => {
  const id = Number(req.params.id);
  const ok = service.deleteScientist(id);
  if (ok) res.json({ deleted: true });
  else res.status(404).json({ error: "Not found" });
};
