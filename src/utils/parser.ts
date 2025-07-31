import { Attraction } from "../types/attractions";
import { FlightItinerary, FlightsApiResponse } from "../types/flights";
import { Hotel } from "../types/hotels";

function parseFlightData(flightData: FlightsApiResponse): FlightItinerary[] {
    const { origin, destination, itineraries, legs, segments, carriers, places } = flightData;

    const carrierMap = new Map(carriers.map(c => [c.id, c.name]));
    const placeMap = new Map(places.map(p => [p.id, p.display_code]));
    const segmentMap = new Map(segments.map(s => [s.id, s]));
    const legMap = new Map(legs.map(l => [l.id, l]));

    return itineraries.map(itinerary => {
        const pricing = itinerary.pricing_options[0];
        const bookingUrl = pricing.items[0].url;
        const totalPrice = `${pricing.price.amount.toFixed(2)} EUR`;

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
                    duration: segment.duration
                };
            });

            return {
                segments: segmentsFormatted,
                totalStops: stops.length
            };
        };

        return {
            origin,
            destination,
            totalPrice,
            bookingUrl,
            departureFlight: formatLeg(departureLegId),
            returnFlight: formatLeg(returnLegId)
        };
    });
}

function praseHotelData(hotelsList: any, checkInDate: string, checkOutDate: string, city: string): Hotel[] {
    return hotelsList.map((hotel: any) => ({
        name: hotel.name,
        key: hotel.key,
        accommodationType: hotel.accommodation_type,
        rating: hotel.review_summary?.rating || 0,
        reviews: hotel.review_summary?.count || 0,
        image: hotel.image,
        price: {
            min: hotel.price_ranges?.minimum || 0,
            max: hotel.price_ranges?.maximum || 0,
        },
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        city: city
    }));

}

function parseAttractionData(attractionsList: any): Attraction[] {
    return attractionsList.map((attraction: any) => ({
        name: attraction.properties.name,
        address: attraction.properties.address_line2 || "No address provided",
        website: attraction.properties.website || "No website provided",
        openingHours: attraction.properties.opening_hours || "No opening hours provided"
    }));
}

export default {
    parseFlightData,
    praseHotelData,
    parseAttractionData
}