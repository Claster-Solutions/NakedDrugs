'use client'
import { auth } from '@/firebase/main'
import fb from '@/firebase/queries'
import { User, createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'

export default function SingIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [sentence, setSentence] = useState('')

    const submitHandler = async () => {
        const setCookies = async (user: User) => {
            document.cookie = `userId=${user.uid}`
            document.cookie = `accessToken=${await user.getIdToken()}`
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user
                console.log(user)
                const newUser: AppUser = {
                    uid: user.uid,
                    email: user.email || '',
                    sentence: sentence,
                }
                fb.createUser(newUser)

                setCookies(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message

                console.log(errorCode, errorMessage)
                // ..
            })
    }

    return (
        <div className="flex w-48 flex-col bg-white text-black">
            <h1 className="">Here you can signin</h1>
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
