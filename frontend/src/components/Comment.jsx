function Comment({ comment }) {
  const baseUrl = "http://localhost:3001/"
  return (
    <article>
      <p>{comment.content}</p>
      <p>
        <i>
          {comment.postedBy.avatar && (
            <img
              src={baseUrl + comment.postedBy.avatar}
              alt="avatar"
              className="avatar-xs-small"
            />
          )}
          {comment.postedBy.username}
        </i>
      </p>
    </article>
  )
}

export default Comment
