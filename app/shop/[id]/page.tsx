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
  };

  return <ShopDetailClient shop={safeShop} />;
}