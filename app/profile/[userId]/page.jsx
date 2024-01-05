'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'

const MyProfile = ({ params }) => {
    const { userId } = params
    // 原方案只能加载自己的
    const { data: session, status } = useSession()

    const [posts, setPosts] = useState([])
    console.log("profile MyProfile session", session, "status", status);

    useEffect(() => {
        fetchPosts()
        console.log("当前详情页用户ID", userId);
    }, [userId])

    const router = useRouter()

    const fetchPosts = async () => {
        // const response = await fetch(`/api/users/${session.user.id}/posts`)
        const response = await fetch(`/api/users/${userId}/posts`)
        const data = await response.json()
        console.log("当前用户发布的post接口", data);
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
            setPosts(posts.filter((item) => item._id !== post._id))
        }
    }

    return (
        <Profile
            name={posts[0] ? posts[0].creator.username : "My"}
            desc="Welcome to your personalized profile page!"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile