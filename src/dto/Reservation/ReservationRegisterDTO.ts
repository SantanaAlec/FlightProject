import {State} from "../../entities/Reservation";
import { PaymentRegisterDTO } from "../payment/PaymentRegisterDTO";

export class ReservationRegisterDTO{
    //! Required
    userId!: number;
    flightId!: number;
    paymentData!: PaymentRegisterDTO;
    seatIds!: number[];
    reservationDate!: Date;
    state!: State;
}