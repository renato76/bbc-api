import axios from 'axios'

export const getAllData = () => {
  return axios.get('https://dummyapi.io/data/v1/post?limit=30', {
    headers: {
      'app-id': '6116d5e6400e5154e7aec763',
    },    
  })
}
