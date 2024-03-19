import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Seat } from "./Seat";
import { Flight } from "./Flight";

@Entity()
export class Plane {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    model: string;

    @OneToMany(() => Seat, (seat) => seat.plane)
    seats: Seat[];

    @OneToMany(() => Flight, (flight) => flight.plane)
    flights: Flight[];
}