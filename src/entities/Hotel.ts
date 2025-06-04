import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { HotelRate } from './HotelRate';

@Entity()
export class Hotel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    key: string;

    @Column({ nullable: true })
    accommodationType: string;

    @Column({ type: 'numeric', nullable: true })
    rating: number;

    @Column({ nullable: true })
    reviews: number;

    @Column({ nullable: true })
    image: string;

    @Column({ type: 'date', nullable: true })
    checkInDate: string;

    @Column({ type: 'date', nullable: true })
    checkOutDate: string;

    @Column({ nullable: true })
    city: string;

    @OneToMany(() => HotelRate, rate => rate.hotel, { cascade: true })
    rates: HotelRate[];
}