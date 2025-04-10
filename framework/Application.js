const EventEmitter = require("events");
const http = require("http");
class Framework {
  constructor() {
    this.server = this._createServer();
    this.emitter = new EventEmitter();
    this.middlewares = [];
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          const handler = endpoint[method];
          handler(req, res);
        });
      });
    });
    const paths = Object.keys(router.endpoints);
    paths.forEach((p) => {
      const endpoint = router.endpoints[p];
      Object.keys(endpoint).forEach((m) => {
        this.emitter.on(this._getRouteMask(p, m), (req, res) => {
          try {
            endpoint[m](req, res);
          } catch (e) {
            res.statusCode = 500;
            res.end(e.message);
          }
        });
      });
    });
  }

  _createServer() {
    return http.createServer((req, res) => {
      let body = "";

      req.on("data", (chunck) => {
        body += chunck;
      });

      req.on("end", () => {
        if (body) {
          try {
            req.body = JSON.parse(body);
          } catch {
            req.body = body;
          }
        }

        const url = require("url");
        const parsed = url.parse(req.url, true);
        req.query = parsed.query || {};
        req.params = {};

        res.send = (data) => {
          res.end(data);
        };
        res.json = (data) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(data));
        };
        res.status = (code) => {
          res.statusCode = code;
          return res;
        };

        this.middlewares.forEach((middleware) => middleware(req, res));

        const emitted = this.emitter.emit(
          this._getRouteMask(req.url, req.method),
          req,
          res
        );

        if (!emitted) {
          res.end();
        }
      });
    });
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
}

module.exports = Framework;
