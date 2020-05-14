module.exports = {
  siteMetadata: {
    title: `Morrow`,
    description: `Accelerating the green energy transition`,
    author: `@morrowbatteries`,
    canonical: `https://morrowbatteries.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-next-seo`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: `https://morrowbatteries.com`,
        sitemap: `https://morrowbatteries.com/sitemap.xml`,
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-plugin-polyfill-io`,
      options: {
        features: [
          `fetch`,
          "Array.prototype.forEach",
          "NodeList.prototype.forEach",
          "Array.prototype.map",
        ],
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Poppins"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `MORROW`,
        short_name: `MORROW`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#FFFFFF`,
        display: `minimal-ui`,
        icon: `src/images/MORROW-FAVICON.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
