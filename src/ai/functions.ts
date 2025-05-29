import { LLM_FUNCTIONS } from "../utils/constants"

export const functions = [
    {
        name: LLM_FUNCTIONS.SEARCH_FLIGHTS,
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
    },
    {
        name: LLM_FUNCTIONS.SEARCH_HOTELS,
        description: "Search for hotels in a specific city on specific dates",
        parameters: {
            type: "object",
            properties: {
                city: { type: "string" },
                checkInDate: { type: "string" },
                checkOutDate: { type: "string" },
            },
            required: ["city", "checkInDate", "checkOutDate"]
        }
    }
]