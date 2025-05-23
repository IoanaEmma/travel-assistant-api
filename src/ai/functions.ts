export const functions = [
    {
        name: "search_flights",
        description: "Search for flights between two cities on specific dates",
        parameters: {
            type: "object",
            properties: {
                origin: { type: "string" },
                destination: { type: "string" },
                departureDate: { type: "string" },
                returnDate: { type: "string" },
                passengers: { type: "integer" },
                cabinClass: { type: "string" }
            },
            required: ["origin", "destination", "departureDate"]
        }
    }
]