import { useState, useEffect } from "react"
import Loading from "./Loading"
import React from "react"
import "../styles/photos.css"
import PhotosGrid from "./PhotosGrid"

function Photos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [seeNsfw, setSeeNsfw] = useState(false)

  useEffect(function () {
    const getPhotos = async function () {
      const res = await fetch("http://localhost:3001/photos", {
        credentials: "include",
      })
      const data = await res.json()
      setPhotos(data)
      setLoading(false)
    }

    getPhotos()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <button onClick={() => setSeeNsfw(!seeNsfw)} className="outline">
        See {seeNsfw ? "SFW" : "all (NSFW included)"}
      </button>
      <PhotosGrid photos={photos} seeNsfw={seeNsfw} />
    </div>
  )
}

export default Photos
