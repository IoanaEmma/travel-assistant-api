import { FlightsApi } from "./flights";

type AppTab = "home" | "flights" | "trips" | "hotels" | "attractions" | "weather";

export type ChatResponse = {
    response: FlightsApi|string;
    tab: AppTab;
}

