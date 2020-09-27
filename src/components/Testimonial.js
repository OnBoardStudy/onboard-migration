import React from 'react'

const Testimonial = props => <div className="box">
  <div className="part-img">
    {props.testimonial.profile.file && <img src={props.testimonial.profile.file.url} alt="avatar"/>}
  </div>
  <div className="part-text">
    <p>
      {props.testimonial.testimonial.testimonial}
    </p>
    <span className="name">{props.testimonial.author}</span>
  </div>
</div>

export default Testimonial
