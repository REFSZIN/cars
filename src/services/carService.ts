import notFoundError from "../errors/notFoundError.js";
import conflictError from "../errors/conflictError.js";
import carRepository, { CarInput } from "../repository/carRepository.js";

async function getCars() {
  const cars = await carRepository.getCars();
  return cars;
}

async function getCar(id: number) {
  const car = await carRepository.getCar(id);
  if (!car) {
    throw notFoundError();
  }

  return car;
}

async function createCar(car: CarInput) {
  const carWithLicense = await carRepository.getCarWithLicensePlate(car.licensePlate);
  if (carWithLicense) {
    throw conflictError(`Car with license plate ${car.licensePlate} already registered.`)
  }

  await carRepository.updateOrCreateCar(0, car);
}

async function deleteCar(id: number) {
  await getCar(id);
  await carRepository.deleteCar(id);
}

async function updateCar(id: number, car: CarInput) {
  await getCar(id);
  await carRepository.updateOrCreateCar(id, car);
}

const carService = {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar
}

export default carService;