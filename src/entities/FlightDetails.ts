import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FlightSegment } from './FlightSegment';

@Entity()
export class FlightDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    totalStops: number;

    @OneToMany(() => FlightSegment, segment => segment.flightDetails, { cascade: true })
    segments: FlightSegment[];
}