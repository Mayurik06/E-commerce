import express from "express";
import { config } from "dotenv";
import dbConnection from "./connection/dbConnection.js";

const app = express();
config({ path: "./.env" });

dbConnection()
try {
    app.listen(process.env.PORT, () => {
      console.log("app is listing on port ", process.env.PORT);
    });
  } catch (error) {
    console.log("Error", error);
  }
  