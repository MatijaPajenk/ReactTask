import { UserContext } from "../userContext"
import { useState, useContext } from "react"
import "../styles/vote.css"

function Vote({ photo }) {
  const userContext = useContext(UserContext)
  const baseUrl = "http://localhost:3001/photos"
  const [likes, setLikes] = useState(photo.likes)
  const [dislikes, setDislikes] = useState(photo.dislikes)
  const [nsfw, setNsfw] = useState(photo.nsfw)

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
    <article className="vote">
      <div id="likes" className="votes">
        <span>{likes.length}</span>
        {likes.includes(userContext.user._id) ? (
          <i
            className="fa-solid fa-thumbs-up vote-icon"
            onClick={() => handleVote("unlike")}></i>
        ) : (
          <i
            className="fa-regular fa-thumbs-up vote-icon"
            onClick={() => handleVote("like")}></i>
        )}
      </div>
      <div id="dislikes" className="votes">
        <span>{dislikes.length}</span>
        {dislikes.includes(userContext.user._id) ? (
          <i
            className="fa-solid fa-thumbs-down vote-icon"
            onClick={() => handleVote("undislike")}></i>
        ) : (
          <i
            className="fa-regular fa-thumbs-down vote-icon"
            onClick={() => handleVote("dislike")}></i>
        )}
      </div>
      <button
        data-tooltip={"NSFW: " + nsfw}
        className="none"
        onClick={() => handleNsfw()}>
        <i className="fa-solid fa-eye-slash vote-icon"></i>
      </button>
    </article>
  )
}

export default Vote
