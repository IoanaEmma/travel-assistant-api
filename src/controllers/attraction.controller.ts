import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../dataSource";
import { Attraction } from "../entities/Attraction";

async function createAttraction(req: Request, res: Response, next: NextFunction) {
    try {
        const attractionData = req.body;
        if (!attractionData) {
            return res.status(400).json({ message: "Missing attraction properties in request body" });
        }

        const attractionRepo = AppDataSource.getRepository(Attraction);
        const attractionEntity = attractionRepo.create(attractionData);
        const savedAttraction = await attractionRepo.save(attractionEntity);

        res.status(201).json(savedAttraction);
    } catch (error) {
        next(error);
    }
}

async function getAttractionsCities(req: Request, res: Response, next: NextFunction) {
    try {
        const attractionRepo = AppDataSource.getRepository(Attraction);
        const attractions = await attractionRepo.find();
        const cities = Array.from(new Set(attractions.map(attraction => attraction.city)));
        res.status(200).json(cities);
    } catch (error) {
        next(error);
    }
}

async function getAttractionsByCity(req: Request, res: Response, next: NextFunction) {
    try {
        const { city } = req.query;
        const attractionRepo = AppDataSource.getRepository(Attraction);

        let attractions: Attraction[];
        if (city) {
            attractions = await attractionRepo.find({ where: { city: city as string } });
        } else {
            attractions = await attractionRepo.find();
        }

        res.json(attractions);
    } catch (error) {
        next(error);
    }
}

async function deleteAttraction(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const attractionRepo = AppDataSource.getRepository(Attraction);
        const attraction = await attractionRepo.findOneBy({ id: parseInt(id) });
        if (!attraction) {
            return res.status(404).json({ message: "Attraction not found" });
        }
        await attractionRepo.remove(attraction);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

export default {
    createAttraction,
    getAttractionsCities,
    getAttractionsByCity,
    deleteAttraction
}