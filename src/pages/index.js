import React from "react"
import Layout from "../components/layout"
import Logo from "../components/Logo"
import styled from "styled-components"

import "./reset.css"
import "./style.css"
import SEO from "../components/SEO"

const IndexPage = () => {
  return (
    <Layout>
      <SEO />
      <Page>
        <p>Accelerating the green energy transition</p>
        <Logo />
        <A href="mailto:paal.brun@morrowbatteries.com">Contact</A>
      </Page>
    </Layout>
  )
}

const A = styled.a`
  color: currentColor;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:visited,
  &:focus {
    color: currentColor;
  }
`

const SPACING = 74

const Page = styled.article`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: ${SPACING / 2}px;

  @media screen and (min-width: 700px) {
    padding: ${SPACING}px;
  }

  ${Logo} {
    max-width: 370px;
    margin: 0 auto;
    width: 100%;
    padding-top: ${SPACING / 4}px;
    padding-bottom: ${SPACING / 4}px;

    @media screen and (min-width: 700px) {
      max-width: 570px;
      padding-top: ${SPACING / 2}px;
      padding-bottom: ${SPACING / 2}px;
    }
  }
`

export default IndexPage
