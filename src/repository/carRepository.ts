import prisma from "../config/database.js";
import { cars, category } from "@prisma/client";

export type CarInput = Omit<cars, "id" | "createAt">;

async function getCars() {
  // const data = await db.query(`SELECT * FROM cars`);
  const data = await prisma.cars.findMany();
  return data;
}

async function getCar(id: number) {
  // const data = await db.query(`SELECT * FROM cars WHERE id = $1`, [id]);
  const data = await prisma.cars.findFirst({
    where: { id },
    select: {
      categoryId: true,
      model: true,
      color: true,
      licensePlate: true,
      year: true,
      category: {
        select: {
          name: true
        }
      }
    }
  })

  return data;
}

async function getCarWithLicensePlate(licensePlate: string) {
  // const data = await db.query(`SELECT * FROM cars WHERE "licensePlate" = $1`, [licensePlate]);
  const data = await prisma.cars.findFirst({
    where: { licensePlate }
  })
  return data;
}

async function updateOrCreateCar(id: number, car: CarInput) {
  await prisma.cars.upsert({
    where: { id },
    create: car,
    update: { ...car }
  })
}

async function createCar(car: CarInput) {
  await prisma.cars.create({
    data: car
  })

  // await db.query(
  //   `INSERT INTO cars (model, "licensePlate", year, color)
  //    VALUES ($1, $2, $3, $4)`,
  //   [model, licensePlate, year, color]
  // );
}

async function deleteCar(id: number) {
  await prisma.cars.delete({
    where: { id }
  })
  // await db.query(`DELETE FROM cars WHERE id = $1`, [id]);
}

async function updateCar(id: number, car: CarInput) {
  await prisma.cars.update({
    where: { id },
    data: car
  })
}

const carRepository = {
  getCar,
  getCarWithLicensePlate,
  getCars,
  createCar,
  deleteCar,
  updateCar,
  updateOrCreateCar
}

export default carRepository;