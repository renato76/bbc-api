import React from 'react'
import moment from 'moment'

const PostsCard = (props) => {
  const { owner, tags, publishDate, image, text } = props
  const tag1 = tags[0]
  const tag2 = tags[1]
  const tag3 = tags[2]
  return (
    <div className="card-container">
      <div className="card">
        <div className="topbar">
          <div className="avatar-container">
            <img className="avatar" src={owner.picture} />
          </div>
          <div className="name-date-container">
            <div className="name">
              <div className="title">
                <h2>{owner.title}</h2>
              </div>
              <div className="firstname">
                <h2>{owner.firstName}</h2>
              </div>
              <div className="lastname">
                <h2>{owner.lastName}</h2>
              </div>
            </div>
            <div className="publish-date">
              <h2>{moment(publishDate).format('Do MMM YY HH:mm:ss')}</h2>
            </div>
          </div>
        </div>
        <div className="post-container">
          <div className="post-image-container">
            <img className="post-image" src={image} />
          </div>
          <div className="post-info">
            <div className="post-info-text">
              <h2>{text}</h2>
            </div>
            <div className="tags-container">
              <div className="tag1">
                <h2 className="tags">{tag1}</h2>
              </div>
              <div className="tag2">
                <h2 className="tags">{tag2}</h2>
              </div>
              <div className="tag3">
                <h2 className="tags">{tag3}</h2>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default PostsCard
