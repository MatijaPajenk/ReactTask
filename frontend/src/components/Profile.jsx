import { useContext, useEffect, useState } from "react"
import { UserContext } from "../userContext"
import { Navigate } from "react-router-dom"
import "../styles/profile.css"

function Profile() {
  const userContext = useContext(UserContext)
  const [profile, setProfile] = useState({})
  const baseUrl = "http://localhost:3001"

  useEffect(function () {
    const getProfile = async function () {
      const res = await fetch("http://localhost:3001/users/profile", {
        credentials: "include",
      })
      const data = await res.json()
      setProfile(data)
    }
    getProfile()
  }, [])

  const handleAddAvatar = async function (e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("avatar", e.target.avatar.files[0])
    const res = await fetch("http://localhost:3001/users/changeAvatar", {
      method: "PUT",
      body: formData,
      credentials: "include",
    })
    const data = await res.json()
    setProfile(data)
  }

  return (
    <>
      {!userContext.user ? <Navigate replace to="/login" /> : ""}
      <article className="profile-card">
        {profile.avatar && (
          <img src={baseUrl + profile.avatar} alt="avatar" className="avatar" />
        )}
        <div className="line"></div>
        <h1>{profile.username}</h1>
        <h5>{profile.email}</h5>
        <table class="striped stats">
          <thead data-theme="light">
            <th>
              <i class="fa-solid fa-image"></i>
            </th>
            <th>
              <i class="fa-solid fa-thumbs-up"></i>
            </th>
            <th>
              <i class="fa-solid fa-thumbs-down"></i>
            </th>
            <th>
              <i class="fa-solid fa-comment"></i>
            </th>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>
      </article>

      <form onSubmit={handleAddAvatar} className="avatar-form">
        <article>
          <label>{profile.avatar ? "Change avatar" : "Upload avatar"}</label>
          <div className="flex">
            <input type="file" name="avatar" />
            <button type="submit">OK</button>
          </div>
        </article>
      </form>
    </>
  )
}

export default Profile
