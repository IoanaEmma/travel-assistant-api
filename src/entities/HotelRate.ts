import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Hotel } from './Hotel';

@Entity()
export class HotelRate {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Hotel, hotel => hotel.rates, { onDelete: 'CASCADE' })
    hotel: Hotel;

    @Column({ nullable: true })
    name: string;

    @Column({ type: 'numeric', nullable: true })
    ratePerNight: number;

    @Column({ type: 'numeric', nullable: true })
    tax: number;

    @Column({ nullable: true })
    currency: string;
}