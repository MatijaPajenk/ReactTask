import { useState, useEffect } from "react"
import Photo from "./Photo"
import React from "react"

function Photos() {
  const [photos, setPhotos] = useState([])
  // const [seeNsfw, setSeeNsfw] = useState(false)
  useEffect(function () {
    const getPhotos = async function () {
      const res = await fetch("http://localhost:3001/photos", {
        credentials: "include",
      })
      const data = await res.json()
      setPhotos(data)
    }
    getPhotos()
  }, [])

  return (
    <div>
      {/* <button onClick={() => setSeeNsfw(!seeNsfw)}>
        See {seeNsfw ? "SFW" : "NSFW"}
      </button> */}
      <ul>
        {photos
          .filter((photo) => photo.nsfw === false)
          .map((photo) => (
            <Photo photo={photo} key={photo._id}></Photo>
          ))}
      </ul>
    </div>
  )
}

export default Photos
