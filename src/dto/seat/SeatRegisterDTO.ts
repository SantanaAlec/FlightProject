import { SeatClass } from "../../entities/Seat";

export class SeatRegisterDTO {
    //! Required
    planeId!: number;
    number!: string;
    class!: SeatClass;
    price!: number;
}