import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Photo from "./Photo"
import Loading from "./Loading"

function PhotoDetails() {
  const id = useParams().id
  const [photo, setPhoto] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getPhoto = async function () {
      try {
        const res = await fetch(`http://localhost:3001/photos/${id}`)
        const data = await res.json()
        setPhoto(data)
        setLoading(false)
      } catch (err) {
        console.error(err)
      }
    }
    getPhoto()
  }, [id])

  if (loading) {
    return <Loading />
  }

  return <Photo photo={photo} key={photo._id}></Photo>
}

export default PhotoDetails
