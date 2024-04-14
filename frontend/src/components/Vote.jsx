import { UserContext } from "../userContext"
import { useContext, useEffect } from "react"
import { useState } from "react"
import "../styles/vote.css"

function Vote({ photo }) {
  const userContext = useContext(UserContext)
  const baseUrl = "http://localhost:3001/photos"
  const [likes, setLikes] = useState(photo.likes)
  const [dislikes, setDislikes] = useState(photo.dislikes)

  const handleLike = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/like/${photo._id}/${userContext.user._id}`
      )
      const data = await res.json()
      setLikes([...data.likes])
    } catch (err) {
      console.error(err)
    }
  }

  const handleDislike = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/dislike/${photo._id}/${userContext.user._id}`
      )
      const data = await res.json()
      setDislikes([...data.dislikes])
    } catch (err) {
      console.error(err)
    }
  }

  const handleUnlike = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/unlike/${photo._id}/${userContext.user._id}`
      )
      const data = await res.json()
      setLikes([...data.likes])
    } catch (err) {
      console.error(err)
    }
  }

  const handleUndislike = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/undislike/${photo._id}/${userContext.user._id}`
      )
      const data = await res.json()
      setDislikes([...data.dislikes])
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <article>
      {likes.length}
      {likes.includes(userContext.user._id) ? (
        <i
          className="fa-solid fa-thumbs-up vote-icon"
          onClick={handleUnlike}></i>
      ) : (
        <i
          className="fa-regular fa-thumbs-up vote-icon"
          onClick={handleLike}></i>
      )}
      {dislikes.length}
      {dislikes.includes(userContext.user._id) ? (
        <i
          className="fa-solid fa-thumbs-down vote-icon"
          onClick={handleUndislike}></i>
      ) : (
        <i
          className="fa-regular fa-thumbs-down vote-icon"
          onClick={handleDislike}></i>
      )}
    </article>
  )
}

export default Vote
