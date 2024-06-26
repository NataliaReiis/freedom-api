/*
  Warnings:

  - You are about to drop the column `commentsId` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the `Complainer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `postBlogId` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeComplaint" AS ENUM ('BRIFERY', 'HUMILIATION', 'AGGRESSION', 'PERSECUTION', 'PATRIMONIAL_VIOLATION', 'VERBAL_HARASSMENT', 'PSUCHOLOGICAL_HARASSMENT', 'PHYSICAL_HARASSMENT', 'OTHERS');

-- CreateEnum
CREATE TYPE "NivelComplaint" AS ENUM ('LIGHT', 'MEDIUM', 'SEVERE');

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_commentsId_fkey";

-- DropForeignKey
ALTER TABLE "Complainer" DROP CONSTRAINT "Complainer_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Complainer" DROP CONSTRAINT "Complainer_userId_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "commentsId",
ADD COLUMN     "postBlogId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Complainer";

-- DropEnum
DROP TYPE "NivelComplainer";

-- DropEnum
DROP TYPE "TypeComplainer";

-- CreateTable
CREATE TABLE "Complaint" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "typeComplaint" "TypeComplaint" NOT NULL,
    "nivelComplaint" "NivelComplaint" NOT NULL,
    "imageComplaint" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Complaint_locationId_key" ON "Complaint"("locationId");

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postBlogId_fkey" FOREIGN KEY ("postBlogId") REFERENCES "PostBlog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
