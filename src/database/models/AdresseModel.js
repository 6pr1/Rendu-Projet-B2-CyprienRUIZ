import { adresseSchema } from "@/database/schemas/adresseSchema"
import mongoose from "mongoose"

export const Model =
  mongoose.models.Adresse || mongoose.model("Adresse", adresseSchema)
