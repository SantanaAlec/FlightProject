import { DeleteResult, Repository } from "typeorm";
import { Seat } from "../entities/Seat";
import { SeatRegisterDTO } from "../dto/seat/SeatRegisterDTO";
import { SeatRegisterSuccessDTO } from "../dto/seat/SeatRegisterSuccessDTO";
import { SeatUpdateDTO } from "../dto/seat/SeatUpdateDTO";
import { SeatUpdateSuccessDTO } from "../dto/seat/SeatUpdateSuccessDTO";
import { Plane } from "../entities/Plane";

export class SeatService {
    private seatRepository: Repository<Seat>;
    private planeRepository: Repository<Plane>;

    constructor(seatRepository: Repository<Seat>) {
        this.seatRepository = seatRepository;
    }

    async register(
        seatRegisterDTO: SeatRegisterDTO
    ): Promise<SeatRegisterSuccessDTO> {
        const seat = new Seat();

        let assignedPlane: Plane;
        try {
            assignedPlane = await this.planeRepository.findOneBy({
                id: seatRegisterDTO.planeId,
            });
        } catch (error) {
            throw new Error("Error: " + error);
        }

        seat.plane = assignedPlane;
        seat.number = seatRegisterDTO.number;
        seat.class = seatRegisterDTO.class;
        seat.price = seatRegisterDTO.price;

        try {
            await this.seatRepository.save(seat);
        } catch (error) {
            throw new Error("Error: " + error);
        }

        const response: SeatRegisterSuccessDTO = {
            planeId: seat.plane.id,
            number: seat.number,
            class: seat.class,
            price: seat.price,
        };

        return response;
    }

    async getAll(): Promise<Seat[]> {
        return await this.seatRepository.find();
    }

    async getById(id: number): Promise<Seat | undefined> {
        return await this.seatRepository.findOne({
            where: { id: id },
        });
    }

    async update(
        id: number,
        seatUpdateDTO: SeatUpdateDTO
    ): Promise<SeatUpdateSuccessDTO> {
        const seat = await await this.getById(id);

        if (!seat) {
            throw new Error("Seat not found");
        }

        let reassignedPlane: Plane;
        if (seatUpdateDTO.planeId) {
            try {
                reassignedPlane = await this.planeRepository.findOneBy({
                    id: seatUpdateDTO.planeId,
                });
            } catch (error) {
                throw new Error("Error: " + error);
            }

            seat.plane = reassignedPlane;
        }

        if (seatUpdateDTO.number) {
            seat.number = seatUpdateDTO.number;
        }
        if (seatUpdateDTO.class) {
            seat.class = seatUpdateDTO.class;
        }
        if (seatUpdateDTO.price) {
            seat.price = seatUpdateDTO.price;
        }

        try {
            await this.seatRepository.save(seat);
        } catch (error) {
            throw new Error("Error: " + error);
        }

        const response: SeatUpdateSuccessDTO = {
            planeId: seat.plane.id,
            number: seat.number,
            class: seat.class,
            price: seat.price,
        };

        return response;
    }

    async delete(id: number): Promise<DeleteResult> {
        try {
            return await this.seatRepository.delete(id);
        } catch (error) {
            throw new Error("Error: " + error);
        }
    }
}
