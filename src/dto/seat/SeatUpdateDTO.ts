import { SeatClass } from "../../entities/Seat";

export class SeatUpdateDTO {
    //! Required
    planeId?: number;
    number?: string;
    class?: SeatClass;
    price?: number;
}