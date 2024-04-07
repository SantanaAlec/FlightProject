import { Plane } from "../../entities/Plane";
import { SeatClass } from "../../entities/Seat";

export class SeatRegisterSuccessDTO {
    //! Required
    planeId!: number;
    number!: string;
    class!: SeatClass;
    price!: number;
}