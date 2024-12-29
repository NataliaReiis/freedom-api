/*
  Warnings:

  - You are about to drop the column `age` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `imageDoc` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `imageDocSelf` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `imageSelf` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `marital_status` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `tel` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileID]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileID` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "age",
DROP COLUMN "cpf",
DROP COLUMN "imageDoc",
DROP COLUMN "imageDocSelf",
DROP COLUMN "imageSelf",
DROP COLUMN "marital_status",
DROP COLUMN "name",
DROP COLUMN "sex",
DROP COLUMN "tel",
ADD COLUMN     "profileID" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tel" TEXT,
    "age" INTEGER NOT NULL,
    "sex" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "marital_status" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_profileID_key" ON "users"("profileID");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_profileID_fkey" FOREIGN KEY ("profileID") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
