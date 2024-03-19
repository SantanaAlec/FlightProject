import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn,JoinTable, ManyToMany, ManyToOne} from "typeorm";
import { User } from "./User";
import { Flight } from "./Flight";
import { Seat } from "./Seat";
import { Payment } from "./Payment";

export enum State {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED"
}


@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.reservations)
    user: User;

    @ManyToOne(() => Flight, (flight) => flight.reservations)
    flight: Flight;

    @OneToOne(() => Payment, (payment) => payment.reservation)
    @JoinColumn({ name: "payment_id"})
    payment: Payment;

    @ManyToMany(() => Seat, (seat) => seat.reservations)
    @JoinTable({ name: "reservation_seat" })
    seats: Seat[];

    reservationDate: Date;

    @Column({
        type: "enum",
        enum: State,
        default: State.PENDING,
    })
    state: State;
}