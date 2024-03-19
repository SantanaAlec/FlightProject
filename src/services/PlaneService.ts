import { DeleteResult, Repository } from "typeorm";
import { Plane } from "../entities/Plane";
import { PlaneRegisterDTO } from "../dto/plane/PlaneRegisterDTO";
import { PlaneRegisterSuccessDTO } from "../dto/plane/PlaneRegisterSuccessDTO";
import { PlaneUpdateDTO } from "../dto/plane/PlaneUpdateDTO";
import { PlaneUpdateSuccessDTO } from "../dto/plane/PlaneUpdateSuccessDTO";

export class PlaneService{
    private planeRepository: Repository<Plane>;
    constructor(planeRepository: Repository<Plane>) {
        this.planeRepository = planeRepository;
    }

    async register(
        planeRegisterDTO: PlaneRegisterDTO
    ): Promise<PlaneRegisterSuccessDTO> {
        const plane = new Plane();
        plane.model = planeRegisterDTO.model;

        let savedPlane: Plane;

        try {
            savedPlane = await this.planeRepository.save(plane);
        } catch (error) {
            throw new Error("Error: " + error);
        }

        const response: PlaneRegisterSuccessDTO = {
            model: savedPlane.model,
        };

        return response;
    }
    
    async getAll(): Promise<Plane[]> {
        return await this.planeRepository.find();
    }

    async getById(id: number): Promise<Plane | undefined> {
        return await this.planeRepository.findOne({
            where: { id: id },
        });
    }

    async update(
        id: number,
        planeUpdateDTO: PlaneUpdateDTO
    ): Promise<PlaneUpdateSuccessDTO> {
        const plane: Plane = await this.getById(id);
        if (!plane) {
            throw new Error("Plane not found");
        }

        if (planeUpdateDTO.model) {
            plane.model = planeUpdateDTO.model;
        }

        try {
            await this.planeRepository.save(plane);
        } catch (error) {
            throw new Error("Error: " + error);
        }

        const response: PlaneUpdateSuccessDTO = {
            model: plane.model,
        };

        return response;
    }

    async delete(id: number): Promise<DeleteResult> {
        try {
            return await this.planeRepository.delete(id);
        } catch (error) {
            throw new Error("Error: " + error);
        }
    }
}