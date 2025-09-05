"use server"

import { auth } from "@/auth"
import { prisma } from "../lib/prisma"

export async function createShop(formData: FormData) {
  const session = await auth()
  if (!session || !session.user?.id) {
    throw new Error("Not Authenticated")
  }

  const name = formData.get("name")?.toString()
  const type = formData.get("type")?.toString()
  const description = formData.get('description')?.toString()
  const location = formData.get("location")?.toString() || "";
  const speciality = formData.get("speciality")?.toString()
  const priceRange = formData.get("priceRange")?.toString()
  const customType = formData.get("customType")?.toString() || ""
  const image = formData.get("image")?.toString() || "";


  if (!name || !location || !type || !description || !speciality ||!priceRange || !image) {
    throw new Error("All Fields are Required")
  }

  await prisma.shop.create({
    data:{
        name,
        location,
        type,
        customType,
        priceRange,
        speciality,
        addedById: session.user.id,
        image,
    }
  })
}
