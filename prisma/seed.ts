// arquivo que será executado pra popular nosso banco <3

import prisma from "../src/config/database.js";

async function main() {
  await prisma.cars.createMany({
    skipDuplicates: true,
    data: [
      { model: "HB20", licensePlate: "ABC9091", year: "2001", color: "AZUL" },
      { model: "SONATA", licensePlate: "EZD3031", year: "2010", color: "PRETO" },
      { model: "X1", licensePlate: "FBI2232", year: "2018", color: "BRANCO" },
      { model: "CIVIC", licensePlate: "LPA1013", year: "2021", color: "CINZA" },
    ]
  })
}

main().then(() => {
  console.log("deu muito bom!");
}).catch((e) => {
  console.log(e);
  console.log("deu muito ruim 😢");
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})