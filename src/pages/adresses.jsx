import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { FormField } from "@/components/FormField"
import axios from "axios"
import clsx from "clsx"
import { Formik } from "formik"
import Link from "next/link"
import { useState } from "react"
import * as yup from "yup"

export const getServerSideProps = async () => {
  const { data: adresses } = await axios("http://localhost:3000/api/adresses")

  return {
    props: {
      adresses,
    },
  }
}

const initialValues = {
  description: "",
  category: "Adresse",
  extraFields: {},
}

const validationSchema = yup.object({
  description: yup.string().min(3).required(),
  category: yup.string().min(1).required(),
})

const AdressesPage = (props) => {
  const { adresses: initialAdresses } = props
  const [adresses, setAdresses] = useState(initialAdresses)

  const submit = async (values, { resetForm }) => {
    const { description, category, extraFields } = values;
    const { data: newAdresse } = await axios.post("/api/adresses", {
      description,
      category,
      extraFields,
    })
    setAdresses([newAdresse, ...adresses])
    resetForm()
  }

  const toggleAdresse = (adresse) => async () => {
    const { data: updatedAdresse } = await axios.patch(`/api/adresses/${adresse._id}`, {
      isDone: !adresse.isDone,
    })

    setAdresses((currentAdresses) => {
      const updatedAdresseIndex = currentAdresses.findIndex(
        ({ _id }) => _id === adresse._id,
      )

      return currentAdresses.with(updatedAdresseIndex, updatedAdresse)
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={submit}
      >
        <Form>
          <FormField name="description" placeholder="Description" />
          <FormField name="category" placeholder="Category" />
          <div>
            <FormField name="extraFields.cuisineType" placeholder="Type de cuisine" />
            <FormField name="extraFields.starRating" placeholder="Nombre d'étoiles" />
            <FormField name="extraFields.averagePrice" placeholder="Prix moyen" />
          </div>
          <Button type="submit">ADD</Button>
        </Form>
      </Formik>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-3 bg-stone-200" />
            <th className="p-3 bg-stone-200">Description</th>
            <th className="p-3 bg-stone-200">Category</th>
          </tr>
        </thead>
        <tbody>
          {adresses.map((adresse, index) => (
            <tr key={index} className="even:bg-stone-100">
              <td className="p-3">
                <button
                  onClick={toggleAdresse(adresse)}
                  className={clsx(
                    "border w-4 h-4 border-stone-400",
                    adresse.isDone && "bg-stone-400",
                  )}
                  data-adresse-id={adresse._id}
                />
              </td>
              <td className="p-3">
                <Link href={`/adresses/${adresse._id}/edit`}>{adresse.description}</Link>
              </td>
              <td className="p-3">{adresse.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdressesPage
