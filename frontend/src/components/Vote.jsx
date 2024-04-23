import { UserContext } from "../userContext"
import { useContext } from "react"
import { useState } from "react"
import "../styles/vote.css"

function Vote({ photo }) {
  const userContext = useContext(UserContext)
  const baseUrl = "http://localhost:3001/photos"
  const [likes, setLikes] = useState(photo.likes)
  const [dislikes, setDislikes] = useState(photo.dislikes)
  const [nsfw, setNsfw] = useState(photo.nsfw.length > 1 || false)

  async function handleVote(vote) {
    try {
      const res = await fetch(`${baseUrl}/${vote}/${photo._id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "CSRF-Token": userContext.user.csrfToken },
      })
      const data = await res.json()
      setLikes(data.likes)
      setDislikes(data.dislikes)
    } catch (err) {
      console.error(err)
    }
  }

  async function handleNsfw() {
    try {
      const res = await fetch(`${baseUrl}/nsfw/${photo._id}`, {
        method: "PUT",
        headers: { "CSRF-Token": userContext.user.csrfToken },
        credentials: "include",
      })
      const data = await res.json()
      setNsfw(data.nsfw)
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
          onClick={() => handleVote("unlike")}></i>
      ) : (
        <i
          className="fa-regular fa-thumbs-up vote-icon"
          onClick={() => handleVote("like")}></i>
      )}
      {dislikes.length}
      {dislikes.includes(userContext.user._id) ? (
        <i
          className="fa-solid fa-thumbs-down vote-icon"
          onClick={() => handleVote("undislike")}></i>
      ) : (
        <i
          className="fa-regular fa-thumbs-down vote-icon"
          onClick={() => handleVote("dislike")}></i>
      )}
      {!nsfw && (
        <i
          className="fa-solid fa-eye-slash vote-icon"
          onClick={() => handleNsfw()}></i>
      )}
    </article>
  )
}

export default Vote
