'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'

const MyProfile = () => {

    const router = useRouter()

    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session.user.id}/posts`)
        const data = await response.json()
        console.log("获取到的我的posts 原始返回", response);
        console.log("获取到的我的posts json处理后", data);
        setPosts(data)
    }


    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {

        const hasConfirmed = confirm("确定要删除吗？")

        if (hasConfirmed) {
            console.log("要删除的post", post);
            const response = await fetch(`/api/prompt/${post._id}`, {
                method: 'DELETE'
            })
            const resBody = await response.json()
            console.log("删除接口返回resBody", resBody);
            fetchPosts()
        }


    }

    const { data: session, status } = useSession()
    const [posts, setPosts] = useState([])
    console.log("profile MyProfile session", session, "status", status);

    useEffect(() => {
        fetchPosts()
    }, [session])



    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page!"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile