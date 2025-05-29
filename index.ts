import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"; 
import chatRouter from "./src/routes/chat";
import hotelRouter from "./src/routes/hotel";


const app = express();
const port = 3000;

app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use("/chat", chatRouter);
app.use("/hotel", hotelRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});