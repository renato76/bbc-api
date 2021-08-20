import React, { useState, useEffect } from 'react'
import { getAllData } from './lib/api'
import PostsCard from './components/PostsCard'

function getLocalHistory() {
  const data = localStorage.getItem('search-history')
  if (data && data.length > 1) {
    return data.split(',')
  } else return []
}

const App = () => {
  const [posts, setPosts] = useState([])
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

  console.log(posts)

  // Create a filter search function that will filter the results based on the search term 
  // entered by the user

  // TODO: I am now able to search for keywords within the descriptions, now I also need to search by user and tags
  const handleFilterSearch = () => {
    console.log(filterSearchTerm, 'being clicked')
    const filteredItems = posts.filter(item => {
      return Object.keys(item).some(key => {
        return item[key].toString().toLowerCase().includes(filterSearchTerm)
      })
    })
    setPosts(filteredItems)
    setSearchHistory([...searchHistory, filterSearchTerm])
  }

  return (
    <div className="main-container">
      <div className="main-title">
        <h1>BBC Blog</h1>
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
      <div>
        {searchHistory.map(term => {
          return (
            <button 
              key={term.id}
            >{term}
            </button>)
        })}
      </div>
      {/* TODO: Create styles for this section - the search terms need to be much clearer */}
      <div>
        <button onClick={() => setSearchHistory([])}>Clear Search</button>
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
