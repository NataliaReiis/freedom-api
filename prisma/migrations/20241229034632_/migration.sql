/*
  Warnings:

  - You are about to drop the column `profileID` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userID]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userID` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_profileID_fkey";

-- DropIndex
DROP INDEX "users_profileID_key";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "userID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "profileID";

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userID_key" ON "Profile"("userID");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
