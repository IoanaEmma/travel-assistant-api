export type Hotel = {
    name: string;
    key: string;
    accommodationType: string;
    rating: number;
    reviews: number;
    image: string;
    price: {
        min: number;
        max: number;
    },
    checkInDate?: string;
    checkOutDate?: string;
    city?: string;
}

type Rate = {
    name: string;
    ratePerNight: number;
    tax: number;
}

export type HotelDetails =  {
    rates: Rate[];
    currency: string;
}

export type HotelsApi = {
    hotels: Hotel[];
}