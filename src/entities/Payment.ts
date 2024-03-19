import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Reservation } from "./Reservation";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Reservation, (reservation) => reservation.payment)
    reservation: Reservation;

    @Column()
    ammount: number;

    @Column()
    paymentDate: Date;

    @Column()
    paymentMethod: string;
}
