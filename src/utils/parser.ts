import { FlightItinerary, FlightsApiResponse } from "../types/flights";

function parseFlightData(flightData: FlightsApiResponse): FlightItinerary[] {
    const { itineraries, legs, segments, carriers, places } = flightData;
    
    const carrierMap = new Map(carriers.map(c => [c.id, c.name]));
    const placeMap = new Map(places.map(p => [p.id, p.display_code]));
    const segmentMap = new Map(segments.map(s => [s.id, s]));
    const legMap = new Map(legs.map(l => [l.id, l]));

    return itineraries.map(itinerary => {
        const pricing = itinerary.pricing_options[0];
        const bookingUrl = pricing.items[0].url;
        const totalPrice = `${pricing.price.amount.toFixed(2)} RON`;

        const [departureLegId, returnLegId] = itinerary.leg_ids;

        const formatLeg = (legId: string) => {
            const leg = legMap.get(legId);
            const stops = leg.stop_ids?.map((stopId: number) => placeMap.get(stopId) || "Unknown") || [];

            const segmentsFormatted = leg.segment_ids.map((segmentId: string) => {
                const segment = segmentMap.get(segmentId);
                return {
                    airline: carrierMap.get(segment.marketing_carrier_id) || "Unknown Airline",
                    flightNumber: segment.marketing_flight_number,
                    departureAirport: placeMap.get(segment.origin_place_id) || "Unknown",
                    departureTime: segment.departure,
                    arrivalAirport: placeMap.get(segment.destination_place_id) || "Unknown",
                    arrivalTime: segment.arrival,
                    durationMinutes: segment.duration
                };
            });

            return {
                segments: segmentsFormatted,
                totalStops: stops.length
            };
        };

        return {
            totalPrice,
            bookingUrl,
            departureFlight: formatLeg(departureLegId),
            returnFlight: formatLeg(returnLegId)
        };
    });
}

export default {
    parseFlightData
}