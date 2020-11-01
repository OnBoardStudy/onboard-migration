import React from 'react'
import Link from 'gatsby-link'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import HomepageBoxes from '../components/HomepageBoxes'
import SecondSection from '../components/SecondSection'
import ContactFormSection from '../components/ContactFormSection'
import BlogPostList from '../components/BlogPostList'
import Footer from '../components/Footer'

import 'font-awesome/css/font-awesome.min.css'
import '../styles/main.css'

const IndexPage = ({ data, pathContext }) => {
  const homepage = data.allContentfulHomepage.edges[0].node
  const blogPosts = data.allContentfulBlog.edges
  const menuItems = data.allContentfulMenu.edges
  const testimonials = data.allContentfulTestimonial ? data.allContentfulTestimonial.edges : []

  return (
    <div>
      <Navigation lang={pathContext.langKey} menuItems={menuItems} menuType="top" />
      <Hero data={homepage}/>
      <HomepageBoxes data={homepage} testimonials={testimonials} lang={pathContext.langKey} />
      <SecondSection data={homepage} lang={pathContext.langKey} />
      <BlogPostList posts={blogPosts} lang={pathContext.langKey} />
      <ContactFormSection data={homepage} lang={pathContext.langKey} />
      <Footer data={homepage} menuItems={menuItems} menuType="top" />
    </div>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query enHomepage {
    allContentfulHomepage(filter: { node_locale: { eq: "en" } }) {
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
          description {
            childMarkdownRemark {
              html
            }
          }
          homepageBox {
            id
            title
            link
            buttonText
            content {
              childMarkdownRemark {
                html
              }
            }
            image {
              sizes(maxWidth: 800) {
                ...GatsbyContentfulSizes
              }
            }
          }
          secondSectionTitle
          secondSectionDescription {
            childMarkdownRemark {
              html
            }
          }
          contactSectionTitle
          contactSectionText {
            childMarkdownRemark {
              html
            }
          }
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
    allContentfulBlog(
      filter: { node_locale: { eq: "en" }, hide: {ne: true} }
      sort: { fields: [createdAt], order: DESC }
      limit: 5
    ) {
      edges {
        node {
          id
          title
          hide
          slug
          node_locale
          createdAt(formatString: "DD.MM.YYYY")
          featuredImage {
            resolutions(width: 255) {
              ...GatsbyContentfulResolutions
            }
          }
          content {
            childMarkdownRemark {
              excerpt
            }
          }
        }
      }
    }
    allContentfulMenu (filter: { node_locale: { eq: "en" } }) {
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
    allContentfulTestimonial(filter: {node_locale: {eq: "en"}, hide: {ne: true}}) {
      edges {
        node {
          id
          node_locale
          hide
          profile {
            file {
              url
            }
          }
          author
          testimonial {
            testimonial
          }
        }
      }
    }
  }
`
