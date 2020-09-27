import React from 'react'
import Link from 'gatsby-link'
import { FormattedMessage } from 'react-intl'

const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url}>{props.text}</Link>
  } else {
    return <span></span>
  }
}

const TestimonialListNavigation = props => {
  const { index, pageCount, lang } = props

  const previousUrl = index - 1 == 1 ? '' : (index - 1).toString()
  const nextUrl = (index + 1).toString()
  const first = index === 1
  const last = index === pageCount / 2 || pageCount === 1

  return (
    <div className="content site-width">
      <div className="blog-post-navigation">
        <div className="previousLink">
          <FormattedMessage id="previousPage">
            {text => (
              <NavLink
                test={first}
                url={`/${lang}/testimonials/${previousUrl}`}
                text={text}
              />
            )}
          </FormattedMessage>
        </div>

        <div className="nextLink">
          <FormattedMessage id="nextPage">
            {text => (
              <NavLink
                test={last}
                url={`/${lang}/testimonials/${nextUrl}`}
                text={text}
              />
            )}
          </FormattedMessage>

        </div>
      </div>
    </div>
  )
}

export default TestimonialListNavigation
