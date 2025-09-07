"use server";

import { auth } from "@/auth";
import { prisma } from "../lib/prisma";

export async function createShop(formData: FormData) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  const name = formData.get("name")?.toString();
  const type = formData.get("type")?.toString();
  const description = formData.get("description")?.toString();
  const location = formData.get("location")?.toString() || "";
  const speciality = formData.get("speciality")?.toString();
  const priceRange = formData.get("priceRange")?.toString();
  const image = formData.get("image")?.toString() || null;
  const latitude = parseFloat(formData.get("latitude") as string);
  const longitude = parseFloat(formData.get("longitude") as string);

  if (!name || !type || !speciality || !priceRange) {
    return { success: false, error: "All fields are required" };
  }
  try {
    await prisma.shop.create({
      data: {
        name,
        location,
        type,
        priceRange,
        description,
        speciality,
        addedById: session.user.id,
        image,
        latitude,
        longitude,
      },
    });
    return { success: true };
  } catch(error:any) {
    return { success: false, error: error.message || "Something went wrong" };
  }
}
