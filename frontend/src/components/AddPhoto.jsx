import { useContext, useState } from "react"
import { Navigate } from "react-router"
import { UserContext } from "../userContext"

function AddPhoto(props) {
  const userContext = useContext(UserContext)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState("")
  const [uploaded, setUploaded] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("image", file)
    const res = await fetch("http://localhost:3001/photos", {
      method: "POST",
      headers: { "CSRF-Token": userContext.user.csrfToken },
      credentials: "include",
      body: formData,
    })
    await res.json()

    setUploaded(true)
  }

  return (
    <article>
      <form className="form-group" onSubmit={onSubmit}>
        {!userContext.user ? <Navigate replace to="/login" /> : ""}
        {uploaded ? <Navigate replace to="/" /> : ""}
        <label>Ime slike</label>
        <input
          type="text"
          name="title"
          placeholder="Ime slike"
          value={title}
          required
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <label>Opis slike</label>
        <textarea
          name="description"
          placeholder="Opis slike"
          value={description}
          required
          style={{ resize: "none" }}
          onChange={(e) => {
            setDescription(e.target.value)
          }}
        />
        <label>Izberi sliko</label>
        <input
          type="file"
          id="file"
          required
          onChange={(e) => {
            setFile(e.target.files[0])
          }}
        />
        <input type="submit" name="submit" value="Naloži" />
      </form>
    </article>
  )
}

export default AddPhoto
