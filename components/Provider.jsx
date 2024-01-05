'use client'

import React from 'react'
import { SessionProvider, getSession, useSession } from 'next-auth/react'
import { sendError } from 'next/dist/server/api-utils'

// session在登录成功情况下是undefined
const Provider = (params) => {
    const { children, session } = params
    console.log("Provider.params",params)
    console.log("Provider.params.children",children)
    console.log("Provider.params.session",session)
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}

export default Provider