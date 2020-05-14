import React from "react"
import styled, { css } from "styled-components"
import Blob from "./Blob"

const COLORS = ["#8754FF", "#45C0FF", "#34DFA0", "#B3F456"]

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min

const shapes = [...new Array(5)]
  .map((_, i) => ({
    seed: Math.random(),
    color: COLORS[i % COLORS.length],
    speed: random(0.003, 0.005), // Speed of the animation
    intensity: 20, // Amount of diversion in the individual vector (point) radius
    vectorAmount: 10, // Amount of vectors (points). Controls the complexity of the shape
    yMan: random(3, 5),
    xMan: random(3, 5),
    left: random(1, 100),
  }))
  .sort((a, b) => (a.yMan > b.yMan ? 1 : -1))

console.log(shapes)

const Header = ({ className }) => {
  return (
    <div className={className}>
      {shapes.map(shape => (
        <Blob
          style={{ left: `${shape.left}%` }}
          seed={shape.seed}
          play={true}
          color={shape.color}
          speed={shape.speed} // Speed of the animation
          intensity={shape.instensity} // Amount of diversion in the individual vector (point) radius
          vectorAmount={shape.vectorAmount} // Amount of vectors (points). Controls the complexity of the shape
          yMan={shape.yMan}
          yMan={shape.xMan}
        />
      ))}
    </div>
  )
}

export default styled(Header)(
  ({ theme }) => css`
    position: fixed;
    left: 0;
    width: 100%;
    height: 800px;
    z-index: -1;
    filter: blur(30px);

    svg {
      position: fixed;
      top: 0;
      transform: translateY(-50%);
    }
  `
)
