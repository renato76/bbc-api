import axios from 'axios'

export const getAllData = (search) => {
  return axios.get('https://dummyapi.io/data/v1/post', {
    headers: {
      'app-id': '6116d5e6400e5154e7aec763',
    },    
    params: {
      limit: 30,
      text: search,
    },
  })
}

export const getByTag = (tag) => {
  return axios.get(`https://dummyapi.io/data/v1/tag/${tag}/post`, {
    headers: {
      'app-id': '6116d5e6400e5154e7aec763',
    },    
    params: {
      limit: 30,
    },
  })
}
