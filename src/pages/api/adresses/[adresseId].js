import { createRoute } from "@/api/createRoute"
import { AdresseModel } from "@/database/models/AdresseModel"

const handler = createRoute(async (req, res) => {
  const { adresseId } = req.query
  const adresse = await AdresseModel.findById(adresseId)

  if (!adresse) {
    res.status(404).send({ error: "not found" })

    return
  }

  if (req.method === "GET") {
    res.send(adresse)

    return
  }

  if (req.method === "PATCH") {
    const { description, category, isDone } = req.body

    Object.assign(adresse, {
      description: description || adresse.description,
      category: category || adresse.category,
      isDone: isDone ?? adresse.isDone,
    })

    await adresse.save()

    res.send(adresse)

    return
  }

  if (req.method === "DELETE") {
    await adresse.deleteOne()

    res.send(adresse)
  }
})

export default handler
