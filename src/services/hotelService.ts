import axios from "axios";
import config from "../config";
import { LOCATION_KEYS } from "../utils/constants";
import parser from "../utils/parser";
import { HotelDetails, Hotel } from "../types/hotels";

export async function searchHotels(city: string, checkInDate: string, checkOutDate: string): Promise<Hotel[]> {
    const city_key = LOCATION_KEYS[city.toUpperCase()];
    const url = `${config.HOTELS_API}/list?location_key=${city_key}&limit=10`;

    console.log(`Searching hotels in ${city} from ${checkInDate} to ${checkOutDate}.`);

    try {
        const response = await axios.get(url);
        const hotelsList = response.data.result.list;
        if (!hotelsList || hotelsList.length === 0) {
            throw new Error(`No hotels found for city: ${city}`);
        }

        const hotels = parser.praseHotelData(hotelsList, checkInDate, checkOutDate, city);
        return hotels;
    } catch (error) {
        console.error(`Error fetching hotels: ${error}`);
        throw error;
    }
}

export async function getHotel(key: string, checkInDate: string, checkOutDate: string): Promise<HotelDetails> {
    const url = `${config.HOTELS_API}/rates?hotel_key=${key}&chk_in=${checkInDate}&chk_out=${checkOutDate}`;

    try {
        const response = await axios.get(url);
        
        const hotelDetails = response.data.result;

        const rates = hotelDetails.rates.map((rate: any) => ({
            name: rate.name,
            ratePerNight: rate.rate,
            tax: rate.tax
        })).sort((a, b) => a.ratePerNight - b.ratePerNight);

        return {
            rates: rates,
            currency: hotelDetails.currency
        }
    } catch (error) {
        console.error(`Error fetching hotel details`);
        throw error;
    }
}
