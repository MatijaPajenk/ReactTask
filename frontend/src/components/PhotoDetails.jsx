import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Photo from "./Photo"
import Loading from "./Loading"
import Vote from "./Vote"
import { UserContext } from "../userContext"
import { useContext } from "react"

function PhotoDetails() {
  const id = useParams().id
  const userContext = useContext(UserContext)
  const [photo, setPhoto] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getPhoto = async function () {
      try {
        const res = await fetch(
          `http://localhost:3001/photos/${id}/${userContext.user._id}`
        )
        const data = await res.json()
        setPhoto(data)
        setLoading(false)
      } catch (err) {
        console.error(err)
      }
    }
    getPhoto()
  }, [id, userContext.user._id])

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <Photo photo={photo} key={photo._id}></Photo>
      <Vote photo={photo} />
    </div>
  )
}

export default PhotoDetails
