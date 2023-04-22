import express from "express";
import morgan from "morgan";
import cors from "cors";

function createServer() {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors());

  app.get("/health", (req, res) => {
    return res.json({ ok: true, environment: process.env.NODE_ENV });
  });

  app.get("/message/:name", (req, res) => {
    return res.json({ message: `hello ${req.params.name}` });
  });

  return app;
}

const port = process.env.PORT || 3000;
const server = createServer();

server.listen(port, () => {
  console.log(`API running on port: ${port}`);
});
