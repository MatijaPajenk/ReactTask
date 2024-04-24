import Comment from "./Comment"

function Comments({ comments }) {
  return (
    <>
      {comments.length > 0 ? (
        <>
          <h2>Comments</h2>
          <div className="comments">
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
