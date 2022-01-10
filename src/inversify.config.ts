import { Container } from "inversify";

// Setup the container with the correct and necessary bindings for IOC with InversifyJS
export const container = new Container();

// Adding all bindings
import "../src/inversify/Bindings";
