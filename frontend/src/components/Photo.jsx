import "../styles/photo.css"

function Photo({ photo }) {
  const baseUrl = "http://localhost:3001"
  const photoUrl = `/photos/${photo._id}`

  return (
    <article className="photo-article">
      <a
        href={photoUrl}
        className="photo-link"
        style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 className={photo.details ? "text-expanded" : "text-limited"}>
          {photo.title}
          {photo.details && photo.nsfw > 1 && " (NSFW)"}
          {!photo.details && photo.nsfw && " (NSFW)"}
        </h2>
        <h2>
          <i
            class="fa-solid fa-eye"
            style={{ margin: "0 .5em", display: "inline-block" }}>
            &nbsp;&nbsp;{photo.views.length || 0}
          </i>
        </h2>
      </a>
      <img className="photo" src={baseUrl + photo.path} alt={photo.title} />
      <p
        className={
          "photo-description " +
          (photo.details ? "text-expanded" : "text-limited")
        }>
        {photo.description}
      </p>
      <p style={{ fontSize: "1.2em" }}></p>
      <i>
        {photo.postedBy.avatar && (
          <img
            src={baseUrl + photo.postedBy.avatar}
            alt="avatar"
            className="avatar-small"
          />
        )}
        {photo.postedBy.username},
        <br />
        <small>{photo.postedOn}</small>
      </i>
    </article>
  )
}

export default Photo
