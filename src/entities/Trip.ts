import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Hotel } from './Hotel';
import { Flight } from './Flight';
import { Attraction } from './Attraction';

@Entity()
export class Trip {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int", { nullable: false })
    userId: number;

    @Column()
    name: string;

    @Column()
    when: string;
    
    @Column({ type: "varchar", default: "active" })
    status: "active" | "completed" | "canceled";

    @ManyToOne(() => Hotel, { nullable: true, onDelete: 'SET NULL' })
    hotel: Hotel;

    @ManyToOne(() => Flight, { nullable: true, onDelete: 'SET NULL' })
    flight: Flight;

    @ManyToMany(() => Attraction, { nullable: true, cascade: true })
    @JoinTable({
        name: 'trip_attractions',
        joinColumn: { name: 'trip_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'attraction_id', referencedColumnName: 'id' }
    })
    attractions: Attraction[];
}