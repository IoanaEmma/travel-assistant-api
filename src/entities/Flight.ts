import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { FlightDetails } from './FlightDetails';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  totalPrice: string;

  @Column({ nullable: true })
  bookingUrl: string;

  @OneToOne(() => FlightDetails, { cascade: true, nullable: true })
  @JoinColumn()
  departureFlight: FlightDetails;

  @OneToOne(() => FlightDetails, { cascade: true, nullable: true })
  @JoinColumn()
  returnFlight: FlightDetails;
}