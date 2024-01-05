'use client'
import { useState, useEffect, useMemo } from 'react'
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

  const handleSearchChange = async (e) => {
    // js的方式实现搜索框功能
    console.log("handleSearchChange", e.target.value);
    setSearchText(e.target.value)

    // 请求接口的方式实现搜索框功能
    const res = await fetch(`/api/prompt/search?searchText=${e.target.value}`)
    const data = await res.json()
    // error：TypeError: r is not a function。暂时放弃
    console.log("搜索框接口返回的值", data);

  }

  const displayPosts = useMemo(() => {
    // js的方式
    if (searchText === "") {
      // 如果搜索框的值为空，返回全部数据
      console.log("搜索框的值为空，返回全部数据");
      return posts
    }

    const data = posts.filter((item) => {
      const { creator, prompt, tag } = item;
      const { username } = creator;
      // 如果需要不区分大小写的搜索，可以使用 toLowerCase() 方法：
      return (
        prompt.toLowerCase().includes(searchText.toLowerCase()) ||
        username.toLowerCase().includes(searchText.toLowerCase()) ||
        tag.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    return data
  }, [searchText, posts])

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
      <PromptCardList data={displayPosts} handleTagClick={handleTagClick} />
    </section>
  )
}


