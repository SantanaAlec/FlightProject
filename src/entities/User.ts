import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Reservation } from "./Reservation"

export enum UserRole {
    ADMIN = "ADMINISTRATOR",
    CLIENT = "CLIENT"
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.CLIENT,
    })
    role: UserRole;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @OneToMany(() => Reservation, (reservation) => reservation.user)
    reservations: Reservation[];
}