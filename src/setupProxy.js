const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/user", {
      target: "http://18.206.229.27:8000",
      // target:"http://127.0.0.1:8000",
      changeOrigin: true,
    }),
    createProxyMiddleware("/tree", {
      target: "http://18.206.229.27:8000",
      // target:"http://127.0.0.1:8000",
      changeOrigin: true,
    })
  );
};
