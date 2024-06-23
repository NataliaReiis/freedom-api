/*
  Warnings:

  - The primary key for the `Comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `imageCommets` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `uptadeAt` on the `Comments` table. All the data in the column will be lost.
  - The primary key for the `Complainer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CreatedAt` on the `Location` table. All the data in the column will be lost.
  - The primary key for the `PostBlog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uptadetAt` on the `PostBlog` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imageComments` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Made the column `commentsId` on table `Comments` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `uptdatedAt` to the `PostBlog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_commentsId_fkey";

-- DropForeignKey
ALTER TABLE "Complainer" DROP CONSTRAINT "Complainer_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Complainer" DROP CONSTRAINT "Complainer_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostBlog" DROP CONSTRAINT "PostBlog_userId_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_pkey",
DROP COLUMN "imageCommets",
DROP COLUMN "uptadeAt",
ADD COLUMN     "imageComments" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "commentsId" SET NOT NULL,
ALTER COLUMN "commentsId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Comments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Complainer" DROP CONSTRAINT "Complainer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "locationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Complainer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Complainer_id_seq";

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
DROP COLUMN "CreatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Location_id_seq";

-- AlterTable
ALTER TABLE "PostBlog" DROP CONSTRAINT "PostBlog_pkey",
DROP COLUMN "uptadetAt",
ADD COLUMN     "uptdatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PostBlog_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PostBlog_id_seq";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tel" TEXT,
    "marital_status" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageDoc" TEXT NOT NULL,
    "imageSelf" TEXT NOT NULL,
    "imageDocSelf" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Complainer" ADD CONSTRAINT "Complainer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complainer" ADD CONSTRAINT "Complainer_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostBlog" ADD CONSTRAINT "PostBlog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_commentsId_fkey" FOREIGN KEY ("commentsId") REFERENCES "PostBlog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
