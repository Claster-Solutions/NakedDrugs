'use client'
import { auth } from '@/firebase/main'
import be from '@/firebase/queries'
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth'
import { notFound } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import scripts from '../tools/scripts/scripts'

export default function Page() {
    const [invitor, setInvitor] = useState<User | null>()
    const [inviteError, setInviteError] = useState<string | null>(null)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState<boolean | null>(null)

    const provider = new GoogleAuthProvider()

    useEffect(() => {
        const fetchUser = async () => {
            const urlParams = new URLSearchParams(window.location.search)
            const userId = urlParams.get('user')
            if (!userId) {
                setInviteError('No user id')
                return
            }

            const user = await be.getUser(userId)
            if (!user) {
                setInviteError('User not found')
                return
            }

            setInvitor(user)
        }

        fetchUser()
    })

    const handleSubmit = async () => {
        if (!scripts.validateEmailPasswordFields(email, password)) {
            setLoginError(true)
            return
        }

        if (!invitor) {
            setInviteError('No invitor')
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
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
                if (user) {
                    setInviteError('User already exists')
                    return
                } else {
                    await be.createUser(uid, email, name, photoURL, invitor?.id)
                }

                window.location.href = '/'
            })
            .catch((error) => {
                setLoginError(true)
            })
    }

    const handleGoogleSignIn = () => {
        if (!invitor) {
            setInviteError('No invitor')
            return
        }

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
                if (user) {
                    setInviteError('User already exists')
                    return
                } else {
                    await be.createUser(uid, email, name, photoURL, invitor?.id)
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

    if (inviteError) {
        return <p>{inviteError}</p>
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div>
                <h1>You was invited by {invitor?.name}</h1>
                <p>Invite user: {invitor?.id}</p>
            </div>

            <div className="flex flex-col bg-gray p-3">
                <h1 className="text-3xl font-bold">Here you can sign-in</h1>
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
                {loginError && <p className="text-red-500">Invalid credentials</p>}
                <button onClick={handleSubmit}>Submit</button>

                <button onClick={handleGoogleSignIn}>Sign-in with Google</button>
            </div>
        </div>
    )
}
