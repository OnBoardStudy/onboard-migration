import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Link from 'gatsby-link'
import { StaticQuery, graphql } from "gatsby";

const ThanksSk = props => {
  return (
    <StaticQuery
      query={graphql`
          query ThanksSkQuery {
            allContentfulHomepage(filter: { node_locale: { eq: "sk" } }) {
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
            allContentfulMenu(filter: { node_locale: { eq: "sk" } }) {
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
              <Navigation lang="sk" menuItems={menuItems} menuType="top" />

              <div className="site-width">
                <h1>Ďakujeme</h1>
                <p>
                  Budeme sa snažit odpovedať čo najskôr.{' '}
                  <Link to={`/sk`}>&laquo; Naspäť na úvodnú stránku.</Link>
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

ThanksSk.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ThanksSk
