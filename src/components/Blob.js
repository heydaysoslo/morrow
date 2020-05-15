import React, { useState } from "react"
import SimplexNoise from "simplex-noise"
import { motion } from "framer-motion"
import styled from "styled-components"

import useInterval from "./hooks/useInterval"
import { random } from "../utils/helpers"
import { css } from "styled-components"

const Blob = ({
  seed = 4,
  play = true, // Boolean value to "pause" the blob animation
  speed = 0.005, // Speed of the animation
  xMan = 1,
  yMan = 1,
  intensity = 10, // Amount of diversion in the individual vector (point) radius
  vectorAmount = 10, // Amount of vectors (points). Controls the complexity of the shape
  maskRadius = 38, // The radius of the mask circle
  startColor,
  strokeWidth,
  colors,
  stroke,
  ...props
}) => {
  const [path, setPath] = useState([])
  const [time, setTime] = useState(0)
  const [color, setColor] = useState(startColor)
  // const [animate, setAnimate] = useState(true)

  useInterval(() => {
    setColor(colors[random(0, colors.length)])
  }, 8000)

  // Generate simplex noise values
  const simplex = new SimplexNoise(seed)

  // Function to genereate the path of the svg blob
  const generatePath = newPoints => {
    return newPoints.reduce((string, point, index) => {
      const { x, y } = point
      string += `
        ${index !== 0 ? "T" : ""}${x} ${y}
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
    <SVG
      color={color}
      stroke={stroke}
      viewBox="0 0 100 100"
      {...props}
      style={{ overflow: "visible" }}
    >
      <path
        d={path}
        style={{
          transformOrigin: "center center",
          transition: "transform 2s ease, fill 5s ease, stroke 5s ease",
        }}
      />
    </SVG>
  )
}

const SVG = styled.svg(
  ({ stroke, color }) => css`
    path {
      fill: ${stroke ? "transparent" : color};
      stroke: ${stroke ? color : "transparent"};
    }
  `
)

export default Blob
