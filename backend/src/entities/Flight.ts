import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Plane } from "./Plane";
import { Reservation } from "./Reservation";

@Entity()
export class Flight {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Plane, (plane) => plane.flights)
    plane: Plane;

    @OneToMany(() => Reservation, (reservation) => reservation.flight)
    reservations: Reservation[];

    @Column()
    origin: string;

    @Column()
    destination: string;

    @Column()
    departureDate: Date;

    @Column()
    arrivalDate: Date;

    @Column()
    luggageCapacity: number;
}