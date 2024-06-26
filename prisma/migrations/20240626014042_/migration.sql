/*
  Warnings:

  - You are about to drop the column `uptdatedAt` on the `PostBlog` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `PostBlog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostBlog" DROP COLUMN "uptdatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
