import { NextFunction, Request, Response } from 'express';
import { searchFlights } from '../services/flight.service';
import { searchHotels } from '../services/hotel.service';
import { searchAttractions } from '../services/attraction.service';
import { callModel } from '../ai/model';
import { ChatResponse } from '../types/chat';
import { LLM_FUNCTIONS, SYSTEM_PROMPT } from '../utils/constants';


async function chat(req: Request, res: Response, next: NextFunction) {
    try {
        const { userMessage, conversationHistory = [] } = req.body;

        const messages = [
            { role: "system", content: SYSTEM_PROMPT },
            ...conversationHistory,
            { role: "user", content: userMessage }
        ];

        const response = await callModel(messages);
        let apiResponse: ChatResponse = {} as ChatResponse;

        const toolCall = response.choices[0].message.tool_calls?.[0];

        if (toolCall?.function?.name === LLM_FUNCTIONS.SEARCH_FLIGHTS) {
            const args = JSON.parse(toolCall.function.arguments);
            const flights = await searchFlights(args);

            apiResponse = {
                response: {
                    flights: flights,
                },
                tab: "flights",
            };
        }
        else if (toolCall?.function?.name === LLM_FUNCTIONS.SEARCH_HOTELS) {
            const args = JSON.parse(toolCall.function.arguments);
            const hotels = await searchHotels(args.city, args.checkInDate, args.checkOutDate);

            apiResponse = {
                response: {
                    hotels: hotels,
                },
                tab: "hotels",
            };
        }
        else if (toolCall?.function?.name === LLM_FUNCTIONS.SEARCH_ATTRACTIONS) {
            const args = JSON.parse(toolCall.function.arguments);
            const attractions = await searchAttractions(args.city);

            apiResponse = {
                response: {
                    attractions: attractions,
                },
                tab: "attractions",
            };
        }
        else {
            apiResponse = {
                response: response.choices[0].message.content,
                tab: "home",
            }
        }

        const updatedHistory = [
            ...conversationHistory,
            { role: "user", content: userMessage },
            { role: "assistant", content: typeof apiResponse.response === 'string' ? apiResponse.response : `I found ${Object.keys(apiResponse.response)[0]} for you.` }
        ];

        return res.json({
            ...apiResponse,
            conversationHistory: updatedHistory
        });

    } catch (error) {
        next(error);
        res.status(500).json('Internal server error');
    }
}

export default {
    chat
}