import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Flight } from './Flight';
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