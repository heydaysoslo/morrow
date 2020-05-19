import React from "react"
import styled, { css } from "styled-components"
import Blob from "./Blob"
import { random } from "../utils/helpers"

const ALLCOLORS = ["#8754FF", "#45C0FF", "#34DFA0", "#B3F456"]
const RANDOM_NUMBER = random(0, ALLCOLORS.length)
const COLORS = [
  ALLCOLORS[RANDOM_NUMBER],
  ALLCOLORS[RANDOM_NUMBER + 1] ? ALLCOLORS[RANDOM_NUMBER + 1] : ALLCOLORS[0],
]

const shapes = [...new Array(5)]
  .map((_, i) => ({
    seed: Math.random(),
    strokeWidth: random(1, 10),
    startColor: COLORS[i % COLORS.length],
    colors: ALLCOLORS,
    speed: random(0.001, 0.005), // Speed of the animation
    intensity: random(10, 20), // Amount of diversion in the individual vector (point) radius
    vectorAmount: 5, // Amount of vectors (points). Controls the complexity of the shape
    yMan: random(4, 12),
    xMan: random(1, 3),
    left: random(-20, 40),
    stroke: false,
  }))
  .sort((a, b) => (a.yMan > b.yMan ? 1 : -1))

const Header = () => {
  return (
    <Wrapper>
      {[...shapes].map((shape, i) => (
        <Blob
          key={`blob-${i}`}
          style={{ left: `${shape.left}%` }}
          play={true}
          {...shape}
        />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div(
  ({ theme }) => css`
    position: fixed;
    left: 0;
    width: 100%;
    height: 800px;
    z-index: -1;
    filter: blur(10px);
    will-change: filter;
    transform: translateZ(0);
    @media screen and (min-width: 900px) {
      filter: blur(30px);
    }

    svg {
      position: fixed;
      top: 0;
      transform: translateY(-50%);
    }
  `
)

export default Header
