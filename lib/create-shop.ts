"use server"

import { auth } from "@/auth"
import { prisma } from "../lib/prisma"
import { redirect } from "next/navigation"


export async function createShop(formData: FormData) {
  const session = await auth()
  if (!session || !session.user?.id) {
    throw new Error("Not Authenticated")
  }


  const name = formData.get("name")?.toString()
  const type = formData.get("type")?.toString()
  const description = formData.get('description')?.toString()
  const location = formData.get("location")?.toString()
  const latitudeStr = formData.get("latitude")?.toString() // we have to add
  const longitudeStr = formData.get("longitude")?.toString() // we have to add
  const specialty = formData.get("speciality")?.toString()
  const priceRange = formData.get("priceRange")?.toString()
  const customType = formData.get("customType")?.toString() || ""


  if (!name || !location || !type || !description || !specialty ||!priceRange) {
    throw new Error("All Fields are Required")
  }
  const latitude = latitudeStr ? parseFloat(latitudeStr) : null
  const longitude = longitudeStr ? parseFloat(longitudeStr) : null

  await prisma.shop.create({
    data:{
        name,
        location,
        type,
        customType,
        priceRange,
        latitude,
        longitude,
        specialty,
        addedById: session.user.id,
    }
  })


  redirect("/memories")
}
