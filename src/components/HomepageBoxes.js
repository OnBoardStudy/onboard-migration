import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import TestimonialSlider from './TestimonialSlider'

const HomepageBoxes = props => {
  const boxes = props.data.homepageBox.map(box => (
    <div className="well" key={box.id}>
      <Link to={`/${props.lang}/${box.link}`} key={box.link} className="img">
        <Img sizes={box.image.sizes} />
      </Link>
      <h3>{box.title}</h3>
      <div
        dangerouslySetInnerHTML={{
          __html: box.content.childMarkdownRemark.html,
        }}
      />
      <Link to={`/${props.lang}/${box.link}`} key={`btn_${box.link}`}>
        <button>
          {box.buttonText}
          <i className="fa fa-angle-right" />
        </button>
      </Link>
    </div>
  ))

  return (
    <div className="content site-width">
      <div
        className="homepage-description"
        dangerouslySetInnerHTML={{
          __html: props.data.description.childMarkdownRemark.html,
        }}
      />
      {props.testimonials.length && <TestimonialSlider testimonials={props.testimonials} lang={props.lang}/>}
      <div className="wells">{boxes}</div>
    </div>
  )
}

export default HomepageBoxes
