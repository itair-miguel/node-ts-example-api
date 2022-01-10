import { TYPES } from "../config/Types";
import { container } from "../inversify.config";
import { UserRepository, UserRepositoryImpl } from "../repository/UserRepository";
import { AuthService, AuthServiceImpl } from "../service/AuthService";
import { Guard } from "../auth/Guard";

// controller imports
import "../controller/ApiAuthDeviceController";

container.bind<Guard>(TYPES.Guard).toSelf();
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
container.bind<AuthService>(TYPES.AuthService).to(AuthServiceImpl);
