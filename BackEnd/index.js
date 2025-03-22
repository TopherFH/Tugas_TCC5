import express from "express"
import cors from "cors"
import Route from "./route/Route.js";

const app = express() 
app.use(cors())
app.use(express.json())
app.use(Route)

import db from "./config/database.js"; // Sesuaikan path database.js

db.authenticate()
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Database connection error:", err));
  
app.listen(3000, ()=> console.log("Server has been running now!"))