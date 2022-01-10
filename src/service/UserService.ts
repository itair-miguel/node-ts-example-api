import { User, UserModel } from "../dal/models/User";
import { UserCriteria } from "../repository/UserRepository";
import { AbstractBaseService, BaseService } from "./BaseService";

export interface UserService extends BaseService<User, UserCriteria> {

}

export class UserServiceImpl extends AbstractBaseService<User, UserCriteria, UserModel> implements UserService {

    protected toDTO(model: Partial<UserModel>): User {
        return {
            id: model.id,
            name: model.name,
            password: model.password,
            salt: model.salt,
            email: model.email,
        } as User;
    }

    protected toModel(dto: Partial<User>): UserModel {
        return {
            id: dto.id,
            name: dto.name,
            password: dto.password,
            salt: dto.salt,
            email: dto.email,
        } as UserModel;
    }

}
