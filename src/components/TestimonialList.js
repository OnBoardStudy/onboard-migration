import React from 'react'
import Testimonial from './Testimonial'

const TestimonialList = props => {
  return (
    <div className="content site-width">
      <div className="testimonial testimonial-list">
        <div className="boxes">
          {props.testimonials.map(testimonial =>
            <Testimonial key={testimonial.node.id} testimonial={testimonial.node} />)}
        </div>
      </div>
    </div>
  )
}

export default TestimonialList
