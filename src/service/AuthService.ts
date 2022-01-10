import { inject, injectable } from "inversify";
import { ValidationError } from "sequelize/dist";
import { TYPES } from "../config/Types";
import { User } from "../dal/models/User";
import { EncryptPassword } from "../util/crypto";
import { UserService } from "./UserService";

export interface AuthService {
    basicAuth(username: string, password: string): Promise<User | null>;
}

@injectable()
export class AuthServiceImpl implements AuthService {

    @inject(TYPES.UserService)
    private userService: UserService;

    /**
     * This methods checks for a user based on its credentials.
     * 
     * @param username 
     * @param password 
     * @returns 
     */
    public async basicAuth(username: string, password: string): Promise<User | null> {
        const user = await this.userService.getOne({ email: username }).catch(null);
        if (user) {
            this.checkUserPassword(password, user);
        }
        return user;
    }

    public checkUserPassword(password: string, user: User) {
        if (EncryptPassword(user.salt, password) !== EncryptPassword(user.password, user.salt)) {
            throw new ValidationError(`User password does not match`);
        }
    }
}
