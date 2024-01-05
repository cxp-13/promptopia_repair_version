'use client'
import { useState, useEffect, useMemo } from 'react'
import PromptCard from './PromptCard'
import Link from 'next/link'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <Link key={post._id} href={`/profile/${post.creator._id}`} >
          <PromptCard post={post} handleTagClick={handleTagClick} />
        </Link>
      ))
      }
    </div>
  )
}

export const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [selectTag, setSelectTag] = useState('')

  const [posts, setPosts] = useState([])

  const handleSearchChange = async (e) => {
    // js的方式实现搜索框功能
    console.log("handleSearchChange", e.target.value);
    setSearchText(e.target.value)

    // 请求接口的方式实现搜索框功能(error：TypeError: r is not a function。暂时放弃)
    // const res = await fetch(`/api/prompt/search?searchText=${e.target.value}`)
    // const data = await res.json()
    // console.log("搜索框接口返回的值", data);
  }
  // 通过过滤实现搜索框功能
  const displayPosts = useMemo(() => {
    let data = posts.filter((item) => {
      const { creator, prompt, tag } = item;
      const { username } = creator;
      return (
        prompt.toLowerCase().includes(searchText.toLowerCase()) ||
        username.toLowerCase().includes(searchText.toLowerCase()) ||
        tag.toLowerCase().includes(searchText.toLowerCase()) || searchText === ''
      );
    });

    if(selectTag !== ''){
      data = data.filter(item => item.tag === selectTag)
      // 只执行一次展示，防止出现搜索框搜索tag名字，却只显示持有tag的post，而不显示prompt中有tag名字的post。
      setSelectTag("")
    }

    return data
  }, [searchText, posts])

  // 点击tag，只展示该tag的posts功能
  const handleTagClick = (tag) => {
    console.log("当前选择的post", tag);
    setSearchText(tag)
    setSelectTag(tag)
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


