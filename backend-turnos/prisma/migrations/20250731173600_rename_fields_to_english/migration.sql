/*
  Warnings:

  - You are about to drop the column `apellido` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `servicio` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "apellido",
DROP COLUMN "nombre",
DROP COLUMN "servicio",
DROP COLUMN "telefono",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "service" TEXT;
