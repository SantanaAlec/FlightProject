import { DeleteResult, Repository } from "typeorm";
import { Reservation } from "../entities/Reservation";
import { ReservationRegisterDTO } from "../dto/reservation/ReservationRegisterDTO";
import { ReservationRegisterSuccessDTO } from "../dto/reservation/ReservationRegisterSuccessDTO";
import { ReservationUpdateDTO } from "../dto/reservation/ReservationUpdateDTO";
import { ReservationUpdateSuccessDTO } from "../dto/reservation/ReservationUpdateSuccessDTO";
import { User } from "../entities/User";
import { Flight } from "../entities/Flight";
import { Seat, SeatClass } from "../entities/Seat";
import { Payment } from "../entities/Payment";

export class ReservationService {
    private reservationRepository: Repository<Reservation>;
    private userRepository: Repository<User>;
    private flightRepository: Repository<Flight>;
    private seatRepository: Repository<Seat>;
    private paymentRepository: Repository<Payment>;

    constructor(
        reservationRepository: Repository<Reservation>,
        userRepository: Repository<User>,
        flightRepository: Repository<Flight>,
        seatRepository: Repository<Seat>,
        paymentRepository: Repository<Payment>
    ) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.flightRepository = flightRepository;
        this.seatRepository = seatRepository;
        this.paymentRepository = paymentRepository;
    }

    async register(
        reservationRegisterDTO: ReservationRegisterDTO
    ): Promise<ReservationRegisterSuccessDTO> {
        const reservation = new Reservation();

        const user = await this.userRepository.findOneBy({
            id: reservationRegisterDTO.userId,
        });
        if (!user) {
            throw new Error("User not found");
        }
        reservation.user = user;

        const flight = await this.flightRepository.findOneBy({
            id: reservationRegisterDTO.flightId,
        });
        if (!flight) {
            throw new Error("Flight not found");
        }
        reservation.flight = flight;

        for (const seatId of reservationRegisterDTO.seatIds) {
            const seat = await this.seatRepository.findOneBy({
                id: seatId,
            });
            if (!seat) {
                throw new Error("Seat not found");
            }
            reservation.seats.push(seat);
        }

        //From Array Take the price of the seats and sum them by their Class
        //GET TOTAL OF FIRST CLASS MULTIPLY BY PRICE
        //GET TOTAL OF BUSINESS CLASS MULTIPLY BY PRICE
        //GET TOTAL OF ECONOMY CLASS MULTIPLY BY PRICE
        let firstClassTotal = 0;
        let businessClassTotal = 0;
        let economyClassTotal = 0;
        for (const seat of reservation.seats) {
            switch (seat.class) {
                case SeatClass.FIRST:
                    firstClassTotal += seat.price;
                    break;
                case SeatClass.BUSINESS:
                    businessClassTotal += seat.price;
                    break;
                case SeatClass.ECONOMY:
                    economyClassTotal += seat.price;
                    break;
            }
        }
        //SUM ALL OF THEM
        const total = firstClassTotal + businessClassTotal + economyClassTotal;

        //Create payment
        const payment = new Payment();
        //Let paysystem handle the payment
        payment.amount = reservationRegisterDTO.paymentData.amount;
        payment.paymentDate = reservationRegisterDTO.paymentData.paymentDate;
        payment.paymentMethod =
            reservationRegisterDTO.paymentData.paymentMethod;

        reservation.payment = payment;

        reservation.reservationDate = reservationRegisterDTO.reservationDate;
        reservation.state = reservationRegisterDTO.state;

        await this.reservationRepository.save(reservation);

        const response: ReservationRegisterSuccessDTO = {
            userId: reservation.user.id,
            flightId: reservation.flight.id,
            paymentData: reservation.payment,
            seatIds: reservation.seats.map((seat) => seat.id),
            reservationDate: reservation.reservationDate,
            state: reservation.state,
        };

        return response;
    }

    async getAll(): Promise<Reservation[]> {
        return await this.reservationRepository.find();
    }

    async getById(id: number): Promise<Reservation> {
        return await this.reservationRepository.findOneBy({ id });
    }

    async update(
        id: number,
        reservationUpdateDTO: ReservationUpdateDTO
    ): Promise<ReservationUpdateSuccessDTO> {
        const reservation = await this.reservationRepository.findOneBy({ id });

        if (reservationUpdateDTO.state) {
            reservation.state = reservationUpdateDTO.state;
        }

        if (reservationUpdateDTO.userId) {
            const user = await this.userRepository.findOneBy({
                id: reservationUpdateDTO.userId,
            });
            if (!user) {
                throw new Error("User not found");
            }

            reservation.user = user;
        }

        if (reservationUpdateDTO.flightId) {
            const flight = await this.flightRepository.findOneBy({
                id: reservationUpdateDTO.flightId,
            });
            if (!flight) {
                throw new Error("Flight not found");
            }

            reservation.flight = flight;
        }

        if (reservationUpdateDTO.seatIds) {
            for (const seatId of reservationUpdateDTO.seatIds) {
                const seat = await this.seatRepository.findOneBy({
                    id: seatId,
                });

                if (!seat) {
                    throw new Error("Seat not found");
                }

                reservation.seats.push(seat);
                //Asigno los nuevos asientos pero no hace nada con los viejos
                //Se podria limpiar la lista y cada asiento reasignarlo
            }
        }

        //Only update payment and reservation date pending
    }
}
