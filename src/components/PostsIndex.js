import React, { useState, useEffect } from 'react'
import { getAllData } from '../lib/api'
import PostsShow from './PostsShow'

function getLocalHistory() {
  const data = localStorage.getItem('search-history')
  if (data && data.length > 1) {
    return data.split(',')
  } else return []
}

export const PostsIndex = () => {
  const [posts, setPosts] = useState([])
  const [searchHistory, setSearchHistory] = useState(getLocalHistory()) 
  const [filterSearchTerm, setFilterSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchTermEntered, setSearchTermEntered] = useState(true)

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

  // Create a filter search function that will filter the results based on the search term 
  // entered by the user

  // TODO: I am now able to search for keywords within the descriptions, now I also need to search by user and tags
  // To search by owner I need to search one more level deep, so I need to add anoter filter below
  const handleFilterSearch = () => {
    if (!filterSearchTerm) {
      // console.log('please enter a term!')
      setSearchTermEntered(false)
    }
    
    // console.log(filterSearchTerm, 'being clicked')
    if (filterSearchTerm) {
      setLoading(true)
      setSearchTermEntered(true)
      const filteredItems = posts.filter(item => {
        // console.log(Object.keys(item))
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

  async function resetPage() {
    setLoading(true)
    setSearchHistory([])
    const res = await getAllData('')
    const data = await res.data
    const results = data.data
    setPosts(results)
    setLoading(false)
  }

  const handleKeypress = e => {
    if (e.keyCode === 13 || e.key === 'Enter') {
      handleFilterSearch()
    }
  }

  return (
    <div className="main-container">
      <div className="main-title">
        <h1>BBC Blog</h1>
      </div>
      {/* create a search input that takes in event target value */}
      <div className="input-container">
        <input 
          aria-label="search-input"
          type="text"
          data-cy="input"
          className="search-input"
          value={filterSearchTerm}
          placeholder="filter results"
          onKeyPress={handleKeypress}
          onChange={(e) => { 
            setFilterSearchTerm(e.target.value) 
          }}
        />
        {/* The button needs an onClick which calls a function in which I need to filter the results */}
        <button
          type="submit"
          aria-label="filter-search"
          data-cy="submit"
          onClick={handleFilterSearch}
          className="search-button"
        >
          Search
        </button>
      </div>
      {!searchTermEntered && 
        <div className="search-tags">
          <h4>Please enter a term</h4>
        </div>
      }
      {loading && 
      <div className="search-tags">
        <h4>Loading...</h4>
      </div>}
      {!loading && 
      <div className="search-tags">
        {searchHistory.length > 0 && <h4>Filtered By: </h4>}
        {searchHistory.map(term => {
          return (
            <>
              <button 
                type="submit"
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
      { searchHistory.length > 0 && 
      <div className="clear-search">
        <>
          <button 
            type="submit"
            aria-label="clear-search"
            onClick={() => resetPage() }
            className="clear-search-button"
            data-cy="clear-all"
          >Clear Search
          </button>
        </>
      </div>
      }
      <div className="posts">
        {posts.map(post => 
          <PostsShow key={post.id} {...post} />
        )}
      </div>
    </div>
  )
}

export default PostsIndex
