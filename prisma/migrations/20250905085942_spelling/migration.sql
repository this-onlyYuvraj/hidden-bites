/*
  Warnings:

  - You are about to drop the column `specialty` on the `Shop` table. All the data in the column will be lost.
  - Added the required column `speciality` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Shop" DROP COLUMN "specialty",
ADD COLUMN     "speciality" TEXT NOT NULL;
