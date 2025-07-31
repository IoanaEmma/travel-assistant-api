import { NextFunction, Request, Response } from 'express';
import { getHotel } from '../services/hotel.service';
import { AppDataSource } from '../dataSource';
import { Hotel } from '../entities/Hotel';
import { HotelRate } from '../entities/HotelRate';
import { Rate } from '../types/hotels';

async function getHotelDetails(req: Request, res: Response, next: NextFunction) {
    try {
        const { key, checkInDate, checkOutDate } = req.query;
        console.log(`Fetching details for hotel key: ${key}, checkInDate: ${checkInDate}, checkOutDate: ${checkOutDate}`);
        const hotelDetails = await getHotel(
            key as string,
            checkInDate as string,
            checkOutDate as string
        );
        return res.json(hotelDetails);
    } catch (error) {
        next(error);
        res.status(500).json('Internal server error');
    }
}

async function createHotel(req: Request, res: Response, next: NextFunction) {
    try {
        const hotel: Hotel = req.body; // expecting { hotel: Hotel }
        if (!hotel) {
            return res.status(400).json({ message: "Missing hotel or userId in request body" });
        }
        const hotelRepo = AppDataSource.getRepository(Hotel);
        const hotelRateRepo = AppDataSource.getRepository(HotelRate);

        const hotelDetails = await getHotel(hotel.key, hotel.checkInDate, hotel.checkOutDate);
        const hotelEntity = hotelRepo.create(hotel);

        const savedHotel = await hotelRepo.save(hotelEntity);

        // Save rates and associate with hotel
        if (hotelDetails.rates && hotelDetails.rates.length > 0) {
            hotelDetails.rates.forEach(async (rate: Rate) => {
                const rateEntity = hotelRateRepo.create({
                    ...rate,
                    currency: hotelDetails.currency,
                    hotel: savedHotel
                });

                await hotelRateRepo.save(rateEntity);
            });
        }

        if (!savedHotel) {
            return res.status(500).json({ message: "Failed to create hotel" });
        }

        return res.status(201).json(savedHotel);
    } catch (error) {
        next(error);
        res.status(500).json('Internal server error');
    }
}

export default {
    getHotelDetails,
    createHotel
}