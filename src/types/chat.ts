import { FlightsApi } from "./flights";
import { HotelsApi } from "./hotels";
import { AttractionsApi } from "./attractions";

type AppTab = "home" | "flights" | "trips" | "hotels" | "attractions" | "weather";

export type ChatResponse = {
    response: FlightsApi | HotelsApi | AttractionsApi | string;
    tab: AppTab;
}

