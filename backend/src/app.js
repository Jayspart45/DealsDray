import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./utils/errorHandler.js";

const app = express();

let option = {
  origin: process.env.ORIGIN || "*",
  credentials: true,
};

app.use(cors(option));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


import userRouter from "./routes/user.routes.js"
import employeeRouter from "./routes/employee.routes.js"

app.get("/",()=>{
  console.log("Api running DealDray");
})

app.use("/api/v1/users", userRouter);
app.use("/api/v1/employee", employeeRouter);

app.use(errorHandler);

export { app };
