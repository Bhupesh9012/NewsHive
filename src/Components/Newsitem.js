import React, { Component } from 'react'

export class Newsitem extends Component {
  
  render() {
      let {title,description,imageUrl,newsUrl}=this.props;
      return (
        <div className="my-3">
            <div className="card">
            <img src={!imageUrl?"https://www.indiantelevision.com/sites/default/files/styles/smartcrop_800x800/public/images/tv-images/2021/08/02/news.jpg?itok=eEnb05ue":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a  rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-success">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Newsitem