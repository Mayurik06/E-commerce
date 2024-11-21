import express from "express";
import { config } from "dotenv";
import dbConnection from "./connection/dbConnection.js";
import router from "./routes/categoryRoutes.js";

const app = express();
config({ path: "./.env" });

app.use(express.json());
app.use('/api/category',router)

dbConnection()
try {
    app.listen(process.env.PORT, () => {
      console.log("app is listing on port ", process.env.PORT);
    });
  } catch (error) {
    console.log("Error", error);
  }
  