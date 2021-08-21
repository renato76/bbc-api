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
  const [loading, setLoading] = useState(false)

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
  // To search by owner I need to search one more level deep, so I need to add anoter filter below
  const handleFilterSearch = () => {
    
    console.log(filterSearchTerm, 'being clicked')
    if (filterSearchTerm) {
      setLoading(true)
      const filteredItems = posts.filter(item => {
        console.log(Object.keys(item))
        return Object.keys(item).some(key => {
          return item[key].toString().toLowerCase().includes(filterSearchTerm)
        })
      })
      setPosts(filteredItems)
      setSearchHistory([...searchHistory, filterSearchTerm])
      setLoading(false)
      setFilterSearchTerm('')
    }
  }

  const resetPage = () => {
    setSearchHistory([])
    // this below is not the best solution to return to original data
    // just a temporary fix!
    window.location.reload(false)
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
          className="search-button"
        >
          Search
        </button>
      </div>
      {loading && <h4>Loading...</h4>}
      {!loading && <div className="search-tags">
        <h4>Filtered By: </h4>
        {searchHistory.map(term => {
          return (
            <>
              <button 
                key={term.id}
                className="search-tags-button"
              >{term}
              </button>
            </>
          )
        })}
      </div>
      }
      {/* TODO: Create styles for this section - the search terms need to be much clearer */}
      <div className="clear-search">
        <>
          <button 
            onClick={() => resetPage() }
            className="clear-search-button"
          >Clear Search
          </button>
        </>
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
