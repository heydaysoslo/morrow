import React from "react"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ className }) => {
  const res = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          author
          canonical
          description
          title
        }
      }
      image: file(relativePath: { eq: "SEO-MORROW.png" }) {
        childImageSharp {
          fixed(width: 1000) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const data = res.site.siteMetadata
  const image = res.image.childImageSharp.fixed.src
  return (
    <GatsbySeo
      title={data.title}
      description={data.description}
      canonical={data.canonical}
      openGraph={{
        url: data.canonical,
        title: data.title,
        description: data.description,
        images: [
          {
            url: image,
            width: 1000,
            height: 600,
            alt: "Og Image Alt",
          },
        ],
        site_name: data.title,
      }}
      twitter={{
        handle: data.author,
        cardType: "summary_large_image",
      }}
    />
  )
}

export default SEO
