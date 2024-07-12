import React, { Component } from 'react'
import noimage from './noimage.jpg'

export class NewsItem extends Component {
  render() {
    let  { title, description, image, newsurl, author, publishedAt,source } = this.props;
    return (
      <div className='my-3'>
        <div className="card">
        <span className="badge text-bg-dark">{source}</span>
          <img src={!image ? noimage : image} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <a href={newsurl} className="btn btn-sm btn-danger">Read More</a>
            <p className="card-text"><small className="text-date">by {!author ? "unknown" : author}, time : {new Date(publishedAt).toGMTString()}</small></p>

          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem