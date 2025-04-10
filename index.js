const Framework = require("./framework/Application");
const experimentsRoutes = require("./src/routes/experimentsRoutes");
const scientistsRoutes = require("./src/routes/scientistsRoutes");

const app = new Framework();
const port = 5173;

app.addRouter(experimentsRoutes);
app.addRouter(scientistsRoutes);

app.listen(port, () => {
  console.log("server started on port", port);
});

