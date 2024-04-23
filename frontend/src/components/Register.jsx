import { useEffect, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import "../styles/form.css"

function Register() {
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [email, setEmail] = useState([])
  const [error, setError] = useState([])
  const [captcha, setCaptcha] = useState(null)
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

  async function Register(e) {
    e.preventDefault()
    if (captcha === null) {
      setError("Please verify you are not a robot")
      return
    }
    const res = await fetch("http://localhost:3001/users", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json", "CSRF-Token": csrfToken },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    })
    const data = await res.json()
    if (data._id !== undefined) {
      window.location.href = "/"
    } else {
      setUsername("")
      setPassword("")
      setEmail("")
      setCaptcha(null)
      setError("Registration failed")
    }
  }

  return (
    <form onSubmit={Register} className="form-medium">
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
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
      <ReCAPTCHA
        sitekey="6LcvQ8QpAAAAABIQuiynFVpec5OF7XVmLH9oTIZB"
        onChange={(value) => setCaptcha(value)}
      />
      <br />
      <input type="submit" name="submit" value="Register" />
      <label>{error}</label>
      <input type="hidden" name="_csrf" value={csrfToken} />
    </form>
  )
}

export default Register
