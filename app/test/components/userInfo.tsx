<<<<<<< Updated upstream
'use client'
import React, { useEffect, useState } from 'react'
import fb from '@/firebase/queries'
import { auth } from '@/firebase/main'
=======
import React, { use } from 'react'
import { cookies } from 'next/headers'
import fb from '@/app/tools/firebase/queries'
import { notFound } from 'next/navigation'
>>>>>>> Stashed changes

const UserInfo = () => {
    const [user, setUser] = useState<AppUser | null>(null)

    useEffect(() => {
        const getUser = async () => {
            auth.onAuthStateChanged((user) => {
                if (!user) return
                console.log(user)

                fb.getUserInfo(user.uid)
                    .then((user) => {
                        const newUser = {
                            uid: user.uid,
                            email: user.email,
                            sentence: user.sentence,
                        }
                        setUser(newUser)
                        console.log(newUser)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
        }

        getUser()
    }, [])

    if (!user) return <p>Not logged in</p>

    return (
        <div>
            <p>userId: {user.uid}</p>
            <p>sentence: {user.sentence}</p>
            <p>email: {user.email}</p>
        </div>
    )
}
export default UserInfo
