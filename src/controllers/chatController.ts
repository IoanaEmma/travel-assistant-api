import { NextFunction, Request, Response } from 'express';
import { searchFlights } from '../services/flightService';
import parser from "../utils/parser";
import { sortItinerariesByStops } from '../utils/helper';
import { callModel } from '../ai/model';
import { ChatResponse } from '../types/chat';

async function chat(req: Request, res: Response, next: NextFunction) {
    try {
        const { userMessage } = req.body;
        const response = await callModel(userMessage);
        let apiResponse: ChatResponse = {} as ChatResponse;

        const toolCall = response.choices[0].message.tool_calls?.[0];
        if (toolCall?.function?.name === "search_flights") {
            const args = JSON.parse(toolCall.function.arguments);
            const flights = await searchFlights(args);
            const parsedFlights = parser.parseFlightData(flights);
            const sortedFlights = sortItinerariesByStops(parsedFlights);
            apiResponse = {
                response: {
                    flights: sortedFlights,
                },
                tab: "flights",
            };
        } else {
            apiResponse = {
                response: response.choices[0].message.content,
                tab: "home",
            }
        }

        return res.json(apiResponse);

    } catch (error) {
        next(error);
        res.json({ error });
    }
}

export default {
    chat
}