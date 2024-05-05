import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { FormField } from "@/components/FormField"
import axios from "axios"
import { Formik } from "formik"
import { useRouter } from "next/router"
import * as yup from "yup"

export const getServerSideProps = async ({ params: { adresseId } }) => {
  const { data: adresse } = await axios(
    `http://localhost:3000/api/adresses/${adresseId}`,
  )

  return {
    props: { adresse },
  }
}
const validationSchema = yup.object({
  description: yup.string().min(3).required(),
  category: yup.string().min(1).required(),
})
const AdresseEditPage = ({ adresse }) => {
  const router = useRouter()
  const initialValues = adresse
  const handleSubmit = async ({ _id, description, category }) => {
    await axios.patch(`/api/adresses/${_id}`, { description, category })

    router.push(`/adresses/${_id}`)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField name="description" placeholder="Description" />
        <FormField name="category" placeholder="Description" />
        <Button type="submit">SAVE</Button>
      </Form>
    </Formik>
  )
}

export default AdresseEditPage
