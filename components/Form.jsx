import Link from 'next/link'
import React from 'react'

export const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} spot</span>
      </h1>
      <p className='text-left desc max-w-md'>
        {type} and share amazing prompt with the worlf, and let your imagination run wild
        with any AI-powered platform
      </p>

      <form
        onSubmit={(e) => {
          console.log("Form onSubmit e", e);
          handleSubmit(e)
        }}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      > 
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700"
          >Your AI Prompt</span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your prompt here...'
            required
            className='form_textarea'
          ></textarea>
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag
            <span className='font-normal'>(#product, #webdevelopment, #idea)</span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder='#tag'
            required
            className='form_textarea'
          ></input>
        </label>

        <label className='flex-end mx-3 mb-5 gap-4'>
          <Link href={"/"} className='text-gray-500 text-sm'>Cancel</Link>
          <button type='submmit' disabled={submitting} className='px-5 py-1.5 bg-primary-orange rounded-full text-white'>{submitting ? `${type}...` : type}</button>
        </label>
      </form>
    </section>
  )
}
