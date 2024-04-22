import { useParams } from "react-router-dom"
import { useEffect, useState, useContext, useCallback } from "react"
import { UserContext } from "../userContext"
import Photo from "./Photo"
import Loading from "./Loading"
import Vote from "./Vote"
import Comments from "./Comments"
import CommentForm from "./CommentForm"

function PhotoDetails() {
  const id = useParams().id
  const user = useContext(UserContext).user || { _id: "" }
  const [photo, setPhoto] = useState({})
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([])

  const getComments = useCallback(
    async function () {
      try {
        const res = await fetch(`http://localhost:3001/comments/${id}`, {
          credentials: "include",
        })
        const data = await res.json()
        setComments(data)
      } catch (err) {
        console.error(err)
      }
    },
    [id]
  )

  useEffect(() => {
    const getPhoto = async function () {
      try {
        const res = await fetch(`http://localhost:3001/photos/${id}`, {
          credentials: "include",
        })
        const data = await res.json()
        setPhoto(data)
        setLoading(false)
      } catch (err) {
        console.error(err)
      }
    }
    getPhoto()
    getComments()
  }, [id, user._id, getComments])

  const handleCommentForm = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const content = formData.get("content")

    try {
      const res = await fetch(`http://localhost:3001/comments/${id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content,
        }),
      })
      if (res.ok) {
        getComments()
        e.target.reset()
      } else {
        console.error("Failed to create comment")
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <Photo photo={photo} key={photo._id}></Photo>
      {user._id !== "" && <Vote photo={photo}></Vote>}
      {user._id !== "" && (
        <CommentForm
          photoId={photo._id}
          handleCommentForm={handleCommentForm}></CommentForm>
      )}
      <Comments comments={comments}></Comments>
    </div>
  )
}

export default PhotoDetails
