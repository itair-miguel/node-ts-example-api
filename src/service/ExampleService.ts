import { inject } from "inversify";
import { TYPES } from "../config/Types";
import { Example, ExampleModel } from "../dal/models/Example";
import { ExampleCriteria, ExampleRepository } from "../repository/ExampleRepository";
import { AbstractBaseService, BaseService } from "./BaseService";

export type ExampleService = BaseService<Example, ExampleCriteria>;

export class ExampleServiceImpl extends AbstractBaseService<Example, ExampleCriteria, ExampleModel> implements ExampleService {

    @inject(TYPES.ExampleRepository)
    protected repo: ExampleRepository;

    public async create(dto: Partial<Example>): Promise<Example> {
        return super.create(dto).then(this.toDTO);
    }

    protected toDTO(model: Partial<ExampleModel>): Example {
        return {
            comment: model.comment,
            id: model.id,
            title: model.title,
        } as Example;
    }

    protected toModel(dto: Partial<Example>): ExampleModel {
        return {
            comment: dto.comment,
            id: dto.id,
            title: dto.title,
        } as ExampleModel;
    }

}
