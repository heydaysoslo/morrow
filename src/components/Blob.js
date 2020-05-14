import React, { useState } from "react"
import SimplexNoise from "simplex-noise"

import useInterval from "./hooks/useInterval"

const Blob = ({
  seed = 4,
  play = true, // Boolean value to "pause" the blob animation
  color = "#3CD01E",
  speed = 0.005, // Speed of the animation
  xMan = 1,
  yMan = 1,
  intensity = 10, // Amount of diversion in the individual vector (point) radius
  vectorAmount = 10, // Amount of vectors (points). Controls the complexity of the shape
  maskRadius = 38, // The radius of the mask circle
  ...props
}) => {
  const [path, setPath] = useState([])
  const [time, setTime] = useState(0)
  // const [animate, setAnimate] = useState(true)

  // Generate simplex noise values
  const simplex = new SimplexNoise(seed)

  // Function to genereate the path of the svg blob
  const generatePath = newPoints => {
    return newPoints.reduce((string, point, index) => {
      const { x, y } = point
      string += `
        ${index !== 0 ? "L" : ""}${x} ${y}
        ${index === newPoints.length - 1 ? `Z` : ","}
      `
      return string
    }, `M${newPoints[0].x} ${newPoints[0].y},`)
  }

  // Generate the vectors (points) from the simplex noise values
  const createVectors = () => {
    const circleCenter = 50
    let dots = []
    for (
      let angle = 0;
      angle < Math.PI * 2;
      angle += (Math.PI * 2) / vectorAmount
    ) {
      const xoff = Math.cos(angle) + 1
      const yoff = Math.sin(angle) + 1
      const radius = simplex.noise2D(xoff + time, yoff + time) * intensity + 40
      const x = (radius / xMan) * Math.cos(angle) + circleCenter
      const y = (radius / yMan) * Math.sin(angle) + circleCenter
      dots.push({ x, y })
    }
    setPath(generatePath(dots))
  }

  // Animate blob
  useInterval(() => {
    createVectors()
    setTime(time + speed)
    // if (play) {
    //   setAnimate(true)
    // } else {
    //   setAnimate(false)
    // }
  }, 1)
  return (
    <svg viewBox="0 0 100 100" {...props}>
      <path
        fill={color}
        d={path}
        style={{
          // transform: `scale(${animate ? 1 : 0.8})`,
          // transform: `scale(${animate ? 0.8 : 0.5})`,
          transformOrigin: "center center",
          transition: "transform 2s ease",
        }}
      />
      {/* <circle cx="50" cy="50" r={maskRadius} fill={color} /> */}
      {/* <text x="50" y="50" textAnchor="middle" fontSize="2px">
        Hello
      </text> */}
    </svg>
  )
}

export default Blob
