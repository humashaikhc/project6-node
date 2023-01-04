import express from "express";
import bodyParser from "body-parser";

import router from "./routes/routes.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use("/chocolate", router);

app.get("/", (req, res) => {
  res.send("Hello Huma");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

