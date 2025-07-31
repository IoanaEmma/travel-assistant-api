import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import chatRouter from "./src/routes/chat.route";
import hotelRouter from "./src/routes/hotel.route";
import tripRouter from "./src/routes/trip.route";
import flightRouter from "./src/routes/flight.route";
import attractionRouter from "./src/routes/attraction.route";
import { AppDataSource } from "./src/dataSource";

AppDataSource.initialize().then(() => {
	const app = express();
	const port = 3000;

	app.use(cors());
	app.get('/', (req, res) => {
		res.send('Hello World!');
	});

	app.use(express.json());
	app.use("/chat", chatRouter);
	app.use("/hotel", hotelRouter);
	app.use("/trip", tripRouter);
	app.use("/flight", flightRouter);
	app.use("/attraction", attractionRouter);

	app.listen(port, () => {
		return console.log(`Express is listening at http://localhost:${port}`);
	});
}).catch((error) => {
	console.error("Error during Data Source initialization:", error);
})

