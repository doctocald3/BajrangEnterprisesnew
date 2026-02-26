const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {

  let filePath = "";
  let cleanUrl = req.url.replace(/\/$/, ""); // 🔥 end slash remove karega

  if (cleanUrl === "" || cleanUrl === "/index.html") {
    filePath = path.join(__dirname, "index.html");
  } 
  else if (cleanUrl === "/about" || cleanUrl === "/about.html") {
    filePath = path.join(__dirname, "about.html");
  } 
  else if (cleanUrl === "/gallery" || cleanUrl === "/gallery.html") {
    filePath = path.join(__dirname, "gallery.html");
  }
  else if (cleanUrl === "/contact" || cleanUrl === "/contact.html") {
    filePath = path.join(__dirname, "contact.html");
  }
  else if (cleanUrl.endsWith(".css") || cleanUrl.startsWith("/images/")) {
    filePath = path.join(__dirname, cleanUrl.replace("/", ""));
  }
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Page Not Found</h1>");
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("<h1>404 - File Not Found</h1>");
    } else {
      let ext = path.extname(filePath);
      let type = "text/html";

      if (ext === ".css") type = "text/css";
      if (ext === ".png") type = "image/png";
      if (ext === ".jpg") type = "image/jpeg";
      if (ext === ".jpeg") type = "image/jpeg";
      if (ext === ".gif") type = "image/gif";

      res.writeHead(200, { "Content-Type": type });
      res.end(content);
    }
  });

});

server.listen(4000, () => {
  console.log("✅ Server running at http://localhost:4000");
});