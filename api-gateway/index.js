import express from "express";
import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer();
const app = express();

app.use("/user", (req, res) => {
  proxy.web(req, res, { target: "http://user:3001" });
});

app.use("/products", (req, res) => {
  proxy.web(req, res, { target: "http://product:3002" });
});

app.use("/orders", (req, res) => {
  proxy.web(req, res, { target: "http://order:3003" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
