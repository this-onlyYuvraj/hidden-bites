/*
  Warnings:

  - You are about to drop the column `latitude` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Shop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Shop" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ALTER COLUMN "location" DROP NOT NULL;
