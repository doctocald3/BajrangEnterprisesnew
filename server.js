const http = require("http");
const fs = require("fs");
const path = require("path");

// app.use('/images', express.static('images'));
else if (cleanUrl.endsWith(".css") || cleanUrl.startsWith("/images/"))
const server = http.createServer((req, res) => {

  let cleanUrl = req.url.replace(/\/$/, "");
  let filePath = "";

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
  else {
    // static files (css, images, etc)
    filePath = path.join(__dirname, cleanUrl);
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 - File Not Found</h1>");
      return;
    }

    let ext = path.extname(filePath);
    let type = "text/html";

    if (ext === ".css") type = "text/css";
    if (ext === ".png") type = "image/png";
    if (ext === ".jpg" || ext === ".jpeg") type = "image/jpeg";
    if (ext === ".gif") type = "image/gif";
    if (ext === ".svg") type = "image/svg+xml";

    res.writeHead(200, { "Content-Type": type });
    res.end(content);
  });

});

server.listen(4000, () => {
  console.log("✅ Server running at http://localhost:4000");
});


