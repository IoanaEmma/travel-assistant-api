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

export default {
    createFlight
}