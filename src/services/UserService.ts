import { DeleteResult, Repository } from "typeorm";
import { User } from "../entities/User";
import { UserRegisterDTO } from "../dto/user/UserRegisterDTO";
import { UserRegisterSuccessDTO } from "../dto/user/UserRegisterSuccessDTO";
import { UserUpdateDTO } from "../dto/user/UserUpdateDTO";
import { UserUpdateSuccessDTO } from "../dto/user/UserUpdateSuccessDTO";

export class UserService {
    private userRepository: Repository<User>;
    constructor(userRepository: Repository<User>) {
        this.userRepository = userRepository;
    }

    async register(
        UserRegisterDTO: UserRegisterDTO
    ): Promise<UserRegisterSuccessDTO> {
        const user = new User();
        user.name = UserRegisterDTO.name;
        user.role = UserRegisterDTO.role;
        user.email = UserRegisterDTO.email;
        user.password = UserRegisterDTO.password;
        user.phone = UserRegisterDTO.phone;

        await this.userRepository.save(user);

        const response: UserRegisterSuccessDTO = {
            name: user.name,
            email: user.email,
            phone: user.phone,
        };

        return response;
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getById(id: number): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where: { id: id },
        });
    }

    async update(
        id: number,
        UserUpdateDTO: UserUpdateDTO
    ): Promise<UserUpdateSuccessDTO> {
        const user: User = await this.getById(id);
        if (!user) {
            throw new Error("User not found");
        }

        if (UserUpdateDTO.name) {
            user.name = UserUpdateDTO.name;
        }
        if (UserUpdateDTO.role) {
            user.role = UserUpdateDTO.role;
        }
        if (UserUpdateDTO.email) {
            user.email = UserUpdateDTO.email;
        }
        if (UserUpdateDTO.password) {
            user.password = UserUpdateDTO.password;
        }
        if (UserUpdateDTO.phone) {
            user.phone = UserUpdateDTO.phone;
        }

        await this.userRepository.save(user);

        const response: UserUpdateSuccessDTO = {
            name: user.name,
            email: user.email,
            phone: user.phone,
        };

        return response;
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }
}
