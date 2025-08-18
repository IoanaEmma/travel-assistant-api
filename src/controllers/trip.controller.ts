import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../dataSource";
import { Trip } from "../entities/Trip";
import { Hotel } from "../entities/Hotel";
import { Flight } from "../entities/Flight";
import { Attraction } from "../entities/Attraction";
import { TRIP_ITEM_TYPES } from "../utils/constants";

async function createTrip(req: Request, res: Response, next: NextFunction) {
    try {
        const tripRepo = AppDataSource.getRepository(Trip);
        const trip = tripRepo.create(req.body);
        const savedTrip = await tripRepo.save(trip);
        res.status(201).json(savedTrip);
    } catch (error) {
        next(error);
    }
}

async function addItemToTrip(req: Request, res: Response, next: NextFunction) {
    try {
        const { tripId } = req.params;
        const { type, itemId } = req.body;

        const tripRepo = AppDataSource.getRepository(Trip);
        const trip = await tripRepo.findOne({
            where: { id: Number(tripId) },
            relations: [
                "hotel",
                "hotel.rates",
                "flight",
                "flight.departureFlight",
                "flight.departureFlight.segments",
                "flight.returnFlight",
                "flight.returnFlight.segments",
                "attractions"
            ]
        });

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        if (type === TRIP_ITEM_TYPES.HOTEL) {
            const hotelRepo = AppDataSource.getRepository(Hotel);
            const hotel = await hotelRepo.findOneBy({ id: itemId });
            if (!hotel) return res.status(404).json({ message: `${TRIP_ITEM_TYPES.HOTEL} not found` });
            trip.hotel = hotel;
        } else if (type === TRIP_ITEM_TYPES.FLIGHT) {
            const flightRepo = AppDataSource.getRepository(Flight);
            const flight = await flightRepo.findOneBy({ id: itemId });
            if (!flight) return res.status(404).json({ message: `${TRIP_ITEM_TYPES.FLIGHT} not found` });
            trip.flight = flight;
        } else if (type === TRIP_ITEM_TYPES.ATTRACTION) {
            const attractionRepo = AppDataSource.getRepository(Attraction);
            const attraction = await attractionRepo.findOneBy({ id: itemId });
            if (!attraction) return res.status(404).json({ message: `${TRIP_ITEM_TYPES.ATTRACTION} not found` });
            trip.attractions = [...(trip.attractions || []), attraction];
        } else {
            return res.status(400).json({ message: "Invalid type" });
        }

        const savedTrip = await tripRepo.save(trip);
        res.json(savedTrip);
    } catch (error) {
        next(error);
    }
}

async function getTrips(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params;
        const tripRepo = AppDataSource.getRepository(Trip);
        const trips = await tripRepo.find({
            where: { userId: Number(userId) }
        });
        res.json(trips);
    } catch (error) {
        next(error);
    }
}

async function getTripDetails(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId, tripId } = req.params;
        const tripRepo = AppDataSource.getRepository(Trip);
        const trip = await tripRepo.findOne({
            where: { userId: Number(userId), id: Number(tripId) },
            relations: [
                "hotel",
                "hotel.rates",
                "flight",
                "flight.departureFlight",
                "flight.departureFlight.segments",
                "flight.returnFlight",
                "flight.returnFlight.segments",
                "attractions"
            ]
        });

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        res.json(trip);
    } catch (error) {
        next(error);
    }
}

async function updateTrip(req: Request, res: Response, next: NextFunction) {
    try {
        const { tripId } = req.params;
        const tripRepo = AppDataSource.getRepository(Trip);

        let trip = await tripRepo.findOneBy({ id: Number(tripId) });
        if (!trip) return res.status(404).json({ message: "Trip not found" });

        trip.name = req.body.name;
        trip.status = req.body.status;
        trip.when = req.body.when;
        await tripRepo.save(trip);

        res.json(trip);
    } catch (error) {
        next(error);
    }
}

async function deleteTrip(req: Request, res: Response, next: NextFunction) {
    try {
        const { tripId } = req.params;
        const tripRepo = AppDataSource.getRepository(Trip);

        const trip = await tripRepo.findOneBy({ id: Number(tripId) });
        if (!trip) return res.status(404).json({ message: "Trip not found" });

        await tripRepo.remove(trip);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

async function removeItemFromTrip(req: Request, res: Response, next: NextFunction) {
    try {
        const { tripId } = req.params;
        const { type, itemId } = req.body;

        const tripRepo = AppDataSource.getRepository(Trip);
        const trip = await tripRepo.findOne({
            where: { id: Number(tripId) },
            relations: [
                "hotel",
                "hotel.rates",
                "flight",
                "flight.departureFlight",
                "flight.departureFlight.segments",
                "flight.returnFlight",
                "flight.returnFlight.segments",
                "attractions"
            ]
        });

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        if (type === TRIP_ITEM_TYPES.HOTEL) {
            if (trip.hotel && trip.hotel.id === itemId) {
                trip.hotel = null;
            } else {
                return res.status(404).json({ message: `${TRIP_ITEM_TYPES.HOTEL} not found in this trip` });
            }
        } else if (type === TRIP_ITEM_TYPES.FLIGHT) {
            if (trip.flight && trip.flight.id === itemId) {
                trip.flight = null;
            } else {
                return res.status(404).json({ message: `${TRIP_ITEM_TYPES.FLIGHT} not found in this trip` });
            }
        } else if (type === TRIP_ITEM_TYPES.ATTRACTION) {
            const attractionIndex = trip.attractions?.findIndex(attraction => attraction.id === itemId);
            if (attractionIndex !== undefined && attractionIndex >= 0) {
                trip.attractions = trip.attractions.filter(attraction => attraction.id !== itemId);
            } else {
                return res.status(404).json({ message: `${TRIP_ITEM_TYPES.ATTRACTION} not found in this trip` });
            }
        } else {
            return res.status(400).json({ message: "Invalid type" });
        }

        const savedTrip = await tripRepo.save(trip);
        res.json(savedTrip);
    } catch (error) {
        next(error);
    }
}
export default {
    createTrip,
    addItemToTrip,
    getTrips,
    getTripDetails,
    removeItemFromTrip,
    updateTrip,
    deleteTrip
}