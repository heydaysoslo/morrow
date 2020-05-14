import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Logo from "../components/Logo"
import styled from "styled-components"

import "./style.css"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <article>
      <p>Accelerating the green energy transition</p>
      <Logo />
      <A href="mailto:hello@morrow.energy">Contact</A>
    </article>
  </Layout>
)

const A = styled.a`
  text-decoration: underline;
`

export default IndexPage
