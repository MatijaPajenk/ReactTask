import { UserContext } from "../userContext"
import { useContext } from "react"
import { useState } from "react"
import "../styles/vote.css"

function Vote({ photo }) {
  const userContext = useContext(UserContext)
  const baseUrl = "http://localhost:3001/photos"
  const [likes, setLikes] = useState(photo.likes)
  const [dislikes, setDislikes] = useState(photo.dislikes)

  async function handleVote(vote) {
    try {
      const res = await fetch(`${baseUrl}/${vote}/${photo._id}`, {
        credentials: "include",
      })
      const data = await res.json()
      setLikes(data.likes)
      setDislikes(data.dislikes)
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
    </article>
  )
}

export default Vote
