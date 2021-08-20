import React, { useState, useEffect } from 'react'
import { getAllData, getByTag } from './lib/api'
import PostsCard from './components/PostsCard'

function getLocalHistory() {
  const data = localStorage.getItem('search-history')
  if (data && data.length > 1) {
    return data.split(',')
  } else return []
}

const App = () => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchHistory, setSearchHistory] = useState(getLocalHistory()) 

  useEffect(() => {
    localStorage.setItem('search-history', searchHistory)
  }, [searchHistory])

  useEffect(() => {
    async function getData() {
      const res = await getAllData('')
      const data = await res.data
      const results = data.data
      setPosts(results)
    }
    getData()
  }, [])

  async function getSearchData() {
    // 1. send search with what the user typing
    const res = await getByTag(search)
    // 2. set that terms in state
    setSearchHistory([...searchHistory, search])
    // 3. state needs to sync with local storage
    const data = await res.data
    const results = data.data
    setPosts(results)
    setSearch('')
  }

  return (
    <div className="main-container">
      <div className="main-title">
        <h1>BBC Blog</h1>
      </div>
      <div className="">
        <input 
          value={search}
          onChange={(e) => { 
            setSearch(e.target.value) 
          }}
        />
        <button
          onClick={getSearchData}
        >Search
        </button>
        <div>
          {searchHistory.map(term => {
            return (
              <button 
                key={term.id}
              >{term}
              </button>)
          })}
        </div>
        <div>
          <button onClick={() => setSearchHistory([])}>Clear Search</button>
        </div>
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
