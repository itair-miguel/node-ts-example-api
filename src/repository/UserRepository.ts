import { injectable } from "inversify";
import { WhereOptions } from "sequelize";
import { User, UserModel } from "../dal/models/User";
import { AbstractBaseRepository, BaseRepository } from "./BaseRepository";

export interface UserCriteria extends User {

}

export interface UserRepository extends BaseRepository<UserModel, UserCriteria> {

}

@injectable()
export class UserRepositoryImpl extends AbstractBaseRepository<UserModel, UserCriteria> implements UserRepository {
    protected buildQuery(criteria: Partial<UserCriteria>): WhereOptions {
        const whereClause: WhereOptions<UserModel> = {};
        if (criteria.id) {
            whereClause.id = criteria.id;
        }
        if (criteria.name) {
            whereClause.name = criteria.name;
        }
        if (criteria.password) {
            whereClause.password = criteria.password;
        }
        return whereClause;
    }
}