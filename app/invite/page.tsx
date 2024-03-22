'use client'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { notFound } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import scripts from '../tools/scripts/scripts'
import fb from '../tools/firebase/queries'
import { auth } from '../tools/firebase/main'

export default function Page() {
    const [invitor, setInvitor] = useState<User | null>()
    const [invitorError, setInvitorError] = useState<boolean | null>(null)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const [error, setError] = useState<boolean | null>(null)

    const provider = new GoogleAuthProvider()

    useEffect(() => {
        const fetchUser = async () => {
            const urlParams = new URLSearchParams(window.location.search)
            const userId = urlParams.get('user')
            if (!userId) {
                setInvitorError(true)
                return
            }

            const user = await fb.getUser(userId)
            if (!user) {
                setInvitorError(true)
                return
            }

            setInvitor(user)
        }

        fetchUser()
    })

    const handleSubmit = async () => {
        if (!scripts.validateSignUpFields(name, email, password, password2)) {
            setError(true)
            return
        }

        if (!invitor) {
            setInvitorError(true)
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
                const user = await fb.getUser(uid)
                if (user) {
                    setError(true)
                    return
                } else {
                    await fb.createUser(uid, email, name, photoURL, invitor?.id)
                }

                window.location.href = '/'
            })
            .catch((error) => {
                setError(true)
            })
    }

    const handleGoogleSignIn = () => {
        if (!invitor) {
            setInvitorError(true)
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
                const user = await fb.getUser(uid)
                if (user) {
                    setError(true)
                    return
                } else {
                    await fb.createUser(uid, email, name, photoURL, invitor?.id)
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
            <div className="flex w-full flex-col rounded p-5 md:w-4/12 md:p-10 md:shadow-custom 2xl:w-3/12">
                <h1 className="text-3xl font-bold">Sign up by invite</h1>

                <div className="flex flex-col gap-5 py-8">
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password again"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />

                    <button
                        disabled={invitorError ? true : false}
                        className="bg-hades-main h-10 rounded text-white disabled:opacity-30"
                        onClick={handleSubmit}
                    >
                        Sign up
                    </button>
                    <button
                        disabled={invitorError ? true : false}
                        onClick={handleGoogleSignIn}
                        className="border-hades-main flex h-10 items-center justify-center gap-2 rounded border-2 border-solid disabled:opacity-30"
                    >
                        <img src="/icons/google.svg" className="w-6" />
                        <p>Sign up with Google</p>
                    </button>
                    {error && <p className="text-red">Something went wrong...</p>}
                    {invitorError && <p className="text-red">Invalid invite...</p>}
                </div>

                <br />

                <div className="flex justify-center gap-2">
                    <p>Already have an account?</p>
                    <a className="font-semibold hover:underline" href="/log-in">
                        Log in
                    </a>
                </div>
            </div>
        </div>
    )
}
