'use client'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))
      }
    </div>
  )
}



export const Feed = () => {

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const handleSearchChange = (e) => setSearchText(e.target.value)
  const handleTagClick = (tag) => {
    console.log("当前选择的post", tag);

  }


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      console.log("获取到的全部post", data);
      setPosts(data)
    }
    fetchPosts()
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  )
}


