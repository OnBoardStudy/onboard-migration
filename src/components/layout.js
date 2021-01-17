import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import HeaderTop from '../components/HeaderTop'

import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n'
import { IntlProvider, addLocaleData } from 'react-intl';

import 'intl';
import en from 'react-intl/locale-data/en';
import 'intl/locale-data/jsonp/en';
import sk from 'react-intl/locale-data/sk';
import 'intl/locale-data/jsonp/sk';
import { StaticQuery, graphql } from "gatsby";

addLocaleData([...en, ...sk]);

const Layout = ({ children, location }) => {
  return (
    <StaticQuery
      query={graphql`
        query Layout {
          site {
            siteMetadata {
              languages {
                defaultLangKey
                langs
              }
            }
          }
        }
      `}
      render={
        data => {
          const url = location.pathname
          const { langs, defaultLangKey } = data.site.siteMetadata.languages
          const langKey = getCurrentLangKey(langs, defaultLangKey, url)
          const homeLink = `/${langKey}/`
          const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url))
          const i18nMessages = require(`../data/messages/${langKey}`);

          return (
            <IntlProvider locale={langKey} messages={i18nMessages}>
              <div className="site-wrapper">
                <Helmet
                  title="OnBoard Migration"
                  meta={[
                    { name: 'description', content: 'Migration agency Australia' },
                    { name: 'keywords', content: 'migration, agency' },
                  ]}
                />
                <HeaderTop langs={langsMenu} />
                {children()}
              </div>
            </IntlProvider>
          )
        }
      }
    />
  )
}

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout
