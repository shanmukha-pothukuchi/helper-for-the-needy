var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var path = require("path");
totalData = {};

app.use(require("express").static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/admin", (req, res) => {
  res.sendFile(`${__dirname}/public/admin.html`);
});

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    totalData["message"] = msg;
  });
  socket.on("geo_data", (data) => {
    console.log(data);
    totalData["address"] = data;
  });
  socket.broadcast.emit("broadcast", totalData);
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
