import React from 'react'
import { cookies } from 'next/headers'

export default function UserInfo() {
    const cs = cookies()

    return (
        <div>
            <h1>Here you will see your user info</h1>
            <h2>Username: {cs.get('username')?.value}</h2>
            <h2>Email: {cs.get('email')?.value}</h2>
            <h2>Email: {cs.get('email')?.name}</h2>
        </div>
    )
}
