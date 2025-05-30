export type Attraction = {
    name: string;
    address: string;
    website: string;
    openingHours: string;
}

export type AttractionsApi = {
    attractions: Attraction[];
}