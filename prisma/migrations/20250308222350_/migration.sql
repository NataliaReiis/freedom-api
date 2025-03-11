/*
  Warnings:

  - The values [LIGHT,MEDIUM,SEVERE] on the enum `NivelComplaint` will be removed. If these variants are still used in the database, this will fail.
  - The values [BRIFERY,HUMILIATION,AGGRESSION,PERSECUTION,PATRIMONIAL_VIOLATION,PSUCHOLOGICAL_HARASSMENT,PHYSICAL_HARASSMENT,OTHERS] on the enum `TypeComplaint` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `imageComplaint` on the `Complaint` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Made the column `cpf` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NivelComplaint_new" AS ENUM ('LEVE', 'MEDIO', 'GRAVE');
ALTER TABLE "Complaint" ALTER COLUMN "nivelComplaint" TYPE "NivelComplaint_new" USING ("nivelComplaint"::text::"NivelComplaint_new");
ALTER TYPE "NivelComplaint" RENAME TO "NivelComplaint_old";
ALTER TYPE "NivelComplaint_new" RENAME TO "NivelComplaint";
DROP TYPE "NivelComplaint_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TypeComplaint_new" AS ENUM ('CHANTAGEM', 'HUMILHACAO', 'AGRESSAO', 'PERSEGUICAO', 'VIOLAÇÃO_PATRIMONIAL', 'VERBAL_HARASSMENT', 'ASSEDIO_VERBAL', 'ASSEDIO_FISICO', 'OUTROS');
ALTER TABLE "Complaint" ALTER COLUMN "typeComplaint" TYPE "TypeComplaint_new" USING ("typeComplaint"::text::"TypeComplaint_new");
ALTER TYPE "TypeComplaint" RENAME TO "TypeComplaint_old";
ALTER TYPE "TypeComplaint_new" RENAME TO "TypeComplaint";
DROP TYPE "TypeComplaint_old";
COMMIT;

-- AlterTable
ALTER TABLE "Complaint" DROP COLUMN "imageComplaint";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "cpf" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_cpf_key" ON "Profile"("cpf");
