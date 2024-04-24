function CommentForm({ photoId, handleCommentForm }) {
  return (
    <form onSubmit={(e) => handleCommentForm(e)}>
      <h3>Add Comment</h3>
      <textarea
        rows={4}
        name="content"
        placeholder="Comment"
        style={{ resize: "none" }}
        required
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default CommentForm
