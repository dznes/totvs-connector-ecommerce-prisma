-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;
