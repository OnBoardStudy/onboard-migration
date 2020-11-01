const path = require('path')
const createPaginatedPages = require('gatsby-paginate')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve('src/templates/page.js')
    const blogPostTemplate = path.resolve('src/templates/blog-post.js')

    graphql(`
      {
        allContentfulPage {
          edges {
            node {
              id
              slug
              node_locale
            }
          }
        }
      }
    `)
      .then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        result.data.allContentfulPage.edges.forEach(edge => {
          createPage({
            path: `/${edge.node.node_locale}/${edge.node.slug}/`,
            component: pageTemplate,
            context: {
              slug: edge.node.slug,
              id: edge.node.id,
              langKey: edge.node.node_locale,
            },
          })
        })
        return
      })
      .then(() => {
        graphql(`
          {
            allContentfulBlog {
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
                      width
                      height
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
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
          }
        `).then(result => {
          if (result.errors) {
            reject(result.errors)
          }

          createPaginatedPages({
            edges: result.data.allContentfulBlog.edges,
            createPage,
            pageTemplate: 'src/templates/blog-index.js',
            pageLength: 20,
            pathPrefix: 'sk/blog',
            buildPath: (index, pathPrefix) =>
              index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}`, // This is optional and this is the default
          })

          createPaginatedPages({
            edges: result.data.allContentfulBlog.edges,
            createPage,
            pageTemplate: 'src/templates/blog-index.js',
            pageLength: 20,
            pathPrefix: 'en/blog',
            buildPath: (index, pathPrefix) =>
              index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}`, // This is optional and this is the default
          })

          result.data.allContentfulBlog.edges.forEach(edge => {
            createPage({
              path: `/${edge.node.node_locale}/blog/${edge.node.slug}/`,
              component: blogPostTemplate,
              context: {
                slug: edge.node.slug,
                title: edge.node.title,
                langKey: edge.node.node_locale,
              },
            })
          })
          return
        })
      })
      .then(() => {
        graphql(`
        {
          allContentfulTestimonial {
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
      `).then(result => {
          if (result.errors) {
            reject(result.errors)
          }

          createPaginatedPages({
            edges: result.data.allContentfulTestimonial.edges,
            createPage,
            pageTemplate: 'src/templates/testimonials.js',
            pageLength: 20,
            pathPrefix: 'sk/testimonials',
            buildPath: (index, pathPrefix) =>
              index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}`, // This is optional and this is the default
          })

          createPaginatedPages({
            edges: result.data.allContentfulTestimonial.edges,
            createPage,
            pageTemplate: 'src/templates/testimonials.js',
            pageLength: 20,
            pathPrefix: 'en/testimonials',
            buildPath: (index, pathPrefix) =>
              index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}`, // This is optional and this is the default
          })
          return
        })
      })

    resolve()
  })
}
