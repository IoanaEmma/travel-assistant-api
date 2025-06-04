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

export default {
    createAttraction
}