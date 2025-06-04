import { Hotel, Rate } from "./hotels";

type HotelWithoutPrice = Omit<Hotel, "price"> & { rates: Rate[] };

export type TripDetails = Trip & {
    hotels: HotelWithoutPrice[];
}

export type Trip = {
    id: number;
    userId: number;
    name: string;
}