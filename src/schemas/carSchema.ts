import joi from "joi";
import { CarInput } from "../repository/carRepository";

export const carSchema = joi.object<CarInput>({
  model: joi.string().required(),
  licensePlate: joi.string().length(7).required(),
  year: joi.number().required(),
  color: joi.string().required()
});