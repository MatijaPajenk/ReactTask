import Comment from "./Comment"
import { useRef } from "react"

function Comments({ comments }) {
  const commentsRef = useRef(null)

  const handleScroll = (e) => {
    const scrollAmount = commentsRef.current.clientHeight + 22 // Adjust as needed
    const scrollDirection = e.deltaY > 0 ? 1 : -1 // 1 for scrolling down, -1 for scrolling up
    const scrollDistance = scrollAmount * scrollDirection

    if (commentsRef.current) {
      commentsRef.current.scrollBy({
        top: scrollDistance,
        behavior: "smooth", // Optional: Adds smooth scrolling animation
      })
    }
  }
  return (
    <>
      {comments.length > 0 ? (
        <>
          <h2>Comments</h2>
          <div className="comments" ref={commentsRef} onWheel={handleScroll}>
            {comments.map((comment) => (
              <Comment comment={comment} key={comment._id}></Comment>
            ))}
          </div>
        </>
      ) : (
        <h2>No comments yet</h2>
      )}
    </>
  )
}

export default Comments
