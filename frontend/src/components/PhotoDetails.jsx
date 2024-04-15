import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Photo from "./Photo"
import Loading from "./Loading"
import { UserContext } from "../userContext"
import { useContext } from "react"
import Vote from "./Vote"

function PhotoDetails() {
  const id = useParams().id
  const user = useContext(UserContext).user
  const [photo, setPhoto] = useState({})
  const [loading, setLoading] = useState(true)

  // FIXME: - fix show for unsigned user

  useEffect(() => {
    const getPhoto = async function () {
      try {
        const res = await fetch(
          `http://localhost:3001/photos/${id}/${user._id}`
        )
        const data = await res.json()
        setPhoto(data)
        setLoading(false)
      } catch (err) {
        console.error(err)
      }
    }
    getPhoto()
  }, [id, user._id])

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <Photo photo={photo} key={photo._id}></Photo>
      <Vote photo={photo}></Vote>
    </div>
  )
}

export default PhotoDetails
