import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject } from "inversify";
import { controller, httpGet, httpPost, httpPut, interfaces } from "inversify-express-utils";
import { TYPES } from "../config/Types";
import { Example } from "../dal/models/Example";
import { ExampleService } from "../service/ExampleService";
import { EnvelopeResponse } from "./envelope/EnvelopeResponse";

@controller("/example")
export class ExampleController implements interfaces.Controller {

    @inject(TYPES.ExampleService)
    private ExampleService: ExampleService;

    /**
     * Creates an Example
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    @httpPost("/")
    public async create(req: Request, res: Response) {
        let Example: Example = Object.assign({}, req.body);
        Example = await this.ExampleService.create(Example);
        res.send(EnvelopeResponse.envelope<Example>(Example)).status(StatusCodes.CREATED);
    }

    /**
     * Updates an Example
     * @param req 
     * @param res 
     * @param next 
     */
    @httpPut("/:id")
    public async update(req: Request, res: Response) {
        const Example: Example = Object.assign({}, req.body);
        await this.ExampleService.update(Example, { id: req.params.id });
        res.send(EnvelopeResponse.envelopeMessage("Ok")).status(StatusCodes.OK);
    }

    /**
     * Gets a list of Examples
     * @param req 
     * @param res 
     * @param next 
     */
    @httpGet("/")
    public async findAll(req: Request, res: Response) {
        const Examples: Example[] = await this.ExampleService.findAll({ id: req.params.id });
        res.send(EnvelopeResponse.envelope<Example[]>(Examples)).status(StatusCodes.OK);
    }

}
