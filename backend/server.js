import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoute from "./routes/usersRoute.js";
import orderRoute from './routes/orderRoutes.js'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);


app.get('/api/config/paypal', (req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    ("Server is running " + process.env.NODE_ENV + " mode on port " + PORT)
      .yellow.bold
  )
);
