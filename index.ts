import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import chatRouter from "./src/routes/chat"

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use("/chat", chatRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});