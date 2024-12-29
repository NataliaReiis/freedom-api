-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_profileID_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "profileID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_profileID_fkey" FOREIGN KEY ("profileID") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
