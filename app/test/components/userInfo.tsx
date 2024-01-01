import React, { use } from 'react'
import { cookies } from 'next/headers'
import fb from '@/firebase/queries'
import { notFound } from 'next/navigation'

const UserInfo = async () => {
    const cs = cookies()
    const userId = cs.get('userId')?.value
    if (!userId) return notFound()

    const user = await fb.getUserInfo(userId)
    console.log(user)

    return (
        <div>
            <p>userId: {user.id}</p>
            <p>user: {user.name}</p>
            <p>email: {user.email}</p>
        </div>
    )
}
export default UserInfo