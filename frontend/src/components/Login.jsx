import { useContext, useState, useEffect } from "react"
import { UserContext } from "../userContext"
import { Navigate } from "react-router-dom"
import "../styles/form.css"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const userContext = useContext(UserContext)
  const [csrfToken, setCsrfToken] = useState("")

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3001/users/csrf-token", {
        method: "GET",
        credentials: "include",
      })
      const data = await res.json()
      setCsrfToken(data.csrfToken)
    }
    fetchData()
  }, [])

  async function Login(e) {
    e.preventDefault()
    const res = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": csrfToken,
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
    var data = await res.json()
    data.csrfToken = csrfToken
    if (data._id !== undefined) {
      userContext.setUserContext(data)
    } else {
      setUsername("")
      setPassword("")
      setError("Invalid username or password")
    }
  }

  return (
    <form onSubmit={Login} className="form-medium">
      <article>
        <h2 style={{ textAlign: "center" }}>Log in</h2>
        {userContext.user ? <Navigate replace to="/" /> : ""}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" name="submit" value="Log in" />
        <label>{error}</label>
      </article>
    </form>
  )
}

export default Login
