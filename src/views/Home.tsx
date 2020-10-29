import React from 'react'
import PostCreatore from '../components/PostCreatore'
import PostsList from '../components/PostsList'

const Home = () => {
    return (
        <div>
          <PostCreatore />
          <PostsList/> 
        </div>
    )
}

export default Home
