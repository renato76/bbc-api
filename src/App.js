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

  const [filterSearchTerm, setFilterSearchTerm] = useState('')

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

  console.log(filterSearchTerm)

  // Create a filter search function that will filter the results based on the search term 
  // entered by the user
  const handleFilterSearch = () => {
    console.log(filterSearchTerm, 'being clicked')
  }

  return (
    <div className="main-container">
      <div className="main-title">
        <h1>BBC Blog</h1>
      </div>
      <div className="input-tags">
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
      {/* create a search input that takes in event target value */}
      <div className="input-container">
        <input 
          className="search-input"
          value={filterSearchTerm}
          placeholder="filter results"
          onChange={(e) => { 
            setFilterSearchTerm(e.target.value) 
          }}
        />
        {/* The button needs an onClick which calls a function in which I need to filter the results */}
        <button
          onClick={handleFilterSearch}
        >
          Search
        </button>
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
