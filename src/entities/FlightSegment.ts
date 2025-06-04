import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FlightDetails } from './FlightDetails';

@Entity()
export class FlightSegment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => FlightDetails, details => details.segments, { onDelete: 'CASCADE' })
    flightDetails: FlightDetails;

    @Column()
    airline: string;

    @Column()
    flightNumber: string;

    @Column()
    departureAirport: string;

    @Column()
    departureTime: string;

    @Column()
    arrivalAirport: string;

    @Column()
    arrivalTime: string;

    @Column()
    duration: string;
}