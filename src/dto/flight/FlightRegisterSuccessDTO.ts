export class FlightRegisterSuccessDTO {
    //! Required
    planeId!: number;
    origin!: string;
    destination!: string;
    departureDate!: Date;
    arrivalDate!: Date;
    luggageCapacity!: number;
}