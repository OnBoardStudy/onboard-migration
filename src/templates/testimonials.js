import React from 'react'
import TestimonialListNavigation from '../components/TestimonialListNavigation'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import TestimonialList from '../components/TestimonialList'
import Hero from '../components/Hero'

const TestimonialsPage = ({ data, pathContext }) => {
  const { group, index, pageCount, pathPrefix } = pathContext
  const lang = pathPrefix.substr(0, 2)
  // TODO: add a check if data were not loaded, or don't exist
  const page = data.allContentfulTestimonialsPage.edges.find((edge) => edge.node.node_locale === lang).node;

  const testimonials = group.filter(
    item => (item.node.node_locale === lang && item.node.hide !== true)
  )
  const homepage = data.allContentfulHomepage.edges.filter(
    item => item.node.node_locale === lang
  )[0].node

  const menu = data.allContentfulMenu.edges.filter(
    item => item.node.node_locale === lang
  )

  return (
    <div>
      <Navigation lang={lang} menuItems={menu} menuType="top" />
      {page && <Hero data={page}/>}
      {/*<BlogPostList posts={blogPosts} lang={lang} />*/}
      <TestimonialList testimonials={testimonials} lang={lang} />
      <TestimonialListNavigation lang={lang} index={index} pageCount={pageCount} />
      <Footer data={homepage} menuItems={menu} menuType="top" />
    </div>
  )
}
export default TestimonialsPage

export const testimonialsPageQuery = graphql`
  query testimonialsPageQuery {
    allContentfulMenu {
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
    allContentfulHomepage {
      edges {
        node {
          node_locale
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
    allContentfulTestimonialsPage {
      edges {
        node {
          node_locale
          heroTitle
          heroImage {
            sizes(maxWidth: 2000) {
              ...GatsbyContentfulSizes
            }
          }
          heroDescription {
            childMarkdownRemark {
              html
            }
          }
          heroButtonText
          heroButtonLink
        }
      }
    }
  }
`
