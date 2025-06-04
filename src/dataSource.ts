// src/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from './config';
import { Attraction } from './entities/Attraction';
import { Flight } from './entities/Flight';
import { FlightDetails } from './entities/FlightDetails';
import { FlightSegment } from './entities/FlightSegment';
import { Hotel } from './entities/Hotel';
import { HotelRate } from './entities/HotelRate';
import { Trip } from './entities/Trip';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    synchronize: true, // Automatically creates tables
    logging: false,
    entities: [Attraction, Flight, FlightDetails,
        FlightSegment, Hotel, HotelRate, Trip],
    migrations: [],
    subscribers: [],
});
