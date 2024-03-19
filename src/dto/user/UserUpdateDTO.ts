import { UserRole } from "../../entities/User";

export class UserUpdateDTO {
    //? Optional
    name?: string;
    role?: UserRole;
    email?: string;
    password?: string;
    phone?: string;
}