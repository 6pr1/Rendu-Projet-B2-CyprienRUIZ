import { createRoute } from "@/api/createRoute"
import { AdresseModel } from "@/database/models/AdresseModel"

const handler = createRoute(async (req, res) => {
  
  if (req.method === "GET") {
    const { category } = req.query
    const adresses = await AdresseModel.find(category ? { category } : {})

    res.send(adresses)

    return
  }

  
  if (req.method === "POST") {
    const { description, category } = req.body
    const newAdresse = new AdresseModel({
      description,
      category,
    })

    await newAdresse.save()

    res.send(newAdresse)
  }
})

export default handler
