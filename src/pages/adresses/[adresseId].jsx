import axios from "axios"

export const getServerSideProps = async ({ params: { adresseId } }) => {
  const { data: adresse } = await axios(
    `http://localhost:3000/api/adresses/${adresseId}`,
  )

  return {
    props: { adresse },
  }
}
const AdressePage = ({ adresse }) => (
  <>
    <h1 className="text-2xl font-semibold">Description: {adresse.description}</h1>
    <p>Category: {adresse.category}</p>
  </>
)

export default AdressePage