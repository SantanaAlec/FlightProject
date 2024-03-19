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

    constructor(flightRepository: Repository<Flight>) {
        this.flightRepository = flightRepository;
    }

    async register(
        flightRegisterDTO: FlightRegisterDTO
    ): Promise<FlightRegisterSuccessDTO> {
        const flight = new Flight();

        let assignedPlane: Plane;
        try {
            assignedPlane = await this.planeRepository.findOneBy({
                id: flightRegisterDTO.planeId,
            });
        } catch (error) {
            throw new Error("Error: " + error);
        }

        flight.plane = assignedPlane;
        flight.origin = flightRegisterDTO.origin;
        flight.destination = flightRegisterDTO.destination;
        flight.departureDate = flightRegisterDTO.departureDate;
        flight.arrivalDate = flightRegisterDTO.arrivalDate;
        flight.luggageCapacity = flightRegisterDTO.luggageCapacity;
        flight.cost = flightRegisterDTO.cost;

        try {
            await this.flightRepository.save(flight);
        } catch (error) {
            throw new Error("Error: " + error);
        }

        const response: FlightRegisterSuccessDTO = {
            planeId: flight.plane.id,
            origin: flight.origin,
            destination: flight.destination,
            departureDate: flight.departureDate,
            arrivalDate: flight.arrivalDate,
            luggageCapacity: flight.luggageCapacity,
            cost: flight.cost,
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

        let reassignedPlane: Plane;
        if (flightUpdateDTO.planeId) {
            try {
                reassignedPlane = await this.planeRepository.findOneBy({
                    id: flightUpdateDTO.planeId,
                });
            } catch (error) {
                throw new Error("Error: " + error);
            }

            flight.plane = reassignedPlane;
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
        if (flightUpdateDTO.cost) {
            flight.cost = flightUpdateDTO.cost;
        }

        try {
            await this.flightRepository.save(flight);
        } catch (error) {
            throw new Error("Error: " + error);
        }

        const response: FlightUpdateSuccessDTO = {
            planeId: flight.plane.id,
            origin: flight.origin,
            destination: flight.destination,
            departureDate: flight.departureDate,
            arrivalDate: flight.arrivalDate,
            luggageCapacity: flight.luggageCapacity,
            cost: flight.cost,
        };

        return response;
    }

    async delete(id: number): Promise<DeleteResult> {
        try {
            return await this.flightRepository.delete(id);
        } catch (error) {
            throw new Error("Error: " + error);
        }
    }
}
