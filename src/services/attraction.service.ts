import axios from "axios";
import config from "../config"
import parser from "../utils/parser";
import { Attraction } from "../types/attractions";

export async function searchAttractions(city: string): Promise<Attraction[]> {
    const geoCodeUrl = `${config.ATTRACTIONS_API}/v1/geocode/search?text=${city}&apiKey=${config.ATTRACTIONS_API_KEY}`;

    try {
        const response = await axios.get(geoCodeUrl);
        const cityId = response.data.features[0].properties.place_id;

        const placesUrl = `${config.ATTRACTIONS_API}/v2/places`;
        const params = {
            categories: 'tourism',
            filter: `place:${cityId}`,
            conditions: 'access, wheelchair',
            limit: 10,
            apiKey: config.ATTRACTIONS_API_KEY,
        };

        const placesResponse = await axios.get(placesUrl, { params });
        const attractionsList = parser.parseAttractionData(placesResponse.data.features);
        return attractionsList;
    } catch (error) {
        console.log(error);
    }

}