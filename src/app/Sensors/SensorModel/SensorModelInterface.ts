import { Attribute } from "src/app/Attributes/Attribute";
import { SensorModel } from "./SensorModel";

export interface SensorModelInterface {
    createModel();
    getModel():SensorModel;
}
