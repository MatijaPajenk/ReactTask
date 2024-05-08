import { useEffect, useState } from "react"
import { decay } from "decay"
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
      const hotScore = decay.redditHot()

      // demo

      setPhotos(data)
      photos.map((photo) => {
        photo.score = hotScore(
          photo.likes.length,
          photo.dislikes.length,
          photo.postedOn
        )
      })
      setLoading(false)
    }
    getPhotos()
  }, [photos])

  if (loading) {
    return <Loading />
  }

  const sortedPhotos = photos.sort((a, b) => b.score - a.score)

  return (
    <section>
      <h1>Hot Photos</h1>
      <PhotosGrid photos={sortedPhotos} seeNsfw={false} />
    </section>
  )
}

export default HotPhotos
