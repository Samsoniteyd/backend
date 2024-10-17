import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/tasksRoutes.js';
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

const app = express();
dotenv.config();
// mongoose.set("strictQuery", true);
// const port = process.env.PORT || 8000;
mongoose.connect(
  process.env.MONGO_URL
).then(()=> console.log ("DBConnection successfull"))
.catch((err)=> {
   console.log(err);
});

app.use(cors({ origin:process.env.CLIENT_URL, credentials: true}));
app.use(express.json());
app.use(cookieParser());


app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);




app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
  
    return res.status(errorStatus).send(errorMessage);
  });
  
  app.listen(process.env.PORT || 8000, () => {
    console.log("backend server is running");
});











// const server = async () => {
//     try {
//       await connect();
  
//       app.listen(port, () => {
//         console.log(`Server is running on port ${port}`);
//       });
//     } catch (error) {
//       console.log("Failed to strt server.....", error.message);
//       process.exit(1);
//     }
//   };
  
//   server();