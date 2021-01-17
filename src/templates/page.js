import React, { Component } from 'react'
import { StaticQuery, graphql } from "gatsby";
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import ImageBoxRow from '../components/ImageBoxRow'
import ContactFormSection from '../components/ContactFormSection'
import { Helmet } from 'react-helmet'

const Page = props => {
  return (
    <StaticQuery
      query={graphql`
  query PageQuery($slug: String!, $langKey: String!) {
    contentfulPage(slug: { eq: $slug }, node_locale: { eq: $langKey }) {
      title
      body {
        childMarkdownRemark {
          html
          excerpt
        }
      }
      featuredImage {
        sizes(maxWidth: 2000) {
          ...GatsbyContentfulSizes
        }
      }
      node_locale
      submenu {
        ... on ContentfulImageLink {
          id
          text
          link
          image {
            sizes(maxWidth: 800) {
              ...GatsbyContentfulSizes
            }
          }
          node_locale
        }
      }
      secondSectionTitle
      secondSectionText {
        childMarkdownRemark {
          html
        }
      }
      secondSectionList {
        ... on ContentfulImageLink {
          id
          text
          link
          image {
            sizes(maxWidth: 800) {
              ...GatsbyContentfulSizes
            }
          }
          node_locale
        }
      }
    }
    allContentfulHomepage(filter: { node_locale: { eq: $langKey } }) {
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
    allContentfulMenu(filter: { node_locale: { eq: $langKey } }) {
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
            ... on ContentfulTextLink {
              id
              link
              text
            }
          }
        }
      }
    }
  }
`}
      render={
        data => {
          const {
            title,
            createdAt,
            body,
            featuredImage,
            submenu,
            secondSectionTitle,
            secondSectionText,
            secondSectionList,
          } = data.contentfulPage
          const homepage = data.allContentfulHomepage.edges[0].node
          const menuItems = data.allContentfulMenu.edges

          return (
            <div className="page-content">
              <Helmet
                title={`${title} | OnBoard`}
                meta={[
                  { name: 'og:type', content: 'article' },
                  { name: 'og:title', content: title },
                  { name: 'og:image', content: featuredImage.sizes.src && featuredImage.sizes.src.substring(2) },
                  {
                    name: 'og:description',
                    content: body.childMarkdownRemark.excerpt,
                  },
                  { name: 'og:locale', content: props.pageContext.langKey },
                ]}
              />

              <Navigation
                lang={props.pageContext.langKey}
                menuItems={menuItems}
                menuType="top"
              />

              <div className="featured-image-box-full">
                <div className="site-width">
                  <h1>{title}</h1>
                </div>
                <div className="img gradient">
                  <Img sizes={featuredImage.sizes} />
                </div>
              </div>

              <div className="site-width first-section">
                <div
                  dangerouslySetInnerHTML={{ __html: body.childMarkdownRemark.html }}
                />
                {submenu && (
                  <div className="submenu">
                    <ImageBoxRow boxes={submenu} />
                  </div>
                )}
              </div>

              {(secondSectionTitle || secondSectionText || secondSectionList) && (
                <div className="second-section">
                  <div className="site-width">
                    {secondSectionTitle && <h2>{secondSectionTitle}</h2>}
                    {secondSectionText && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: secondSectionText.childMarkdownRemark.html,
                        }}
                      />
                    )}
                    {secondSectionList && (
                      <div className="submenu">
                        <ImageBoxRow boxes={secondSectionList} />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {(props.pageContext.slug === 'contacts' ||
                props.pageContext.slug === 'kontakt' ||
                props.pageContext.slug === 'kontakty') && (
                <ContactFormSection lang={props.pageContext.langKey} />
              )}

              <Footer data={homepage} menuItems={menuItems} menuType="top" />
            </div>
          )
        }
      }
    />
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page
