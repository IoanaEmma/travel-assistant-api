import { NextFunction, Request, Response } from 'express';
import { getHotel } from '../services/hotelService';

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

export default {
    getHotelDetails
}