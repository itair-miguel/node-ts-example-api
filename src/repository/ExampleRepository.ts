import { injectable } from "inversify";
import { WhereOptions } from "sequelize";
import { Example, ExampleModel } from "../dal/models/Example";
import { AbstractBaseRepository, BaseRepository } from "./BaseRepository";

export type ExampleCriteria = Example;

export type ExampleRepository = BaseRepository<ExampleModel, ExampleCriteria>;

@injectable()
export class ExampleRepositoryImpl extends AbstractBaseRepository<ExampleModel, ExampleCriteria> implements ExampleRepository {
    protected buildQuery(criteria: Partial<ExampleCriteria>): WhereOptions {
        const whereClause: WhereOptions<ExampleModel> = {};
        if (criteria.id) {
            whereClause.id = criteria.id;
        }
        if (criteria.title) {
            whereClause.title = criteria.title;
        }
        if (criteria.comment) {
            whereClause.comment = criteria.comment;
        }
        return whereClause;
    }
}
