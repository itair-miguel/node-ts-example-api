import { injectable, unmanaged } from "inversify";
import { UpdateOptions, WhereOptions } from "sequelize";
import { Model } from "sequelize-typescript";
import { inspect } from "util";
import { Logger } from "../config/Logger";

export interface BaseRepository<M extends Model, C> {
    findAll(criteria: Partial<C>): Promise<M[]>;
    create(model: Partial<M>): Promise<M>;
    update(model: Partial<M>, criteria: Partial<C>): Promise<void>;
    deleteById(id: string): Promise<void>;
    getOne(criteria: Partial<C>): Promise<M>;
}

@injectable()
export abstract class AbstractBaseRepository<M extends Model, C> implements BaseRepository<M, C> {
    private MODEL: (new () => M) & typeof Model;

    constructor(@unmanaged() MODEL: (new () => M) & typeof Model) {
        this.MODEL = MODEL;
    }

    public async findAll(criteria: Partial<C>): Promise<M[]> {
        const where = this.buildQuery(criteria);

        return this.MODEL.findAll<M>({ where }).catch((error) => {
            Logger.error("Error in findAll method. Unnable to complete request.");
            throw error;
        });
    }

    public async create(model: M): Promise<M> {
        return this.MODEL.create<M>(model).catch((error) => {
            Logger.error("Error in create method. Unnable to complete request.");
            throw error;
        });
    }

    public async update(model: M, criteria: Partial<C>): Promise<void> {
        const where = this.buildQuery(criteria);
        const opts: UpdateOptions = { where };
        // removing any undefined fields as those would be set the DB field to null and we don't want that.
        // nullable DB fields should accept a null value and that value should be informed.
        Object.keys(model).forEach((key) => (model as never)[key] === undefined && delete (model as never)[key]);
        // This guarantees that PKs are not going to be updated by any in code functionality
        opts.fields = Object.keys(this.MODEL.rawAttributes).filter((key) => this.MODEL.primaryKeyAttributes.indexOf(key) < 0);

        try {
            await this.MODEL.update<M>(model, opts);
        } catch (error) {
            Logger.error("Error in update method. Unnable to complete request.");
            throw error;
        }
    }

    public async deleteById(id: string): Promise<void> {
        try {
            await this.MODEL.destroy<M>({ where: id });
        } catch (error) {
            Logger.error("Error in update method. Unnable to complete request.");
            throw error;
        }
    }

    public async getOne(criteria: Partial<C>): Promise<M> {
        const where = this.buildQuery(criteria);
        const record = await this.MODEL.findOne<M>({ where }).catch((error) => {
            Logger.error(`Error in getOne for the given criteria: ${inspect(criteria)}`);
            throw error;
        });
        if (!record) {
            throw new ReferenceError(`No record found for the given criteria: ${inspect(criteria)}`);
        }
        return record;
    }

    protected abstract buildQuery(criteria: Partial<C>): WhereOptions;
}
