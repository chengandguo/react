let express = require("express"),
  os = require("os"),
  opn = require("opn"),    // 自动打开浏览器的模块
  address = require("address"),    // 读取服务器ip地址的模块
  app = express(),
  ip = address.ip() || os.networkInterfaces().en1[1].address,    // 获得服务器的ip地址
  port = 3001,
  url = `http://${ip}:${port}`;


app.get("/getFruitList", (req, res) => {
  res.send({
    data: ["apple", "banana", "pear"],
  })
});

/* 读取静态资源 */
// app.use("/", express.static("../dist"));

app.listen(port, "0.0.0.0", (req, res) => {
  console.log(`The server is running at ${url}`);
  opn(url);      // 自动打开默认的浏览器
});