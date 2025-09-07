// app/api/shops/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Shop } from "@/lib/types";

export async function GET() {
  try {
    const rawShops = await prisma.shop.findMany({
      include: { reviews: true, addedBy: true },
      orderBy: { createdAt: "desc" },
    });

    const shops: Shop[] = rawShops.map((shop) => {
      const avgRating =
        shop.reviews.length > 0
          ? shop.reviews.reduce((sum, r) => sum + r.rating, 0) / shop.reviews.length
          : 0;

      return {
        id: shop.id,
        name: shop.name,
        type: shop.type,
        specialty: shop.speciality,
        priceRange: shop.priceRange,
        location: shop.location ?? "",
        image: shop.image ?? "assets/placeholder.svg",
        addedBy: shop.addedBy?.name ?? "Unknown",
        createdAt: shop.createdAt,
        reviews: shop.reviews.map((r) => ({
          ...r,
          createdAt: new Date(r.createdAt),
          updatedAt: new Date(r.updatedAt),
        })),
        rating: avgRating,
        reviewCount: shop.reviews.length,
        lat: shop.latitude,
        lng: shop.longitude,
      };
    });

    return NextResponse.json(shops);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch shops" }, { status: 500 });
  }
}
