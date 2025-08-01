import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../dataSource";
import { Flight } from "../entities/Flight";
import { FlightDetails } from "../entities/FlightDetails";

async function createFlight(req: Request, res: Response, next: NextFunction) {
    try {
        const flightData = req.body;
        if (!flightData) {
            return res.status(400).json({ message: "Missing flight properties in request body" });
        }

        const flightDetailsRepo = AppDataSource.getRepository(FlightDetails);

        // Create and save departureFlightDetails with segments
        const departureFlightDetails = flightDetailsRepo.create({
            totalStops: flightData.departureFlight.totalStops,
            segments: flightData.departureFlight.segments
        });
        await flightDetailsRepo.save(departureFlightDetails);

        // Create and save returnFlightDetails with segments
        const returnFlightDetails = flightDetailsRepo.create({
            totalStops: flightData.returnFlight.totalStops,
            segments: flightData.returnFlight.segments
        });
        await flightDetailsRepo.save(returnFlightDetails);

        // Now create and save the Flight entity, linking the details
        const flightRepo = AppDataSource.getRepository(Flight);
        const flightEntity = flightRepo.create({
            origin: flightData.origin,
            destination: flightData.destination,
            totalPrice: flightData.totalPrice,
            bookingUrl: flightData.bookingUrl,
            departureFlight: departureFlightDetails,
            returnFlight: returnFlightDetails
        });
        const savedFlight = await flightRepo.save(flightEntity);

        res.status(201).json(savedFlight);
    } catch (error) {
        next(error);
    }
}

async function getFlightCities(req: Request, res: Response, next: NextFunction) {
    try {
        const flightRepo = AppDataSource.getRepository(Flight);
        const flights = await flightRepo.find();
        const cities = Array.from(new Set(flights.map(flight => flight.destination)));
        res.status(200).json(cities);
    } catch (error) {
        next(error);
        res.status(500).json('Internal server error');
    }
}

async function getFlightsByCity(req: Request, res: Response, next: NextFunction) {
    try {
        const { city } = req.query;
        const flightRepo = AppDataSource.getRepository(Flight);
        let flights: Flight[];
        if (city) {
            flights = await flightRepo.find({
                where: { destination: city as string },
                relations: [
                    "departureFlight",
                    "departureFlight.segments",
                    "returnFlight",
                    "returnFlight.segments"
                ]
            });
        } else {
            flights = await flightRepo.find({
                relations: [
                    "departureFlight",
                    "departureFlight.segments",
                    "returnFlight",
                    "returnFlight.segments"
                ]
            });
        }
        res.json(flights);
    } catch (error) {
        next(error);
    }
}
async function deleteFlight(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const flightRepo = AppDataSource.getRepository(Flight);
        const flight = await flightRepo.findOneBy({ id: parseInt(id) });
        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }
        await flightRepo.remove(flight);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

export default {
    createFlight,
    getFlightCities,
    getFlightsByCity,
    deleteFlight
}