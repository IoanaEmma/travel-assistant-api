export type FlightsApiResponse = {
    origin: string;
    destination: string;
    itineraries: any[];
    legs: any[];
    segments: any[];
    carriers: any[];
    places: any[];
}

type SegmentInfo = {
    airline: string;
    flightNumber: string;
    departureAirport: string;
    departureTime: string;
    arrivalAirport: string;
    arrivalTime: string;
    duration: number;
};

export type FlightItinerary = {
    totalPrice: string;
    bookingUrl: string;
    departureFlight: {
        segments: SegmentInfo[];
        totalStops: number;
    };
    returnFlight: {
        segments: SegmentInfo[];
        totalStops: number;
    };
}

export type FlightsApi = {
    flights: FlightItinerary[];
}

export type Flight = FlightItinerary & {
    origin: string;
    destination: string;
}