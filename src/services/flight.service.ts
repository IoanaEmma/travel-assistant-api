import axios from "axios";
import config from "../config"
import { FlightItinerary } from "../types/flights";
import parser from "../utils/parser";
import { sortItinerariesByStops } from "../utils/helper";
import { AIRPORT_KEYS } from "../utils/constants";

export async function searchFlights({
    origin,
    destination,
    departureDate,
    returnDate,
    passengers = 1,
    cabinClass = "Economy"
}: {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    passengers: number;
    cabinClass: string;
}): Promise<FlightItinerary[]> {

    const finalCabinClass = cabinClass || "Economy";
    const finalPassengers = passengers || 1;
    
    console.log(`Searching flights from ${origin} to ${destination} on ${departureDate} 
        with ${finalPassengers} passengers in ${finalCabinClass} class.`);

    try {
        const departureAirport = AIRPORT_KEYS[origin.toUpperCase()] || origin;
        const arrivalAirport = AIRPORT_KEYS[destination.toUpperCase()] || destination;
        const url = `${config.FLIGHT_API}/roundtrip/${config.FLIGHT_API_KEY}/${departureAirport}/${arrivalAirport}/${departureDate}/${returnDate}/${finalPassengers}/0/0/${finalCabinClass}/EUR`;
        console.log(`Fetching flights from URL: ${url}`);
        const response = await axios.get(url);
        const parsedFlights = parser.parseFlightData({
            origin,
            destination,
            ...response.data
        });

        const sortedFlights = sortItinerariesByStops(parsedFlights);

        return sortedFlights;
    } catch (error) {
        console.error(`Error fetching flights: ${error}`);
        throw error;
    }

}