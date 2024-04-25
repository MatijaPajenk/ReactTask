import { useState, useEffect, useRef } from "react"
import Photo from "./Photo"
import Loading from "./Loading"
import React from "react"
import "../styles/photos.css"

function Photos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [seeNsfw, setSeeNsfw] = useState(false)
  const containerRef = useRef(null)

  const handleScroll = (e) => {
    const scrollAmount = containerRef.current.clientHeight // Adjust as needed
    const scrollDirection = e.deltaY > 0 ? 1 : -1 // 1 for scrolling down, -1 for scrolling up
    const scrollDistance = scrollAmount * scrollDirection

    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: scrollDistance,
        behavior: "smooth", // Optional: Adds smooth scrolling animation
      })
    }
  }

  const handleScrollUp = () => {
    const scrollAmount = containerRef.current.clientHeight // Adjust as needed

    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: -scrollAmount,
        behavior: "smooth", // Optional: Adds smooth scrolling animation
      })
    }
  }

  const handleScrollDown = () => {
    const scrollAmount = containerRef.current.clientHeight

    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      })
    }
  }

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
      <div className="photos-grid">
        <div className="photo-list" ref={containerRef} onWheel={handleScroll}>
          {photos
            .filter((photo) => (!seeNsfw && photo.nsfw === false) || seeNsfw)
            .map((photo) => (
              <Photo photo={photo} key={photo._id}></Photo>
            ))}
        </div>
        <div className="controls">
          <i className="fas fa-arrow-up" onClick={handleScrollUp}></i>
          <i className="fas fa-arrow-down" onClick={handleScrollDown}></i>
        </div>
      </div>
    </div>
  )
}

export default Photos
