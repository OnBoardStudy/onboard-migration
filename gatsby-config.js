require('dotenv').config()
const languages = require('./src/data/languages')

module.exports = {
  siteMetadata: {
    title: 'OnBoard Migration',
    languages,
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID || '',
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
      },
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyForNull: 'any',
        langKeyDefault: languages.defaultLangKey,
        useLangKeyLayout: false
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark'
  ],
}
