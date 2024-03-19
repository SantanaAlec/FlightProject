export class FlightRegisterDTO {
    //! Required
    planeId!: number;
    origin!: string;
    destination!: string;
    departureDate!: Date;
    arrivalDate!: Date;
    luggageCapacity!: number;
    cost!: number;
}