import express from "express";
import cors from "cors";
import { json } from "sequelize";
import router from "./route/NoteRoute.js"
import UserRoutes from "./route/UserRoute.js";
import "./model/UserModel.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; 

dotenv.config();
const app = express();

app.use(cors({credentials: true, origin: 'http://127.0.0.1:5500'}));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(UserRoutes);

app.listen(3000, ()=> console.log('server up and running'));