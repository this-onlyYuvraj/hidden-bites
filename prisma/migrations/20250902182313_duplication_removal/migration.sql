/*
  Warnings:

  - You are about to drop the `_ShopReviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserReviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserShops` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_ShopReviews" DROP CONSTRAINT "_ShopReviews_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ShopReviews" DROP CONSTRAINT "_ShopReviews_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UserReviews" DROP CONSTRAINT "_UserReviews_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UserReviews" DROP CONSTRAINT "_UserReviews_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UserShops" DROP CONSTRAINT "_UserShops_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_UserShops" DROP CONSTRAINT "_UserShops_B_fkey";

-- DropTable
DROP TABLE "public"."_ShopReviews";

-- DropTable
DROP TABLE "public"."_UserReviews";

-- DropTable
DROP TABLE "public"."_UserShops";
