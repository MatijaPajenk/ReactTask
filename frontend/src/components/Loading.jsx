import React from "react"
import "../styles/loading.css"

const Loading = () => {
  return (
    <div className="center">
      <button aria-busy="true" aria-label="Please wait…" />
    </div>
  )
}

export default Loading
