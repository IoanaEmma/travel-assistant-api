import { FlightsApi } from "./flights";
import { HotelsApi } from "./hotels";

type AppTab = "home" | "flights" | "trips" | "hotels" | "attractions" | "weather";

export type ChatResponse = {
    response: FlightsApi|HotelsApi|string;
    tab: AppTab;
}

