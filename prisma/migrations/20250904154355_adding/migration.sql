/*
  Warnings:

  - Added the required column `customType` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Shop" ADD COLUMN     "customType" TEXT NOT NULL;
