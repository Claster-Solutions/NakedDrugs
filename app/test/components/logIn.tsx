'use client'
import { auth } from '@/firebase/main'
import {
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import React, { useState } from 'react'

export default function LogIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = async () => {
        const setCookies = async (user: User) => {
            document.cookie = `userId=${user.uid}`
            document.cookie = `accessToken=${await user.getIdToken()}`
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                console.log(user)
                setCookies(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, errorMessage)
            })
    }

    return (
        <div className="flex w-48 flex-col bg-white text-black">
            <h1 className="">Here you can log-in</h1>
            <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={submitHandler}>Submit</button>
        </div>
    )
}
