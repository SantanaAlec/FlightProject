import { DeleteResult, Repository } from "typeorm";
import { Flight } from "../entities/Flight";
import { FlightRegisterDTO } from "../dto/flight/FlightRegisterDTO";
import { FlightRegisterSuccessDTO } from "../dto/flight/FlightRegisterSuccessDTO";
import { FlightUpdateDTO } from "../dto/flight/FlightUpdateDTO";
import { FlightUpdateSuccessDTO } from "../dto/flight/FlightUpdateSuccessDTO";
import { Plane } from "../entities/Plane";

export class FlightService {
    private flightRepository: Repository<Flight>;
    private planeRepository: Repository<Plane>;

    constructor(
        flightRepository: Repository<Flight>,
        planeRepository: Repository<Plane>
    ) {
        this.flightRepository = flightRepository;
        this.planeRepository = planeRepository;
    }

    async register(
        flightRegisterDTO: FlightRegisterDTO
    ): Promise<FlightRegisterSuccessDTO> {
        const flight = new Flight();

        const plane = await this.planeRepository.findOneBy({
            id: flightRegisterDTO.planeId,
        });

        if (!plane) {
            throw new Error("Plane not found");
        }

        flight.plane = plane;
        flight.origin = flightRegisterDTO.origin;
        flight.destination = flightRegisterDTO.destination;
        flight.departureDate = flightRegisterDTO.departureDate;
        flight.arrivalDate = flightRegisterDTO.arrivalDate;
        flight.luggageCapacity = flightRegisterDTO.luggageCapacity;

        await this.flightRepository.save(flight);

        const response: FlightRegisterSuccessDTO = {
            planeId: flight.plane.id,
            origin: flight.origin,
            destination: flight.destination,
            departureDate: flight.departureDate,
            arrivalDate: flight.arrivalDate,
            luggageCapacity: flight.luggageCapacity,
        };

        return response;
    }

    async getAll(): Promise<Flight[]> {
        return await this.flightRepository.find();
    }

    async getById(id: number): Promise<Flight | undefined> {
        return await this.flightRepository.findOne({
            where: { id: id },
        });
    }

    async update(
        id: number,
        flightUpdateDTO: FlightUpdateDTO
    ): Promise<FlightUpdateSuccessDTO> {
        const flight = await this.getById(id);

        if (!flight) {
            throw new Error("Flight not found");
        }

        if (flightUpdateDTO.planeId) {
            const plane = await this.planeRepository.findOneBy({
                id: flightUpdateDTO.planeId,
            });

            if (!plane) {
                throw new Error("Plane not found");
            }

            flight.plane = plane;
        }

        if (flightUpdateDTO.origin) {
            flight.origin = flightUpdateDTO.origin;
        }
        if (flightUpdateDTO.destination) {
            flight.destination = flightUpdateDTO.destination;
        }
        if (flightUpdateDTO.departureDate) {
            flight.departureDate = flightUpdateDTO.departureDate;
        }
        if (flightUpdateDTO.arrivalDate) {
            flight.arrivalDate = flightUpdateDTO.arrivalDate;
        }
        if (flightUpdateDTO.luggageCapacity) {
            flight.luggageCapacity = flightUpdateDTO.luggageCapacity;
        }

        await this.flightRepository.save(flight);

        const response: FlightUpdateSuccessDTO = {
            planeId: flight.plane.id,
            origin: flight.origin,
            destination: flight.destination,
            departureDate: flight.departureDate,
            arrivalDate: flight.arrivalDate,
            luggageCapacity: flight.luggageCapacity,
        };

        return response;
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.flightRepository.delete(id);
    }
}
