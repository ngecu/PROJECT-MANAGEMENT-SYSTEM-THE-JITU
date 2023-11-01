import express, { json } from "express";
import project_router from "./routes/projectRoutes";
import { testConnection } from "./config/sqlConfig";
const app = express();
app.use(json());

// app.use("/", () => {
//   console.log("api is working");
// });

app.use("/project", project_router);

const PORT = 5200;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} `);
  testConnection();
});
