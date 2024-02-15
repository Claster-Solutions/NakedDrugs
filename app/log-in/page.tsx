'use client'
import { auth } from '@/firebase/main'
import be from '@/firebase/queries'
import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth'
import { notFound } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import scripts from '../tools/scripts/scripts'

export default function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<boolean | null>(null)

    const provider = new GoogleAuthProvider()

    const handleSubmit = async () => {
        if (!scripts.validateEmailPasswordFields(email, password)) {
            setError(true)
            return
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {})
            .catch((error) => {
                setError(true)
            })
    }

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(async (userCredential) => {
                const uid = userCredential.user.uid
                const email = userCredential.user.email
                const name = userCredential.user.displayName || userCredential.user.email
                const photoURL = userCredential.user.photoURL || ''

                if (!uid || !email || !name) {
                    notFound()
                }

                //? check if user exists in the database and create if not

                const user = await be.getUser(uid)
                if (!user) {
                    await be.createUser(uid, email, name, photoURL)
                }

                window.location.href = '/'
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                const email = error.email
                const credential = GoogleAuthProvider.credentialFromError(error)
                console.log(errorCode, errorMessage, email, credential)
            })
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="flex flex-col bg-gray p-3">
                <h1 className="text-3xl font-bold">Here you can log-in</h1>
                <input
                    type="text"
                    placeholder="email"
                    className="bg-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    className="bg-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500">Invalid credentials</p>}
                <button onClick={handleSubmit}>Submit</button>

                <button onClick={handleGoogleSignIn}>Log-in with Google</button>
            </div>
        </div>
    )
}
