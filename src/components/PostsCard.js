import React from 'react'

const PostsCard = ({ owner, tags }) => {
  console.log(tags)
  return (
    <div className="card-container">
      <div className="card">
        <div className="topbar">
          <div className="avatar">
            <img className="avatar" src={owner.picture} />
          </div>
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
        
        </div>
        
      </div>
    </div>
  )
}

export default PostsCard
