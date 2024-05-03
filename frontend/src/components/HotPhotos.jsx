import { useEffect, useState } from "react"
import Loading from "./Loading"
import PhotosGrid from "./PhotosGrid"

const HotPhotos = () => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getPhotos = async function () {
      const res = await fetch("http://localhost:3001/photos", {
        credentials: "include",
      })
      const data = await res.json()
      setPhotos(data)
      setLoading(false)
    }
    getPhotos()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <section>
      <h1>Hot Photos</h1>
      <PhotosGrid photos={photos} seeNsfw={false} />
    </section>
  )
}

export default HotPhotos
