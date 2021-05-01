const http = require("http");

const requestListener = function (req, res) {
  const body = `Your user-agent is:\n\n${
    req.headers["user-agent"] ?? "Unknown"
  }`;
  res.writeHead(200, { server: "Node-HTTP" });
  res.end(body);
};

const server = http.createServer(requestListener);
server.listen(8080);
