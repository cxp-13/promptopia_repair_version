'use client'
import { Form } from '@components/Form'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const EditPrompt = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        getPromptDetails()
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault()
        console.log("开始更新 post", post)
        const response = await fetch(`/api/prompt/${promptId}`, {
            method: "PATCH",
            body:JSON.stringify(post),
            
        })
        const data = await response.json()
        console.log("更新结果", data);
        if(response.ok){
            router.push("/")
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt