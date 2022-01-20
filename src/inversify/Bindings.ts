import { Guard } from "../auth/Guard";
import { TYPES } from "../config/Types";
import { container } from "../inversify.config";
import { ExampleRepository, ExampleRepositoryImpl } from "../repository/ExampleRepository";
import { ExampleService, ExampleServiceImpl } from "../service/ExampleService";

container.bind<Guard>(TYPES.Guard).to(Guard);
container.bind<ExampleRepository>(TYPES.ExampleRepository).to(ExampleRepositoryImpl);
container.bind<ExampleService>(TYPES.ExampleService).to(ExampleServiceImpl);
