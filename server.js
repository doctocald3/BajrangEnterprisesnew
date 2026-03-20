const http = require("http");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const server = http.createServer((req, res) => {

  // ✅ FIRST HANDLE POST
  if (req.method === "POST" && req.url === "/send-email") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const data = new URLSearchParams(body);

      const name = data.get("name");
      const email = data.get("email");
      const phone = data.get("phone");
      const message = data.get("message");

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "vp6203409@gmail.com",
          pass: "rrch xatn ofhv godl" // app password
        }
      });

      const mailOptions = {
        from: "Website Enquiry <vp6203409@gmail.com>",
        to: "dr.jahnvivarshney01@gmail.com",
        subject: "New Enquiry from Bajrang Enterprises Website",
        html: `
          <h2>New Website Enquiry</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Message:</b> ${message}</p>
        `
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.log(err);
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("<h2>Error sending message</h2>");
        } else {
          res.writeHead(302, {
  Location: "/"
});
res.end();
        }
      });
    });

    return; // 🔥 VERY IMPORTANT
  }

  // ✅ STATIC FILE HANDLING
  let filePath = "";
  let cleanUrl = req.url.replace(/\/$/, "");

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
     else if (cleanUrl === "/spider-glazing" || cleanUrl === "/spider-glazing.html") {
    filePath = path.join(__dirname, "spider-glazing.html");
  }
else if (cleanUrl.startsWith("/products/")) {
  let fileName = cleanUrl.replace("/products/", "");
  filePath = path.join(__dirname, fileName + ".html");
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
      if (ext === ".jpg" || ext === ".jpeg") type = "image/jpeg";
      if (ext === ".gif") type = "image/gif";

      res.writeHead(200, { "Content-Type": type });
      res.end(content);
    }
  });

});

server.listen(4000, () => {
  console.log("✅ Server running at http://localhost:4000");
});
