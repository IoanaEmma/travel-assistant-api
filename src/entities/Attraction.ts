import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Attraction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    website: string;

    @Column({ nullable: true })
    openingHours: string;
}