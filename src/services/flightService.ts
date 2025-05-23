import axios from "axios";
import config from "../config"
import { FlightsApiResponse } from "../types/flights";

export async function searchFlights({
    origin,
    destination,
    departureDate,
    returnDate,
    passengers,
    cabinClass
}: {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    passengers: number;
    cabinClass: string;
}): Promise<FlightsApiResponse> {
    console.log(`Searching flights from ${origin} to ${destination} on ${departureDate} with ${passengers} passengers in ${cabinClass} class.`);
    const url = `${config.FLIGHT_API}/roundtrip/${config.FLIGHT_API_KEY}/${origin}/${destination}/${departureDate}/${returnDate}/${passengers}/0/0/${cabinClass}`;

    const response = await axios.get(url);
    return response.data;
}