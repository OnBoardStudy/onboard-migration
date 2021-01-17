import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Link from 'gatsby-link'
import { StaticQuery, graphql } from "gatsby";

const Thanks = () => {
  return (
    <StaticQuery
      query={graphql`
  query ThanksQuery {
    allContentfulHomepage(filter: { node_locale: { eq: "en" } }) {
      edges {
        node {
          id
          footerContacts {
            childMarkdownRemark {
              html
            }
          }
          footerSocialLinks {
            id
            text
            link
            type
          }
        }
      }
    }
    allContentfulMenu(filter: { node_locale: { eq: "en" } }) {
      edges {
        node {
          id
          type
          node_locale
          items {
            ... on ContentfulPage {
              id
              link: slug
              text: title
              node_locale
            }
            ... on ContentfulImageLink {
              id
              link
              text
              node_locale
            }
            ... on ContentfulTextLink {
              id
              link
              text
              node_locale
            }
          }
        }
      }
    }
  }
`
      }
      render={
        data => {
          const homepage = data.allContentfulHomepage.edges[0].node
          const menuItems = data.allContentfulMenu.edges

          return (
            <div className="page-content">
              <Navigation lang="en" menuItems={menuItems} menuType="top" />

              <div className="site-width">
                <h1>Thank you!</h1>
                <p>
                  We'll try to get back to you as soon as possible.{' '}
                  <Link to={`/en`}>&laquo; Back to homepage.</Link>
                </p>
              </div>
              <Footer data={homepage} menuItems={menuItems} menuType="top" />
            </div>
          )
        }
      }
    />
  )
}

Thanks.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Thanks
