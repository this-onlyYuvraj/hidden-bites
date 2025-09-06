import ShopDetailClient from "@/components/shop/ShopDetailClient";
import { prisma } from "@/lib/prisma";

interface ShopPageProps {
  params: Promise<{ id: string }>;
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { id } = await params; // Await params before using
  const shop = await prisma.shop.findFirst({
    where: { id },
    include: {
      addedBy: true,
      reviews: { include: { user: true } },
    },
  });

  if (!shop) {
    return <div className="text-center py-20">Shop not found</div>;
  }

  // Ensure non-null values for client component
  const safeShop = {
    ...shop,
    addedBy: {
      name: shop.addedBy.name ?? "Unknown",
      image: shop.addedBy.image ?? null,
    },
    reviews: shop.reviews.map((r) => ({
      ...r,
      user: {
        name: r.user.name ?? "Anonymous",
        image: r.user.image ?? null,
      },
    })),
    reviewCount: shop.reviews.length,
  rating:
    shop.reviews.length > 0
      ? shop.reviews.reduce((sum, r) => sum + r.rating, 0) / shop.reviews.length
      : 0,
  };

  return <ShopDetailClient shop={safeShop} />;
}