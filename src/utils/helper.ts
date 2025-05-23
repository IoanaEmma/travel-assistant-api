import { FlightItinerary } from "../types/flights";

export function sortItinerariesByStops(itineraries: FlightItinerary[]): FlightItinerary[] {
    return itineraries.sort((a, b) => {
        const depDiff = a.departureFlight.totalStops - b.departureFlight.totalStops;
        if (depDiff !== 0) return depDiff;
        // If departure totalStops are equal, sort by returnFlight totalStops
        return a.returnFlight.totalStops - b.returnFlight.totalStops;
    });
}