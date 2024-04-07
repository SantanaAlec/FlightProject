import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User"
import { Plane } from "./entities/Plane"
import { Flight } from "./entities/Flight"
import { Reservation } from "./entities/Reservation"
import { Seat } from "./entities/Seat"
import { Payment } from "./entities/Payment"

import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Plane, Seat, Flight, Reservation, Payment],
    migrations: [],
    subscribers: [],
})
