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

async function getHotelsCities(req: Request, res: Response, next: NextFunction) {
    try {
        const hotelRepo = AppDataSource.getRepository(Hotel);
        const hotels = await hotelRepo.find();
        const cities = Array.from(new Set(hotels.map(hotel => hotel.city)));
        res.status(200).json(cities);
    }
    catch (error) {
        next(error);
        res.status(500).json('Internal server error');
    }
}

async function getHotelsByCity(req: Request, res: Response, next: NextFunction) {
    try {
        const { city } = req.query;
        const hotelRepo = AppDataSource.getRepository(Hotel);
        let hotels: Hotel[];
        if (city) {
            hotels = await hotelRepo.find({
                where: { city: city as string },
                relations: ["rates"] 
            });
        } else {
            hotels = await hotelRepo.find({
                relations: ["rates"] 
            });
        }

        // Add price property with min and max from rates
        const hotelsWithPrice = hotels.map(hotel => {
            const rates = hotel.rates || [];
            const prices = rates.map(rate => rate.ratePerNight);

            const price = {
                min: prices.length > 0 ? Math.min(...prices) : 0,
                max: prices.length > 0 ? Math.max(...prices) : 0
            };

            delete hotel.rates;

            return {
                ...hotel,
                price
            };
        });

        res.json(hotelsWithPrice);
    } catch (error) {
        next(error);
    }
}

async function deleteHotel(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const hotelRepo = AppDataSource.getRepository(Hotel);
        const hotel = await hotelRepo.findOneBy({ id: parseInt(id) });
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        await hotelRepo.remove(hotel);
        res.status(204).send();
    } catch (error) {
        next(error);
        res.status(500).json('Internal server error');
    }
}

export default {
    getHotelDetails,
    createHotel,
    getHotelsCities,
    getHotelsByCity,
    deleteHotel
}