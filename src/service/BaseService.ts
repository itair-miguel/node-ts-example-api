import { injectable } from "inversify";
import { Model } from "sequelize-typescript";
import { BaseRepository } from "../repository/BaseRepository";

export interface BaseService<D, C> {
    findAll(criteria: Partial<C>): Promise<D[]>;
    create(dto: Partial<D>): Promise<D>;
    update(dto: Partial<D>, criteria: Partial<C>): Promise<void>;
    deleteById(id: string): Promise<void>;
    getOne(criteria: Partial<C>): Promise<D>;
}

@injectable()
export abstract class AbstractBaseService<D, C, M extends Model> implements BaseService<D, C> {

    protected repo: BaseRepository<M, C>;

    public async findAll(criteria: Partial<C>): Promise<D[]> {
        return this.repo.findAll(criteria).then((records) => records.map(this.toDTO));
    }

    public async create(dto: Partial<D>): Promise<D> {
        const model = this.toModel(dto);
        return this.repo.create(model).then(this.toDTO);
    }

    public async update(dto: Partial<D>, criteria: Partial<C>): Promise<void> {
        const model = this.toModel(dto);
        return this.repo.update(model, criteria);
    }

    public async deleteById(id: string): Promise<void> {
        return this.repo.deleteById(id);
    }

    public async getOne(criteria: Partial<C>): Promise<D> {
        return this.repo.getOne(criteria).then(this.toDTO);
    }

    protected abstract toDTO(model: Partial<M>): D;
    protected abstract toModel(dto: Partial<D>): M;
}
