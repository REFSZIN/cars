-- CreateTable
CREATE TABLE "cars" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cars_licensePlate_key" ON "cars"("licensePlate");
