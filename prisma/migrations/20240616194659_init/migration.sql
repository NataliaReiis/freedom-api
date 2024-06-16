-- CreateEnum
CREATE TYPE "TypeComplainer" AS ENUM ('BRIFERY', 'HUMILIATION', 'AGGRESSION', 'PERSECUTION', 'PATRIMONIAL_VIOLATION', 'VERBAL_HARASSMENT', 'PSUCHOLOGICAL_HARASSMENT', 'PHYSICAL_HARASSMENT', 'OTHERS');

-- CreateEnum
CREATE TYPE "NivelComplainer" AS ENUM ('LIGHT', 'MEDIUM', 'SEVERE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tel" TEXT,
    "marital_status" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" TEXT NOT NULL,
    "createedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageDoc" TEXT NOT NULL,
    "imageSelf" TEXT NOT NULL,
    "imageDocSelf" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Complainer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "typeComplainer" "TypeComplainer" NOT NULL,
    "nivelComplainer" "NivelComplainer" NOT NULL,
    "imageComplainer" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "Complainer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostBlog" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "imagePost" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uptadetAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PostBlog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "imageCommets" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uptadeAt" TIMESTAMP(3) NOT NULL,
    "commentsId" INTEGER,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Complainer_locationId_key" ON "Complainer"("locationId");

-- AddForeignKey
ALTER TABLE "Complainer" ADD CONSTRAINT "Complainer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complainer" ADD CONSTRAINT "Complainer_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostBlog" ADD CONSTRAINT "PostBlog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_commentsId_fkey" FOREIGN KEY ("commentsId") REFERENCES "PostBlog"("id") ON DELETE SET NULL ON UPDATE CASCADE;
