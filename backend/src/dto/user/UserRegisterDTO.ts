import { UserRole } from "../../entities/User";

export class UserRegisterDTO {
    //! Required
    name!: string;
    role!: UserRole;
    email!: string;
    password!: string;
    phone!: string;
}