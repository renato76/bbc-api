import React, { useState, useEffect } from 'react'
import { getAllData } from './lib/api'
import PostsCard from './components/PostsCard'

const App = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function getData() {
      const res = await getAllData()
      const data = await res.data
      const results = data.data
      setPosts(results)
    }
    getData()
  }, [])

  console.log(posts)

  return (
    <div className="main-container">
      <div className="main-title">
        <h1>BBC Paws</h1>
      </div>
      <div className="posts">
        {posts.map((post, index) => 
          <PostsCard key={index} {...post} />
        )}
      </div>
    </div>
  )
}

export default App
