import { SeatClass } from "../../entities/Seat";

export class SeatUpdateSuccessDTO {
    //! Required
    planeId!: number;
    number!: string;
    class!: SeatClass;
    price!: number;
}