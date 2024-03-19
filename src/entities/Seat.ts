import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany} from "typeorm";
import { Plane } from "./Plane";
import { Reservation } from "./Reservation";


export enum SeatClass {
    BUSINESS = "BUSINESS",
    ECONOMY = "ECONOMY",
    FIRST = "FIRST CLASS"
}


@Entity()
export class Seat {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Plane, (plane) => plane.seats)
    plane: Plane;

    @ManyToMany(() => Reservation, (reservation) => reservation.seats)
    reservations: Reservation[];

    @Column()
    number: string;

    @Column({
        type: "enum",
        enum: SeatClass,
        default: SeatClass.BUSINESS,
    })
    class: SeatClass;

    @Column()
    price: number;
}